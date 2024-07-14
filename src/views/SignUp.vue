<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign Up
      </h2>
      <p class="text-red-700" v-if="error">{{ error }}</p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm">
        <div>
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <div class="mt-2">
            <input
              id="first-name"
              name="first-name"
              type="text"
              v-model="firstName"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            />
          </div>
        </div>

        <div>
          <label
            for="second-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Second Name</label
          >
          <div class="mt-2">
            <input
              id="second-name"
              name="second-name"
              type="text"
              v-model="lastName"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            />
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              v-model="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            />
          </div>
        </div>

        <div>
          <label
            for="phone-number"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Phone Number</label
          >
          <div class="relative mt-2 rounded-md shadow-sm flex">
            <div class="absolute inset-y-0 left-0 flex items-center">
              <label for="country-code" class="sr-only">Country code</label>
              <select
                id="country-code"
                name="country-code"
                v-model="countryCode"
                required
                class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-1 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option value="+964">IRQ +964</option>
                <option value="+1">USD +1</option>
              </select>
            </div>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              v-model="phoneNumber"
              class="block w-full rounded-md border-0 py-1.5 pl-28 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              v-model="password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="re-password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Re-Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="re-password"
              name="re-password"
              type="password"
              autocomplete="current-password"
              v-model="rePassword"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        already have an account?
        <RouterLink
          to="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >sign in here</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script scope>
import axios from "axios";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      countryCode: "+964",
      email: "",
      password: "",
      rePassword: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:8000/auth/users/", {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          phone_number: this.countryCode + this.phoneNumber,
          password: this.password,
          re_password: this.rePassword,
        });
        alert(
          "Account was created successfully. Please check your email to activate your account"
        );
        this.$router.push("/login");
      } catch (error) {
        let errorMessage = "";
        for (const [key, value] of Object.entries(error.response.data)) {
          errorMessage += `${key}: ${value}\n`;
        }
        alert(errorMessage.trim());
      }
    },
  },

  created() {
    if (localStorage.getItem("access")) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
.sign-up {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.sign-up div {
  margin-bottom: 1em;
}
.sign-up label {
  display: block;
  margin-bottom: 0.5em;
}
.sign-up input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
.sign-up button {
  padding: 0.7em 1.5em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.sign-up button:hover {
  background-color: #0056b3;
}
</style>
