import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function testConnection() {
    console.log('--- Database Diagnostic ---');
    console.log(`Host: ${process.env.DB_HOST || '127.0.0.1'}`);
    console.log(`User: ${process.env.DB_USER || 'root'}`);
    console.log(`DB: ${process.env.DB_NAME || 'ieee_conference'}`);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'ieee_conference'
        });
        console.log('✅ SUCCESS: Connected to MySQL!');
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM registrations');
        console.log(`📊 Current registrations in MySQL: ${rows[0].count}`);
        await connection.end();
    } catch (err) {
        console.error('❌ FAILURE: Could not connect to MySQL.');
        console.error(`Error Code: ${err.code}`);
        console.error(`Error Message: ${err.message}`);
        
        if (err.code === 'ECONNREFUSED') {
            console.log('\nSUGGESTION: MySQL is not running on this host/port.');
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\nSUGGESTION: The password or username is incorrect.');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('\nSUGGESTION: The database "ieee_conference" does not exist. Run schema.sql.');
        }
    }
}

testConnection();
