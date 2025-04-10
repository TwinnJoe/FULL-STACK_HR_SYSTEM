<template>
    <div class="container">
        <div class="main">
            <div class="profile">
                <div class="forms-container">
                    <!-- Profile Form -->
                    <form class="profile-form">
                        <h2>Profile</h2>
                        <div class="form-group" v-for="field in formFields" :key="field.id">
                            <label :for="field.id">{{ field.label }}</label>
                            <input :type="field.type" :id="field.id" v-model="field.model"
                                :placeholder="field.placeholder" />
                        </div>
                        <button type="button" class="update-btn" @click="updateProfile">
                            Update Profile
                        </button>
                    </form>



                </div>
                <!-- Logout Button -->
                <div class="logout-container">
                    <button type="button" class="logout-btn" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileView",
    data() {
        return {
            Name: "",
            email: "",
            number: "",
            address: "",
            formFields: [
                { id: "full-name", label: "Full Name", type: "text", placeholder: "Full Name" },
                { id: "email", label: "Email", type: "email", placeholder: "Email" },
                { id: "phone-number", label: "Phone Number", type: "text", placeholder: "Phone Number" },
                { id: "address", label: "Address", type: "text", placeholder: "Home Address" },
            ],
        };
    },
    methods: {
        updateProfile() {
            console.log("Profile updated:", {
                fullName: this.fullName,
                email: this.email,
                number: this.number,
                address: this.address,
            });
        },
        logLeaveRequest() {
            console.log("Leave Request Submitted:", {
                leaveType: this.leaveType,
                leaveStart: this.leaveStart,
                leaveEnd: this.leaveEnd,
                leaveReason: this.leaveReason,
            });
        },
        logout() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    min-height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
    justify-content: center;
    align-items: center;
}

/* Main Content */
.main {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    gap: 20px;
    flex: 1;
    padding: 20px;
    background-color: #ddd;
    height: 100vh;
    overflow: auto;
}

/* Forms Container: Displays the forms side by side */
.forms-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    max-width: 1000px;
    width: 100%;
}

/* Form styles */
.profile-form,
.leave-form {
    flex: 1;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    max-width: 450px;
    width: 100%;
}

/* Heading styles */
h2 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

/* Form Group */
.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 1rem;
}

/* Buttons */
.update-btn,
.log-request-btn {
    background-color: #007bff;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    width: 100%;
    margin-top: 20px;
    transition: background 0.3s;
}

.update-btn:hover,
.log-request-btn:hover {
    background-color: #28a745;
}

/* Logout Button Styling */
.logout-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.logout-btn {
    background-color: #dc3545;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    width: 200px; /* Optional: set a specific width */
    transition: background 0.3s;
}

.logout-btn:hover {
    background-color: #c82333;
}
</style>
