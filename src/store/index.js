import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    employees: null,
    attendance: null,
    payroll: null,
    token: localStorage.getItem("token") || null, // Check if token exists in localStorage
    user: null,
  },
  getters: {
    allEmployees(state) {
      return state.employees;
    },
    allAttendance(state) {
      return state.attendance;
    },
    allPayroll(state) {
      return state.payroll;
    },
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
    setAttendance(state, attendance) {
      state.attendance = attendance;
    },
    setPayroll(state, payroll) {
      state.payroll = payroll;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async AllEmployees({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/employees");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const info = await response.json();
        commit("setEmployees", info);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },

    async deleteEmployee({ dispatch }, employeeID) {
      try {
        await fetch(`http://localhost:3000/employees/${employeeID}`, {
          method: "DELETE",
        });
        dispatch("AllEmployees"); // Refresh the employee list
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    },

    async addEmployee({ dispatch }, payload) {
      try {
        await fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("AllEmployees"); // Refresh the employee list
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },

    async updateEmployee({ dispatch }, payload) {
      try {
        await fetch(`http://localhost:3000/employees/${payload.employeeID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("AllEmployees"); // Refresh the employee list
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    },

    async AllAttendance({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/attendance");
        if (!response.ok) throw new Error("Failed to fetch attendance");
        const info = await response.json();
        commit("setAttendance", info);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    },

    async addAttendance({ dispatch }, payload) {
      try {
        await fetch("http://localhost:3000/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("AllAttendance"); // Refresh the attendance list
      } catch (error) {
        console.error("Error adding attendance:", error);
      }
    },

    async updateAttendance({ commit }, payload) {
      try {
        const response = await fetch(
          `http://localhost:3000/attendance/${payload.employeeID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              attendance_Status: payload.attendance_Status,
            }),
          }
        );

        if (response.ok) {
          commit("setAttendance", payload); // Update the attendance data in the store
        } else {
          throw new Error("Failed to update attendance");
        }
      } catch (error) {
        console.error("Error updating attendance:", error);
      }
    },

    async AllPayroll({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/payroll");
        if (!response.ok) throw new Error("Failed to fetch payroll");
        const info = await response.json();
        commit("setPayroll", info);
      } catch (error) {
        console.error("Error fetching payroll:", error);
      }
    },

    async deletePayroll({ dispatch }, payroll_ID) {
      try {
        await fetch(`http://localhost:3000/payroll/${payroll_ID}`, {
          method: "DELETE",
        });
        dispatch("AllPayroll"); // Refresh the payroll list
      } catch (error) {
        console.error("Error deleting payroll:", error);
      }
    },

    async addPayroll({ dispatch }, payload) {
      try {
        await fetch("http://localhost:3000/payroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("AllPayroll"); // Refresh the payroll list
      } catch (error) {
        console.error("Error adding payroll:", error);
      }
    },

    async updatePayroll({ dispatch }, payload) {
      try {
        await fetch(`http://localhost:3000/payroll/${payload.payroll_ID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("AllPayroll"); // Refresh the payroll list
      } catch (error) {
        console.error("Error updating payroll:", error);
      }
    },
  },
  async loginUser({ commit }, credentials) {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        credentials
      );
      const { token, user } = response.data;

      // Save the token and user data in localStorage
      localStorage.setItem("token", token);
      commit("setToken", token);
      commit("setUser", user);
    } catch (error) {
      console.error("Error logging in", error);
      throw new Error("Invalid credentials");
    }
  },
  logoutUser({ commit }) {
    // Clear localStorage and state
    localStorage.removeItem("token");
    commit("setToken", null);
    commit("setUser", null);
  },
  modules: {
    // You can add modules here if needed
  },
});
