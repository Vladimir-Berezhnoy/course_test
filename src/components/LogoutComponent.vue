<template>
  <button @click="logout()" class="logout">Logout</button>
</template>

<script>
import router from "@/router";

export default {
  name: "LogoutComponent",
  data() {
    return {};
  },
  methods: {
    logout() {
      if (localStorage.getItem("course_test_uid") !== null) {
        localStorage.removeItem("course_test_uid");
      }
      router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss">
.logout {
  background-color: var(--error-color);
  color: #fff;
  padding: 8px 25px;
  border-radius: 8px;
}
</style>
