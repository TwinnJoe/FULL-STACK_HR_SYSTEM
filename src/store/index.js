import { createStore } from "vuex";
import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;

const fetchData = async (url, method = "GET", body = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) throw new Error(`Failed to ${method} ${url}`);
  return method === "GET" ? response.json() : null;
};

export default createStore({
  state: {
    employees: null,
    attendance: null,
    payroll: null,
    token: localStorage.getItem("token") || null,
    user: null,
  },
  getters: {
    allEmployees: (state) => state.employees,
    allAttendance: (state) => state.attendance,
    allPayroll: (state) => state.payroll,
  },
  mutations: {
    setEmployees: (state, data) => (state.employees = data),
    setAttendance: (state, data) => (state.attendance = data),
    setPayroll: (state, data) => (state.payroll = data),
    setUser: (state, user) => (state.user = user),
    setToken: (state, token) => (state.token = token),
  },
  actions: {
    async fetchEmployees({ commit }) {
      const data = await fetchData("/employees");
      commit("setEmployees", data);
    },
    async addEmployee({ dispatch }, payload) {
      await fetchData("/employees", "POST", payload);
      dispatch("fetchEmployees");
    },
    async updateEmployee({ dispatch }, { employeeID, ...payload }) {
      await fetchData(`/employees/${employeeID}`, "PATCH", payload);
      dispatch("fetchEmployees");
    },
    async deleteEmployee({ dispatch }, id) {
      await fetchData(`/employees/${id}`, "DELETE");
      dispatch("fetchEmployees");
    },

    async fetchAttendance({ commit }) {
      const data = await fetchData("/attendance");
      commit("setAttendance", data);
    },
    async addAttendance({ dispatch }, payload) {
      await fetchData("/attendance", "POST", payload);
      dispatch("fetchAttendance");
    },
    async updateAttendance({ dispatch }, { employeeID, attendance_Status }) {
      await fetchData(`/attendance/${employeeID}`, "PATCH", { attendance_Status });
      dispatch("fetchAttendance");
    },

    async fetchPayroll({ commit }) {
      const data = await fetchData("/payroll");
      commit("setPayroll", data);
    },
    async addPayroll({ dispatch }, payload) {
      await fetchData("/payroll", "POST", payload);
      dispatch("fetchPayroll");
    },
    async updatePayroll({ dispatch }, { payroll_ID, ...payload }) {
      await fetchData(`/payroll/${payroll_ID}`, "PATCH", payload);
      dispatch("fetchPayroll");
    },
    async deletePayroll({ dispatch }, id) {
      await fetchData(`/payroll/${id}`, "DELETE");
      dispatch("fetchPayroll");
    },

    async loginUser({ commit }, credentials) {
      try {
        const res = await axios.post(`${BASE_URL}/users`, credentials);
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        commit("setToken", token);
        commit("setUser", user);
      } catch (error) {
        console.error("Login failed:", error);
        throw new Error("Invalid credentials");
      }
    },

    logoutUser({ commit }) {
      localStorage.removeItem("token");
      commit("setToken", null);
      commit("setUser", null);
    },
  },
  modules: {},
});