import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {
      attempts: [],
      uid: null,
    },
  },
  mutations: {
    setUser(state, user) {
      state.userData.uid = user;
    },
    initAttempts(state, progress) {
      state.userData = progress
    },
    setAttempts(state, progress) {
      if (state.userData.attempts.length && state.userData.attempts.find((elem) => elem.unitId === progress.unitId)) {
        if (state.userData.attempts.find((elem) => elem.unitId === progress.unitId).lessons[progress.lessonId]) {
          const item = state.userData.attempts.find((elem) => elem.unitId === progress.unitId).lessons[progress.lessonId]
          state.userData.attempts.find((elem) => elem.unitId === progress.unitId).lessons[progress.lessonId].attemptsCount = item.attemptsCount + 1;
          state.userData.attempts.find((elem) => elem.unitId === progress.unitId).lessons[progress.lessonId].lastDate = Date.now();
          state.userData.attempts.find((elem) => elem.unitId === progress.unitId).lessons[progress.lessonId].time = progress.time
        } else {
          state.userData.attempts.find((elem) => elem.unitId === progress.unitId).lessons[progress.lessonId] = {
            attemptsCount: 1,
            lastDate: Date.now(),
            time: progress.time
          }
        }
      } else {
        const lessonsCollection = []
        for (let i = 0; i < progress.lessonId; i++) {
          lessonsCollection.push({
            attemptsCount: 0,
            time: 0,
          })
        }
        lessonsCollection[progress.lessonId] = {
          attemptsCount: 1,
          lastDate: Date.now(),
          time: progress.time
        }
        state.userData.attempts = [{unitId: progress.unitId, lessons: lessonsCollection}]
      }
    },
  },
  actions: {
    updateUser({ commit }, user) {
      // Логіка реєстрації користувача
      commit("setUser", user);
    },
    updateAttempts({ commit }, progress) {
      commit("setAttempts", progress)
    }
  },
  getters: {
    currentUser: (state) => state.userData,
  },
  modules: {},
});
