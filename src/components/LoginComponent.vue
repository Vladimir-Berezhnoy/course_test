<template>
  <form class="login-form" @submit.prevent="login">
    <div class="login-form-header">Login</div>
    <div class="login-form-wrapper">
      <label class="login-form-label"
        >Username:
        <input
          type="text"
          class="login-form-input"
          v-model="formData.username"
          :class="{ 'login-form-input-error': error }"
          :disabled="isLoading"
        />
      </label>

      <label class="login-form-label"
        >Password:
        <input
          type="text"
          class="login-form-input"
          v-model="formData.password"
          :class="{ 'login-form-input-error': error }"
          :disabled="isLoading"
        />
      </label>

      <button
        type="submit"
        class="login-form-button"
        :disabled="!isValid"
        v-if="!isLoading"
      >
        Login
      </button>

      <LoaderComponent ref="spinner" />
      <NotificationComponent
        v-if="showNotification"
        :message="notificationMessage"
        :type="notificationType"
        @close="closeNotification"
        :closeAfter="4000"
      />
    </div>
  </form>
</template>

<script>
import NotificationComponent from "@/components/services/NotificationComponent.vue";
import LoaderComponent from "@/components/services/LoaderComponent.vue";
import router from "@/router/index";
import axios from "axios";

export default {
  name: "LoginComponent",
  components: {
    NotificationComponent,
    LoaderComponent,
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      isValid: false,
      isLoading: false,
      error: false,
      showNotification: false,
      notificationMessage: "",
      notificationType: "",
    };
  },
  watch: {
    formData: {
      handler(val) {
        val.password.length > 0 && val.username.length > 0
          ? (this.isValid = true)
          : (this.isValid = false);
        this.error ? (this.error = false) : this.error;
      },
      deep: true,
    },
  },
  created() {
    if (localStorage.getItem("course_test_uid") !== null) {
      router.push({ name: "profile" });
    }
  },
  methods: {
    login() {
      this.showLoader();
      setTimeout(() => {
        axios
          .get("db/users/users.json")
          .then((response) => {
            const users = response.data.users;
            const result = users.some(
              (user) =>
                user.name === this.formData.username &&
                user.password === this.formData.password
            );
            const userId = result
              ? users.find(
                  (user) =>
                    user.name === this.formData.username &&
                    user.password === this.formData.password
                ).id
              : null;

            if (result) {
              this.error = false;
              this.setUser(userId);
              router.push({ name: "profile" });
            } else {
              this.error = true;
              this.showErrorNotification();
              this.hideLoader();
            }
          })
          .catch((error) => {
            console.error("Error while downloading lessons", error);
          });
      }, 3000);
    },
    // User settings set
    setUser(userData) {
      localStorage.setItem("course_test_uid", userData);
    },
    loginValidation(name, password) {
      axios
        .get("db/users/users.json")
        .then((response) => {
          const users = response.data.users;
          const result = users.some(
            (user) => user.name === name && user.password === password
          );
          const userId = result
            ? users.find(
                (user) => user.name === name && user.password === password
              )
            : null;
          return [result, userId];
        })
        .catch((error) => {
          console.error("Error while downloading lessons", error);
        });
    },
    // Show the loader
    showLoader() {
      this.$refs.spinner.showLoader();
      this.isLoading = true;
    },
    // hideLoader the loader
    hideLoader() {
      this.$refs.spinner.hideLoader();
      this.isLoading = false;
    },
    showErrorNotification() {
      this.notificationMessage = "Login error!";
      this.notificationType = "error";
      this.showNotification = true;
    },
    closeNotification() {
      this.showNotification = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  &-form {
    border-radius: 5px;
    background-color: var(--blue-200);
    max-width: 448px;
    overflow: hidden;
    margin: 0 auto;
    &-header {
      background-color: var(--blue-300);
      padding: 15px 25px;
      text-align: center;
    }
    &-wrapper {
      padding: 15px 25px 30px;
      text-align: left;
    }
    &-label {
      margin-bottom: 20px;
    }
    &-input {
      width: 100%;
      border-radius: 5px;
      background-color: #fff;
      color: rgb(26, 26, 26);
      border: none;
      height: 38px;
      font-size: 18px;
      padding: 10px;
      &-error {
        border: 1px solid var(--error-color);
      }
      &:disabled {
        color: #888888;
        background-color: #f0f0f0;
        border: 1px solid #cccccc;
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    &-button {
      background-color: var(--success-color);
      width: 100%;
      border-radius: 5px;
      color: #fff;
      padding: 10px 20px;
      font-size: 18px;
      &:disabled {
        cursor: default;
        background-color: #a5d6a7;
        color: #eeeeee;
      }
    }
  }
}
</style>
