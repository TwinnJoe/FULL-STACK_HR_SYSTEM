// 
import { pool } from "../config/config.js";

// Fetch all attendance records
const AllAttendance = async () => {
    const [data] = await pool.query(`
        SELECT a.*, e.name 
        FROM attendance a
        JOIN employees e ON a.employeeID = e.employeeID
    `);
    return data;
};

// Fetch attendance records for a specific employee
const Attendance = async (employeeID) => {
    const [data] = await pool.query('SELECT * FROM attendance WHERE employeeID = ?', [employeeID]);
    return data;  // Return the fetched data
};

// Add a new attendance record
const addAttendance = async (employeeID, date, status) => {
    // Use VALUES instead of SET in the INSERT statement
    await pool.query(
        'INSERT INTO attendance (employeeID, date, status) VALUES (?,?,?)',
        [employeeID, date, status]
    );
};

export {AllAttendance, Attendance, addAttendance};