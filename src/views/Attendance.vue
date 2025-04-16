<template>

  <h1>Employees</h1>

  <!-- Attendance Section -->
  <div class="attendance-container">
    <h2>Attendance</h2>
    <div class="scrollable-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in attendance" :key="employee.employeeID + employee.date">
            <td>{{ employee.employeeID }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ formatDate(employee.date) }}</td>
            <td :class="employee.status === 'Present' ? 'status-present' : 'status-absent'">
              {{ employee.status }}
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Attendance Form -->
    <div class="add-attendance-form">
      <h3>Add Attendance</h3>
      <form @submit.prevent="addNewAttendance">
        <label for="employee">Employee:</label>
        <select v-model="newAttendance.employeeID" required>
          <option v-for="employee in employees" :key="employee.employeeID" :value="employee.employeeID">
            {{ employee.name }} ({{ employee.employeeID }})
          </option>
        </select>
        <label for="date">Date:</label>
        <input type="date" v-model="newAttendance.date" required :min="minDate" />
        <label for="status">Status:</label>
        <select v-model="newAttendance.attendance_Status" required>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit">Add Attendance</button>
      </form>
    </div>
  </div>
  <!-- Loading Indicator -->
  <div v-if="loading" class="loading-indicator">Loading...</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AttendanceView',
  data() {
    return {
      newAttendance: { employeeID: '', date: '', attendance_Status: 'Present' },
      loading: true,
    };
  },
  computed: {
    ...mapState({
      attendance: state => state.attendance,
      employees: state => state.employees,
    }),
    minDate() {
      const today = new Date();
      return today.toISOString().split('T')[0]; // Set minimum date to today
    }
  },
  methods: {
    ...mapActions(['AllAttendance', 'addAttendance', 'AllEmployees']),

    async fetchEmployees() {
      await this.AllEmployees();
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    },

    async addNewAttendance() {
      try {
        await this.addAttendance(this.newAttendance);
        this.newAttendance = { employeeID: '', date: '', attendance_Status: 'Present' };
        alert('Attendance added successfully!');
      } catch (error) {
        alert('Failed to add attendance. Please try again.');
      }
    },
  },
  async mounted() {
    try {
      this.loading = true;
      await Promise.all([
        this.AllAttendance(),
        this.fetchEmployees()
      ]);
    } catch (error) {
      console.error('Error during mounted lifecycle:', error);
      alert('Failed to load data. Please try again later.');
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.attendance-container {
  width: 100%;
  max-width: 900px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto 30px;
  box-sizing: border-box;
}

.scrollable-table {
  max-height: 300px;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #e0e0e0;
  font-size: 14px;
}

th {
  background-color: #f4f6f9;
  font-weight: bold;
}

.add-attendance-form {
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.add-attendance-form h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.add-attendance-form form {
  display: grid;
  gap: 15px;
}

.add-attendance-form label {
  font-size: 14px;
  color: #555;
}

.add-attendance-form select,
.add-attendance-form input[type="date"] {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

.add-attendance-form button {
  padding: 12px 20px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: center;
}

.add-attendance-form button:hover {
  background-color: #45a049;
}

.add-attendance-form button:focus {
  outline: none;
}

.status-present {
  color: #4CAF50;
  font-weight: bold;
}

.status-absent {
  color: #c42a2a;
  font-weight: bold;
}

.loading-indicator {
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-top: 20px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .attendance-container {
    padding: 15px;
    margin: 10px;
  }

  .scrollable-table {
    max-height: none;
    overflow-x: auto;
  }

  table {
    min-width: 100%;
    font-size: 13px;
  }

  th,
  td {
    padding: 8px;
  }

  .add-attendance-form {
    padding: 15px;
  }

  .add-attendance-form button {
    width: 100%;
  }
}

@media (max-width: 480px) {

  h1 {
    font-size: 24px;
  }

  .add-attendance-form h3 {
    font-size: 18px;
  }

  .add-attendance-form {
    padding: 10px;
  }

  .add-attendance-form form {
    gap: 10px;
  }

  .add-attendance-form button {
    font-size: 14px;
    padding: 10px;
  }

  th,
  td {
    font-size: 12px;
    padding: 6px;
  }
}
</style>
