import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/components/Welcome.vue";
import Admin from "@/components/Admin.vue";
import Home from "@/components/Home.vue";
import SideNav from "@/components/SideNav.vue";
import Workers from "@/views/Workers.vue";
import Attendance from "@/views/Attendance.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/SideNav",
    component: SideNav,
    children: [
      { path: "/workersview", component: Workers },
      { path: "/home", component: Home },
      { path: "/attendanceview", component: Attendance },
    ],
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/WorkersView",
    name: "WorkersView",
    component: Workers,
  },
  {
    path: "/AttendanceView",
    name: "AttendanceView",
    component: Attendance,
  },
  {
    path: "/Admin",
    name: "Admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
