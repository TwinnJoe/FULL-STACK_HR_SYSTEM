<template>
  <div class="layout-with-sidebar">
    <div :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>
            <div class="brand" v-if="!isSidebarCollapsed">HR System</div>
          </span>
          <button class="toggle-btn" @click="toggleSidebar">
            <box-icon
              :name="isSidebarCollapsed ? 'menu' : 'x'"
              :rotate="isSidebarCollapsed ? '0' : '90'" color="white"
            >
            </box-icon>
          </button>
        </div>
        <ul>
          <li v-for="menu in menus" :key="menu.name" :class="{ active: isActive(menu.route) }">
            <box-icon :name="menu.icon"  color="white" class="icon"></box-icon>
            <router-link
              v-if="!isSidebarCollapsed"
              :to="menu.route"
              class="nav-link"
            >
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarCollapsed: true,
      menus: [
        { name: "Home", icon: "home-smile", route: "/home" },
        { name: "Finance", icon: "money", route: "/workersview" },
        { name: "Employees", icon: "user-circle", route: "/attendanceview" },
        { name: "Log-Out", icon: "log-out", route: "/" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
/* Layout */
.layout-with-sidebar {
  display: flex;
  height: 100vh;
  background-color: #f4f4f9;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px;
  background: #222;
  padding: 1rem;
  color: white;
  height: 100vh;
  transition: width 0.3s ease-in-out;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-collapsed .sidebar {
  width: 60px;
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 1.2rem;
  font-weight: bold;
 margin: 0 auto;
  color: #fff;
}

/* Sidebar Toggle Button */
.toggle-btn {
  background: #007bff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.toggle-btn:hover {
  background: #0056b3;
}

/* Sidebar Navigation */
.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  transition: background 0.3s ease, transform 0.2s;
  cursor: pointer;
}

.sidebar ul li:hover {
  background-color: #007bff;
  transform: scale(1.05);
}

.sidebar ul li.active {
  background-color: #007bff;
}

.sidebar ul li .nav-link {
  margin-left: 12px;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: color 0.3s;
}

.sidebar ul li:hover .nav-link {
  color: #fff;
}

/* Icons */
.icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

</style>
