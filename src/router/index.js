import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    children: [
      { path: '?unit=:unitId', name: 'Unit', component: ProfileView },
      { path: '?unit=:unitId&lesson=:lessonId', name: 'Lesson', component: ProfileView }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("course_test_uid") === null) {
        next('/');
      } else {
        next();
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
