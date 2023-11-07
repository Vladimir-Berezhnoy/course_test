<template>
  <nav>
    <div class="navigation-container">
      <div v-if="units.length">
        <div v-for="(item, index) in units" :key="item.unitId">
          <NavigationToggleComponent
          :unit="item"
          :index="index"
          :activeUnit="activeUnit"
          :activeLesson="activeLesson"
          @activeUnit="activeUnitEvent"
          @activeLesson="activeLessonEvent"
        />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "@/router";
import NavigationToggleComponent from "./NavigationToggleComponent.vue";

export default {
  components: {
    NavigationToggleComponent
  },
  props: {
    units: {
      type: Array,
    },
  },
  data() {
    return {
      activeUnit: null,
      activeLesson: null,
    };
  },
  mounted: function () {
    const query = router.currentRoute.query
    if (query) {
      this.activeUnit = +query.unitId;
      this.activeLesson = +query.lessonId;
    }
  },
  methods: {
    activeUnitEvent(value) {
      this.activeUnit = value;
    },

    activeLessonEvent(value) {
      if (value !== null && !(+router.currentRoute.query.unitId === this.activeUnit && +router.currentRoute.query.lessonId === value)) {
        router.push({ name: "profile",  query: { unitId: this.activeUnit, lessonId: value }});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  background-color: var(--blue-200);
  // calculate footer, header height + container padding
  height: calc(100% - (90px + 60px + 50px));
  width: 180px;
  position: fixed;
  border-radius: 0 25px 25px 0;
}
</style>
