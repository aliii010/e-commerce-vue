<template>
  <div class="verify-account-page">
    <h1>Account Verification</h1>
    <p>Please click the button below to verify your account.</p>
    <button @click="verifyAccount" class="verify-button">Verify Account</button>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from '../axios'

export default {
  data() {
    return {
      error: ''
    }
  },

  created() {
    if (localStorage.getItem("access")) {
      this.$router.push("/");
    }
  },

  methods: {
    async verifyAccount() {
      const postData = {
        uid: this.$route.params.uid,
        token: this.$route.params.token
      }
      try {
        const response = await axios.post('http://localhost:8000/auth/users/activation/', postData)
        this.$router.push('/login')
      } catch (error) {
        for (const [key, value] of Object.entries(error.response.data)) {
          this.error += `${key}: ${value}\n`;
        }
      }
    }
  },
};
</script>

<style scoped>
.verify-account-page {
  text-align: center;
  margin: 20px;
}

h1 {
  color: #333;
}

p {
  color: #666;
}

.verify-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.verify-button:hover {
  background-color: #369f73;
}

.message {
  margin-top: 20px;
  color: #28a745;
  font-weight: bold;
}

.error {
  color: rgb(168, 0, 0);
  margin: 20px;
}
</style>