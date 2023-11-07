<template>
  <div class="platform">
    <NavigationComponent :units="content" />
    <ContentComponent :unit="currentUnit" />
  </div>
</template>

<script>
import ContentComponent from "@/components/platform/ContentComponent.vue";
import NavigationComponent from "@/components/platform/NavigationComponent.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    ContentComponent,
    NavigationComponent,
  },
  data() {
    return {
      content: [],
      currentUnit: {},
    };
  },
  watch: {
    "$route.query": {
      handler: function () {
        this.getCurrentContent();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getAllContent();
    this.getProgress();
    this.setUser();
    this.getCurrentContent();
  },
  methods: {
    getAllContent() {
      axios
        .get("db/content/content.json")
        .then((response) => {
          this.content = response.data.units;
        })
        .catch((error) => {
          console.error("Error while downloading lessons", error);
        });
    },
    getCurrentContent() {
      const query = this.$router.currentRoute.query;
      axios
        .get("db/content/content.json")
        .then((response) => {
          this.currentUnit = response.data.units.find(
            (elem) => elem.unitId === +query.unitId
          );
        })
        .catch((error) => {
          console.error("Error while downloading lessons", error);
        });
    },
    setUser() {
      this.$store.dispatch("updateUser", localStorage.getItem("course_test_uid"));
    },
    getProgress() {
      if (localStorage.getItem("course_test_progress")) {
        const userData = JSON.parse(localStorage.getItem("course_test_progress"));
        if (+userData.uid === JSON.parse(localStorage.getItem("course_test_uid"))) {
          this.$store.commit('initAttempts', JSON.parse(localStorage.getItem("course_test_progress")))
        } else {
          localStorage.removeItem("course_test_progress")
        }
      }
    }
  },
};
</script>

<style scoped lang="scss">
.platform {
  padding: 25px 25px 25px 0;
}
</style>
