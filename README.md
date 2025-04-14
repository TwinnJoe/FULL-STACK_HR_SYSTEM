# HR Management System

![Tech](https://img.shields.io/badge/tech-stack-full--stack-green)  
![Backend](https://img.shields.io/badge/backend-Node.js-blue)  
![Database](https://img.shields.io/badge/database-MySQL-orange)  
![License](https://img.shields.io/badge/license-MIT-blue)  
[![Live Demo](https://img.shields.io/badge/demo-online-orange)](https://your-demo-link.com)

A full-stack HR system built with Node.js, MySQL, and RESTful APIs. It supports full CRUD operations and secure user authentication via the backend. The system is designed to manage employees, automate payroll, and provide an efficient admin dashboard.

---

## 👤 Developer

- **Sinovuyo Joe Mjulwa**

---

## 🚀 Features

### ✅ Full-Stack Architecture
- Node.js backend with RESTful API
- Frontend (Vue 3) integrated with backend services

### 👥 Employee Management
- Create, Read, Update, and Delete employee records

### 💰 Payroll Generation
- Calculates salaries and exports digital payslips as PDFs

### 🔐 Authentication System
- Secure login powered by backend using JWT and bcrypt
- Admin and employee login roles

### 🖥️ Clean UI
- Responsive frontend interface built for usability

---

## 🛠️ Tech Stack

- **Frontend**: Vue 3  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Authentication**: JWT + bcrypt  
- **PDF Generation**: jsPDF + jsPDF-AutoTable

---

## 🗂️ Project Structure

```bash
HR-System/
├── backend/
│   ├── config/        # DB config
│   ├── controllers/   # Business logic
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── store/     # Vuex state
│   └── main.js
└── README.md


🔌 API Endpoints Overview
Method	Endpoint	Description
GET	/api/employees	Get all employees
GET	/api/employees/:id	Get employee by ID
POST	/api/employees	Create new employee
PUT	/api/employees/:id	Update employee data
DELETE	/api/employees/:id	Delete employee
POST	/api/login	User login (Admin/Emp)


🔑 Login Credentials (Demo)
👑 Admin
Username: Sibongile Nkosi

Password: Admin001

👷 Employee
Username: Fatima Patel

Password: Emp002

📌 Notes
Backend handles all login and authentication logic

Uses MySQL for secure data storage

Visual charts and leave request modules were removed in this version

Future updates may include role-based permissions and profile editing
