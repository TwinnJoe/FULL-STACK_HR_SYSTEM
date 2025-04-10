<template>
  <div id="dashboard" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <!-- Main Content -->
    <main>
      <header>
        <div class="user-profile">
          <img src="https://ca.slack-edge.com/T02LW4RMXJQ-U07Q3KG4K0D-710193470838-512" alt="Profile" />
          <span>Sibongile Nkosi (Administrator)</span>
        </div>
      </header>

      <!-- Stats Cards -->
      <section class="stats-cards">
        <div class="card" v-for="(stat, index) in stats" :key="index">
          <h3>{{ stat.title }}</h3>
          <p>{{ stat.value }} <span :class="stat.trendClass">{{ stat.trend }}</span></p>
        </div>
      </section>

      <!-- Employee Management Form -->
      <section class="employee-form">
        <h2>Manage Employees</h2>
        <form @submit.prevent="handleSubmit">
          <input v-model="employee.employeeID" placeholder="Employee ID" hidden />
          <input v-model="employee.name" placeholder="Name" required />
          <input v-model="employee.position" placeholder="Position" required />
          <input v-model="employee.department" placeholder="Department" required />
          <input v-model="employee.salary" type="number" placeholder="Salary" required />
          <input v-model="employee.employmentHistory" placeholder="Employment History" required />
          <input v-model="employee.contact" placeholder="Contact" required />
          <button type="button" v-show="!isEditing" @click="addEmployee()">Add Employee</button>
          <button type="button" v-show="isEditing" @click="updateEmployee()">Update</button>
        </form>
      </section>

      <!-- Employee Status -->
      <section class="employee-status">
        <h2>Employee Data</h2>
        <div class="table-container">
          <table v-if="employees?.length > 0">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>History</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.employeeID">
                <td>{{ employee.employeeID }}</td>
                <td>{{ employee.name }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.salary }}</td>
                <td>{{ employee.employment_history }}</td>
                <td>{{ employee.contact }}</td>
                <td>
                  <i @click="UpdateEmployee(employee)" style="color:green; cursor: pointer; margin-right: 5px"
                    class="fas fa-pencil"></i>
                  <i @click="deleteEmployee(employee.employeeID)" style="color:red; cursor: pointer;"
                    class="fas fa-trash"></i>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "HomeComp",
  data() {
    return {
      employee: {
        employeeID: "",
        name: "",
        position: "",
        department: "",
        salary: "",
        employmentHistory: "",
        contact: ""
      },
      searchQuery: "",
      isEditing: false,
      stats: [
        { title: "Total Employees", value: 250, trend: "+800%", trendClass: "growth up" },
        { title: "Good Performance", value: 100, trend: "+40%", trendClass: "growth up" },
        { title: "Bad Performance", value: 50, trend: "-20%", trendClass: "growth down" },
        { title: "Average Performance", value: 100, trend: "+40%", trendClass: "growth up" }
      ]
    };
  },
  computed: {
    ...mapState({
      employees: state => state.employees || []
    })
  },
  methods: {
    ...mapActions(['AllEmployees','addEmployee','updateEmployee','deleteEmployee']),

    handleSubmit() {
      if (this.isEditing) {
        this.updateEmployee();
      } else {
        this.addEmployee();
      }
    },
    addEmployee() {
      if (this.employee.name && this.employee.position) {
        this.$store.dispatch('addEmployee', this.employee).then(() => {
          this.AllEmployees(); // Fetch updated data
          this.resetForm();
        });
      }
    },
    UpdateEmployee(payload) {
      this.employee = {
        ...payload,
        employmentHistory: payload.employment_history,
        employeeID: payload.employeeID
      };
      this.isEditing = true;
    },
    updateEmployee() {
      if (this.employee.employeeID) {
        this.$store.dispatch('updateEmployee', this.employee).then(() => {
          this.isEditing = false;
          this.AllEmployees();
          this.resetForm();
        });
      }
    },
    deleteEmployee(id) {
      if (id) {
        this.$store.dispatch('deleteEmployee', id).then(() => {
          this.AllEmployees();
          this.resetForm();
        });
      }
    },
    resetForm() {
      this.employee = {
        employeeID: "",
        name: "",
        position: "",
        department: "",
        salary: "",
        employmentHistory: "",
        contact: ""
      };
    }
  },
  mounted() {
    this.AllEmployees();
    setTimeout(() => {
      this.employee.employeeID = this.employees.length + 1;
    }, 1000);
  }
};
</script>
<style scoped>
#dashboard {
  display: flex;
  background-color: #d3d3d3;
  transition: all 0.3s ease;
}

.employee-form {
  background: #fff;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.employee-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.employee-form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.employee-form button {
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  transition: 0.3s;
  margin-top: 0.5rem;
}

.employee-form button:hover {
  background-color: #0056b3;
}

.employee-status .table-container {
  margin-top: 1.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
  border: 3px solid black;
}

th,
td {
  padding: 8px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  padding: 10px;
  background: white;
  border: 1px solid black;
}

table td {
  padding: 10px;
  border: 1px solid black;
  background: #ddd;
  text-align: left;
}

main {
  flex: 1;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-profile img {
  border-radius: 50%;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  align-items: center;
}

.notification {
  background: none;
  border: none;
  font-size: 20px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  background: #fff;
  padding: 0px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #0000001a;
}

.card .growth {
  font-size: 14px;
}

.card .growth.up {
  color: green;
}

.card .growth.down {
  color: red;
}

.job-statistics,
.employee-status,
.employee-composition {
  margin-bottom: 20px;
}

.chart {
  background: #f9f9f9;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 200px;
}
</style>