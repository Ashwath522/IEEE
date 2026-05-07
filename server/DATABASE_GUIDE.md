# MySQL Database Access & Safety Guide

This guide explains how to access the IEEE conference database from external apps and how to manage access for multiple users while keeping data safe.

## 1. Connecting with External Apps
You can use free GUI tools like **MySQL Workbench** or **TablePlus** to view and manage your data easily.

### Connection Details (Default)
- **Host**: `localhost`
- **Port**: `3306`
- **User**: `root`
- **Database**: `ieee_conference`

> [!TIP]
> I have created a **`.env`** file in the `server` folder. If you have a MySQL password or a different username, you can edit it there.

## 2. Multi-User Access
If multiple people need to access the database from different computers:
1. **Cloud Database**: You must use a hosted MySQL service (e.g., Aiven, AWS RDS).
2. **Environment Variables**: Update the `server/.env` file with the host, user, and password of your cloud database.

## 3. Preventing Data Loss ("Doping" or Dropping)
To prevent accidental deletion of the database, you should create "Staff" accounts with restricted permissions. These accounts can add and view data but **cannot** delete data or drop tables.

### How to create a restricted user:
Run these commands in your MySQL terminal:
```sql
CREATE USER 'ieee_staff'@'%' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON ieee_conference.* TO 'ieee_staff'@'%';
FLUSH PRIVILEGES;
```
*Now, if someone logged in as `ieee_staff` tries to run `DROP TABLE`, the database will block them!*

## 4. Manual Backups
You can now download a full SQL backup directly from the Admin Dashboard using the "Download SQL Export" button.
