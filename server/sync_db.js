import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'registrations.json');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ieee_conference'
};

async function sync() {
    console.log('--- Data Synchronization Utility ---');
    
    if (!fs.existsSync(DB_FILE)) {
        console.log('No JSON data found to sync.');
        return;
    }

    const jsonData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    if (jsonData.length === 0) {
        console.log('JSON data is empty.');
        return;
    }

    console.log(`Found ${jsonData.length} records in JSON storage.`);

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to MySQL.');

        let syncedCount = 0;
        let skipCount = 0;

        for (const entry of jsonData) {
            try {
                // Check if already exists in MySQL (by USN)
                const [existing] = await connection.execute('SELECT id FROM registrations WHERE usn = ?', [entry.usn]);
                
                if (existing.length === 0) {
                    await connection.execute(
                        'INSERT INTO registrations (name, usn, branch, sem, phone, email, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [entry.name, entry.usn, entry.branch, entry.sem, entry.phone, entry.email, entry.created_at || new Date().toISOString()]
                    );
                    syncedCount++;
                } else {
                    skipCount++;
                }
            } catch (err) {
                console.error(`Failed to sync USN ${entry.usn}:`, err.message);
            }
        }

        console.log('--- Sync Result ---');
        console.log(`✅ Successfully synced: ${syncedCount}`);
        console.log(`ℹ️ Already in MySQL (skipped): ${skipCount}`);
        
        if (syncedCount > 0) {
            console.log('\nMigration complete! Your live MySQL database is now up to date.');
        }

    } catch (err) {
        console.error('❌ ERROR: Could not connect to MySQL for synchronization.');
        console.error(err.message);
        console.log('\nTip: Make sure MySQL is running and credentials in .env are correct.');
    } finally {
        if (connection) await connection.end();
    }
}

sync();
