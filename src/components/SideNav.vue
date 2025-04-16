<template>
  <div class="layout-with-sidebar">
    <div :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>
            <div class="brand" v-if="!isSidebarCollapsed">HR Tech</div>
          </span>
          <button class="toggle-btn" @click="toggleSidebar">
            <box-icon :name="isSidebarCollapsed ? 'menu' : 'x'" :rotate="isSidebarCollapsed ? '0' : '90'"
              color="white" />
          </button>
        </div>
        <ul>
          <li v-for="menu in menus" :key="menu.name" :class="{ active: isActive(menu.route) }">
            <router-link :to="menu.route" class="nav-link full-link">
              <box-icon :name="menu.icon" color="white" class="icon" />
              <span v-if="!isSidebarCollapsed">{{ menu.name }}</span>
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
  background-color: #d3d3d3;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #d3d3d3;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px;
  background: #222;
  padding: 1rem;
  height: 97.2%;
  color: white;
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
  width: 100%;
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
  border-radius: 6px;
  margin: 8px;
  padding: 10px;
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

.nav-link.full-link {
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  text-decoration: none;
  padding: 12px;
}

/* Icons */
.icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .layout-with-sidebar {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    overflow-x: auto;
  }

  .sidebar ul {
    display: flex;
    flex-wrap: nowrap;
    padding: 0;
  }

  .sidebar ul li {
    margin: 0 8px;
    padding: 8px;
  }

  .sidebar-collapsed .sidebar {
    width: auto;
  }

  .content {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    padding: 0.5rem;
  }

  .brand {
    font-size: 1rem;
  }

  .icon {
    font-size: 1.2rem;
  }

  .sidebar ul li {
    padding: 8px;
  }

  .toggle-btn {
    padding: 8px;
  }
}
</style>
