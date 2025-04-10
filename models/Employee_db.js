import { pool } from "../config/config.js";

const AllEmployees = async () => {
    let [data] = await pool.query('SELECT * FROM employees');
    return data;
}

const Employee = async (employeeID) => {
    await pool.query('SELECT * FROM employees WHERE employeeID = ?', [employeeID]);
}

const addEmployee = async (name,position,salary,contact,department,employmentHistory) => {
    await pool.query(
        'INSERT INTO employees (name, position, salary, contact, department,employment_history) VALUES (?, ?, ?, ?, ?, ?)',
        [name, position, salary, contact, department,employmentHistory]
      );
       
}

const deleteEmployee = async (employeeID) => {
    await pool.query('DELETE FROM attendance WHERE employeeID = ?', [employeeID]);
    await pool.query('DELETE FROM payroll WHERE employeeID = ?', [employeeID]);
    await pool.query('DELETE FROM employees WHERE employeeID = ?', [employeeID]);
}

const updateEmployee = async (name,position,salary,contact,department,employeeID, employmentHistory) => {
    await pool.query('UPDATE employees SET name = ?, position = ?, salary = ?, contact = ?, department = ?, employment_history = ? WHERE employeeID = ?', [name,position,salary,contact,department,employmentHistory,employeeID]);
}

export {AllEmployees,Employee,addEmployee,deleteEmployee,updateEmployee}