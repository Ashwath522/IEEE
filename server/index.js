import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'registrations.json');

// Initialize JSON DB if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MySQL Connection Pool (Robust & Multihost)
let pool;
const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ieee_conference',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const initPool = async () => {
    try {
        pool = mysql.createPool(dbConfig);
        // Test connection immediately
        const connection = await pool.getConnection();
        console.log(`✅ MySQL Connected on ${dbConfig.host}:${dbConfig.port}`);
        connection.release();
    } catch (err) {
        console.error(`❌ MySQL Connection Failed (${dbConfig.host}:${dbConfig.port}):`, err.message);
        console.log('Backend will use JSON Fallback until MySQL is ready.');
        pool = null;
    }
};

initPool();

// Helper to handle JSON DB
const getJsonData = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
const saveJsonData = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// API: Register User
app.post('/api/register', async (req, res) => {
    const { name, usn, branch, sem, phone, email } = req.body;
    const createdAt = new Date().toISOString();

    // 1. Try MySQL
    try {
        if (pool) {
            const [result] = await pool.execute(
                'INSERT INTO registrations (name, usn, branch, sem, phone, email) VALUES (?, ?, ?, ?, ?, ?)',
                [name, usn, branch, sem, phone, email]
            );
            return res.status(201).json({ message: 'Registration successful (MySQL)', id: result.insertId });
        }
    } catch (err) {
        console.warn('MySQL Insert Failed, falling back to JSON:', err.message);
    }

    // 2. Fallback to JSON
    const data = getJsonData();
    const newEntry = { id: Date.now(), name, usn, branch, sem, phone, email, created_at: createdAt };
    data.push(newEntry);
    saveJsonData(data);
    res.status(201).json({ message: 'Registration successful (JSON Fallback)', id: newEntry.id });
});

// API: Get Admin Stats
app.get('/api/admin/stats', async (req, res) => {
    let total = 0;
    try {
        if (pool) {
            const [rows] = await pool.execute('SELECT COUNT(*) as total FROM registrations');
            total = rows[0].total;
        } else {
            throw new Error('No pool');
        }
    } catch (err) {
        total = getJsonData().length;
    }

    res.json({
        totalRegistrations: total,
        papersSubmitted: Math.floor(total * 0.4),
        reviewersAssigned: Math.floor(total * 0.1)
    });
});

// API: Get All Registrations
app.get('/api/registrations', async (req, res) => {
    try {
        if (pool) {
            const [rows] = await pool.execute('SELECT * FROM registrations ORDER BY created_at DESC');
            return res.json(rows);
        }
    } catch (err) {
        console.warn('MySQL Fetch Failed, falling back to JSON:', err.message);
    }
    
    // Fallback to JSON
    const data = getJsonData().sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(data);
});

// API: Export to SQL
app.get('/api/admin/export', async (req, res) => {
    try {
        let rows = [];
        if (pool) {
            const [mysqlRows] = await pool.execute('SELECT * FROM registrations');
            rows = mysqlRows;
        } else {
            rows = getJsonData();
        }

        let sql = '-- IEEE Conference Registrations Export\n';
        sql += '-- Generated at: ' + new Date().toISOString() + '\n\n';
        
        rows.forEach(row => {
            const dateStr = typeof row.created_at === 'string' ? row.created_at.slice(0, 19).replace('T', ' ') : new Date(row.created_at).toISOString().slice(0, 19).replace('T', ' ');
            sql += `INSERT INTO registrations (name, usn, branch, sem, phone, email, created_at) VALUES ('${row.name}', '${row.usn}', '${row.branch}', ${row.sem}, '${row.phone}', '${row.email}', '${dateStr}');\n`;
        });
        
        res.setHeader('Content-Type', 'text/sql');
        res.setHeader('Content-Disposition', 'attachment; filename=registrations_backup.sql');
        res.send(sql);
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate export' });
    }
});

// API: Export to CSV (for Excel)
app.get('/api/registrations/export-csv', async (req, res) => {
    try {
        let rows = [];
        if (pool) {
            const [mysqlRows] = await pool.execute('SELECT name, usn, branch, sem, phone, email, created_at FROM registrations');
            rows = mysqlRows;
        } else {
            rows = getJsonData();
        }
        
        const headers = 'Name,USN,Branch,Semester,Phone,Email,RegistrationDate\n';
        const csv = rows.map(row => {
            const date = typeof row.created_at === 'string' ? row.created_at : new Date(row.created_at).toISOString();
            return `"${row.name}","${row.usn}","${row.branch}",${row.sem},"${row.phone}","${row.email}","${date}"`;
        }).join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
        res.send(headers + csv);
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate CSV' });
    }
});

const PORT = process.env.PORT || 8080;
const HOST = '127.0.0.1'; // Using 127.0.0.1 explicitly to avoid localhost resolution issues

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n\x1b[32m🚀 IEEE Backend Server Running! \x1b[0m`);
    console.log(`\x1b[36mLocal Access:\x1b[0m http://127.0.0.1:${PORT}`);
    console.log(`\x1b[36mAPI Endpoint:\x1b[0m http://127.0.0.1:${PORT}/api/registrations\n`);
});
