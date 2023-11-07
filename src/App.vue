<template>
  <div id="app" class="app">
    <header class="app-header">
      <LogoutComponent v-if="isLogged()"/>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer"></footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    LogoutComponent: () => import('@/components/LogoutComponent.vue')
  },
  methods: {
    isLogged: function() {
      return localStorage.getItem('course_test_uid') !== null
    }
  }
  // computed: {
  //   isLogged: function() {
  //     return localStorage.getItem('course_test_uid') !== null
  //   }
  // }
}

</script>

<style lang="scss">
@import './assets/styles/main.scss';
@import './assets/styles/normalize.scss';

.app {
  display: flex;
  flex-direction: column;
  &-header {
    height: 60px;
    background-color: var(--blue-200);;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
  }
  &-main {
    background-color: var(--blue-100);;
    min-height: calc(100vh - 60px - 90px);
  }
  &-footer {
    background-color: var(--blue-200);;
    height: 90px;
  }
}
</style>
