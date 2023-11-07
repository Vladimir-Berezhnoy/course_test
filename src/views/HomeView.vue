<template>
  <div class="home">
    <LoginComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from '@/components/LoginComponent.vue'

export default {
  name: 'HomeView',
  components: {
    LoginComponent
  }
}
</script>

<style lang="scss">
.home {
  padding-top: 10vh;
}
</style>