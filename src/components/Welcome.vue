<template>
  <div class="app-container">
    <div class="card">
      <h1 class="title">HR System</h1>
      <p class="description">Streamline HR processes</p>
      <div class="button-group">
        <button class="btn btn-admin" @click="switchToAdmin">Administrator</button>
      </div>
      <p class="footer">© 2024 HR Management System. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeComp",
  methods: {
    switchToAdmin() {
      // Navigate to the admin login route
      this.$router.push({ path: "/Admin" });
    }
  },
};
</script>
<style scoped>
.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #d3d3d3;
}

.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px #0000001a;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1rem;
}

.description {
  font-size: 1rem;
  color: #666666;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-admin {
  background-color: #007bff;
  color: #ffffff;
}

.btn-employee {
  background-color: #28a745;
  color: #ffffff;
}

.footer {
  font-size: 0.875rem;
  color: #aaaaaa;
}

.Wel-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  align-items: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
    /* Reduce padding for smaller screens */
  }

  .title {
    font-size: 1.25rem;
    /* Smaller title font size */
  }

  .description {
    font-size: 0.9rem;
    /* Smaller description font size */
  }

  .btn {
    font-size: 0.9rem;
    /* Smaller button font size */
  }

  .button-group {
    flex-direction: column;
    /* Stack buttons vertically */
    gap: 0.5rem;
    /* Maintain gap between buttons */
  }
}

@media (max-width: 480px) {
  .card {
    padding: 1rem;
    /* Further reduce padding for mobile */
  }

  .title {
    font-size: 1.1rem;
    /* Even smaller title font size */
  }

  .description {
    font-size: 0.85rem;
    /* Even smaller description font size */
  }

  .btn {
    padding: 0.4rem 0.8rem;
    /* Smaller button padding */
  }

  .Wel-logo {
    width: 80px;
    /* Smaller logo size for mobile */
    height: 80px;
    /* Smaller logo size for mobile */
  }
}
</style>