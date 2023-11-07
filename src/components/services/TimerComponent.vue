<template>
  <div class="timer">
    <div>
      <span v-if="minutes">{{ minutes }} m:</span>{{ seconds }} s
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      running: false,
      totalSeconds: 0,
      intervalId: null,
      unitId: +this.$router.currentRoute.query.unitId,
      lessonId: +this.$router.currentRoute.query.lessonId
    };
  },
  computed: {
    minutes() {
      return Math.floor(this.totalSeconds / 60);
    },
    seconds() {
      return this.totalSeconds % 60;
    },
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      if (!this.running) {
        this.running = true;
        this.intervalId = setInterval(this.updateTimer, 1000);
      }
    },
    stopTimer() {
      if (this.running) {
        this.running = false;
        clearInterval(this.intervalId);
        this.$store.dispatch("updateAttempts", {time: this.totalSeconds, unitId: this.unitId, lessonId: this.lessonId});
        localStorage.setItem("course_test_progress", JSON.stringify(this.$store.state.userData));
        this.totalSeconds = 0;
      }
    },
    updateTimer() {
      this.totalSeconds++;
    },
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>

<style scoped>
.timer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
