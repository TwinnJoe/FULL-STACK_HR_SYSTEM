<template>
  <div>
    <h1>Payroll</h1>
    <div>
      <button class="btn btn-primary" @click="openAddPayrollModal">Add Payroll</button>
    </div>

    <div class="table-container">
      <table class="employee-table">
        <thead>
          <tr>
            <th>Payroll</th>
            <th>Employee</th>
            <th>Hours Worked</th>
            <th>Leave Days</th>
            <th>Salary</th>
            <th>Performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredPayroll" :key="employee.employeeID">
            <td>{{ employee.payrollID }}</td>
            <td>{{ employee.employeeID }}</td>
            <td>{{ employee.hours_worked }}</td>
            <td>{{ employee.leave_days }}</td>
            <td>R {{ employee.salary }}</td>
            <td>{{ employee.performance }}</td>
            <td>
              <button class="btn btn-primary" @click="showPayslip(employee)">Payslip</button>
              <i @click="updatePayrollData(employee)" class="fas fa-pencil edit-icon"></i>
              <i @click="deletePayroll(employee.payroll_ID)" class="fas fa-trash delete-icon"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Payroll Modal -->
    <div v-if="showModal" class="custom-modal" @click.self="closeModal">
      <div class="modal-container">
        <h5 class="modal-title">Manage Payroll</h5>
        <form @submit.prevent="handleSubmit">
          <div class="input-group" v-for="(value, key) in dataList" :key="key">
            <input v-model="dataList[key]" :placeholder="key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())"
              required />
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn add-btn" v-if="!isEditing" @click="addPayroll">Save Payroll</button>
          <button class="btn update-btn" v-if="isEditing" @click="updatePayroll">Update Payroll</button>
          <button class="close-btn" @click="closeModal">Close</button>
        </div>
      </div>
    </div>

    <!-- Payslip Modal -->
    <div class="PayslipModal" v-show="selectedEmployee" @click.self="selectedEmployee = false">

      <div class="modal-content">
        <div class="payslip">
          <div class="payslip-header">
            <h2>Payslip</h2>
            <p><strong>Date:</strong> {{ new Date().toLocaleDateString('en-GB', {
              year: 'numeric', month: 'long', day:
                '2-digit'
            }).replace(/(\d+)\s([a-zA-Z]+)\s(\d+)/, '$1 /$2/ $3') }}</p>
          </div>

          <div class="payslip-body">
            <div class="payslip-section">
              <h3>Employee Information</h3>
              <p><strong>Employee:</strong> {{ selectedEmployee.employeeID }}</p>
              <p><strong>Payroll:</strong> {{ selectedEmployee.payrollID }}</p>
            </div>

            <div class="payslip-section">
              <h3>Earnings</h3>
              <p><strong>Hours Worked:</strong> {{ selectedEmployee.hours_worked }}</p>
              <p><strong>Monthly Salary:</strong> R{{ selectedEmployee.salary }}</p>
              <p><strong>Annual Salary:</strong> R{{ calculateAnnualSalary(selectedEmployee.salary) }}</p>
            </div>

            <div class="payslip-section">
              <h3>Net Pay</h3>
              <p class="net-salary"><strong>R {{ salaryAfterDeductions(selectedEmployee).toLocaleString('en-ZA', {
                minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="downloadPayslip(selectedEmployee)">Download</button>
          <button class="btn btn-secondary" @click="selectedEmployee = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "WorkersView",
  data() {
    return {
      selectedEmployee: false,
      dataList: {
        employeeID: "",
        hours_worked: "",
        leave_days: "",
        performance: "",
      },
      filteredPayroll: [],
      isEditing: false,
      showModal: false,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapState({
      payroll: state => state.payroll || [],
      employees: state => state.employees || [],
    })
  },
  methods: {
    ...mapActions(['AllPayroll', 'addPayroll', 'updatePayroll', 'deletePayroll', 'getEmployees']),

    openAddPayrollModal() {
      this.showModal = true;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.showModal = false;
      document.body.classList.remove("modal-open");
    },
    addPayroll() {
      const selectedEmployee = this.employees.find(emp => emp.employeeID === this.dataList.employeeID);
      this.dataList.salary = selectedEmployee ? selectedEmployee.salary : 0;

      this.$store.dispatch('addPayroll', this.dataList).then(() => {
        this.fetchData();
        this.resetForm();
        this.closeModal();
      }).catch(err => console.error("Error adding payroll:", err));
    },
    updatePayrollData(payload) {
      this.dataList = { ...payload };
      this.showModal = true;
      this.isEditing = true;
    },
    updatePayroll() {
      this.$store.dispatch('updatePayroll', this.dataList).then(() => {
        const index = this.filteredPayroll.findIndex(emp => emp.employeeID === this.dataList.employeeID);
        if (index !== -1) {
          this.filteredPayroll[index] = { ...this.dataList };
        }
        this.closeModal();
      }).catch(err => console.error("Error updating payroll:", err));
    },
    deletePayroll(id) {
      if (id) {
        this.$store.dispatch('deletePayroll', id).then(() => {
          this.filteredPayroll = this.filteredPayroll.filter(pr => pr.payroll_ID !== id);
          this.AllPayroll();
        });
      }
    },
    resetForm() {
      this.dataList = {
        employeeID: "",
        hours_worked: "",
        leave_days: "",
        salary: "",
        performance: "",
      };
    },
    async fetchData() {
      try {
        const [payrollResponse, employeeResponse] = await Promise.all([
          fetch('http://localhost:3000/payroll'),
          fetch('http://localhost:3000/employees'),
        ]);

        if (!payrollResponse.ok || !employeeResponse.ok) {
          throw new Error("Error fetching data");
        }

        const payrollData = await payrollResponse.json();
        const employeeData = await employeeResponse.json();

        this.filteredPayroll = payrollData.map(payroll => {
          const employee = employeeData.find(emp => emp.employeeID === payroll.employeeID);
          if (employee) {
            payroll.salary = employee.salary;
          }
          return payroll;
        });
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    },
    calculateMonthlySalary(hoursWorked) {
      const hourlyRate = 300; // hourly rate is 300
      return hourlyRate * hoursWorked;
    },
    calculateAnnualSalary(monthlySalary) {
      return monthlySalary * 12;
    },
    calculateUIF(employee) {
      const uifRate = 0.01; // 1% contribution
      const monthlySalary = employee.salary || this.calculateMonthlySalary(employee.hours_worked);
      return monthlySalary * uifRate;
    },
    salaryAfterDeductions(employee) {
      const monthlySalary = employee.salary || this.calculateMonthlySalary(employee.hours_worked);
      const uifContribution = this.calculateUIF(employee);
      const taxableAmount = monthlySalary - uifContribution;
      const tax = Math.max(0, taxableAmount * 0.15); // Ensure tax is not negative
      const netSalary = taxableAmount - tax;
      return netSalary;
    },
    showPayslip(employee) {
      this.selectedEmployee = employee;
    },
    downloadPayslip(employee) {
      const doc = new jsPDF();

      // Add Company Name and Payslip Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("HR Tech", 105, 15, { align: "center" });
      doc.setFontSize(14);
      doc.text("Employee Payslip", 105, 25, { align: "center" });

      // Employee Details Section
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Employee: ${employee.employeeID}`, 15, 50);
      doc.text(`Payroll: ${employee.payrollID}`, 15, 60);
      doc.text(`Date: ${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: '2-digit' })}`, 150, 40);

      // Calculate values using the provided functions
      const hoursWorked = employee.hours_worked;
      const monthlySalary = Number(employee.salary) || this.calculateMonthlySalary(hoursWorked);
      const uifContribution = this.calculateUIF(employee);
      const taxableAmount = monthlySalary - uifContribution;
      const tax = Math.max(0, taxableAmount * 0.15); // Ensure tax is not negative
      const netSalary = this.salaryAfterDeductions(employee);

      // Earnings and Deductions Table
      doc.autoTable({
        startY: 70,
        head: [['Description', 'Amount (ZAR)']],
        body: [
          ['Hours Worked', hoursWorked],
          ['Monthly Salary', `R ${monthlySalary.toFixed(2)}`],
          ['UIF Contribution', `R ${uifContribution.toFixed(2)}`],
          ['Tax (15%)', `R ${tax.toFixed(2)}`],
          ['Net Salary', `R ${netSalary.toFixed(2)}`]
        ],
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        columnStyles: { 1: { halign: 'right' } },
      });

      // Footer
      doc.setFontSize(10);
      doc.text("This is a system-generated payslip and does not require a signature.", 15, doc.internal.pageSize.height - 20);
      doc.text("HR Tech | www.hrtech.com", 15, doc.internal.pageSize.height - 10);

      // Save PDF
      doc.save(`${employee.name}_payslip.pdf`);
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #343a40;
}

.table-container {
  margin-top: 20px;
  height: 100%;
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.employee-table th,
.employee-table td {
  padding: 15px;
  text-align: left;
  border: 1px solid #dee2e6;
}

.employee-table th {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.employee-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.employee-table tr:hover {
  background-color: #e9ecef;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #28a745;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.edit-icon {
  cursor: pointer;
  margin-left: 10px;
  color: orange;
}

.delete-icon {
  cursor: pointer;
  margin-left: 10px;
  color: red;
}

/* payslip modal */

/* Box-sizing for modal and its elements */
.PayslipModal,
.modal-dialog,
.modal-container,
.modal-content {
  box-sizing: border-box;
}

/* Modal Background */
.PayslipModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}



/* Modal Header */
.modal-header {
  margin-bottom: 20px;
  text-align: center;
}

/* payslip Container */

.payslip {
  width: 420px;
  height: 600px;
  max-width: 100%;
  background: white;
  border: 2px solid #333;
  padding: 20px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  text-align: left;
}

/* Payslip Header */
.payslip-header {
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 14px;
}

/* Payslip Body */
.payslip-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

/* Payslip Sections */
.payslip-section {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  justify-content: space-around;
}

.payslip-section h3 {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 3px;
}

/* Net Salary Highlight */
.net-salary {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
}

/* Payslip Footer */
.payslip-footer {
  text-align: center;
  font-size: 12px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 2px solid #333;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
}

/* Buttons */
.btn {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: crimson;
  color: white;
}

.btn-secondary:hover {
  background-color: red;
}

/* Close modal when clicked outside */
.modal[style="display: block;"] {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 480px) {
  .modal-dialog {
    width: 90%;
    padding: 15px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }
}


/* table modal*/

/* Box-sizing only for the modal and its elements */
.custom-modal,
.modal-content,
.input-group,
.input-group input,
.btn {
  box-sizing: border-box;
}

/* Modal Background */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Modal Content */
.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  height: 95vh;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.3s ease-in-out;
}

/* Modal Container */
.modal-container {
  background-color: #ffffff;
  /* White background for the modal */
  border-radius: 10px;
  width: 450px;
  max-width: 90%;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.3s ease-in-out;
}

/* Modal Title */
.modal-title {
  font-size: 24px;
  /* Slightly larger font size */
  font-weight: bold;
  color: #333;
  /* Darker color for better readability */
  margin-bottom: 15px;
  text-align: center;
  /* Centered title */
}


/* Input Group */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* Added gap between input fields */
}

.input-group input {
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #007bff;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s ease-in-out;
}

.input-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

/* Buttons */
.btn {
  flex: 1;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

/* Add Button */
.add-btn {
  background-color: #28a745;
  color: white;
  margin-right: 8px;
}

.add-btn:hover {
  background-color: #218838;
}

/* Update Button */
.update-btn {
  background-color: #ffc107;
  color: white;
  margin-right: 8px;
}

.update-btn:hover {
  background-color: #e0a800;
}

/* Close Button - Improved Styling */
.close-btn {
  background-color: crimson;
  color: white;
  margin-left: 8px;
  padding: 12px 15px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  text-align: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.close-btn:hover {
  background-color: red;
}



@media (max-width: 768px) {
  .search-input {
    width: 80%;
  }

  .employee-table th,
  .employee-table td {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .payslip {
    width: 90%;
    height: auto;
    max-height: 90vh;
    padding: 15px;
  }

  .payslip-body {
    overflow-y: auto;
    max-height: 60vh;
  }
}

@media (max-width: 480px) {
  .payslip {
    width: 95%;
    padding: 10px;
  }

  .payslip-section h3 {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 10px;
  }
}
</style>
