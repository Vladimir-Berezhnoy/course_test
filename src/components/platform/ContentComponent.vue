<template>
  <div class="content">
    <div class="content-container" v-if="unit && unit.lessons">
      <div v-if="!isStart">
        <div class="content-description">
          <h2>
            {{ unit.unitTitle }}
          </h2>
          <p>
            <b>{{ unit.unitDescription }} </b>Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Fugit odit molestiae quos eius
            debitis quia! Harum, dolorum? Sunt, iste nostrum! Deleniti veritatis
            odio, modi labore rerum aperiam nesciunt error beatae!
          </p>
        </div>
        <div class="content-lesson">
          <div
            class="content-lesson-description"
            v-if="unit.lessons[+$router.currentRoute.query.lessonId]"
          >
            <h3>
              {{
                unit.lessons[+$router.currentRoute.query.lessonId].lessonTitle
              }}
            </h3>
            <p>
              <b>{{
                unit.lessons[+$router.currentRoute.query.lessonId]
                  .lessonDescription
              }}</b>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
              voluptates est deserunt aperiam corrupti ea obcaecati saepe
              pariatur doloremque architecto libero alias officiis nam assumenda
              ipsa, accusantium ullam! Repellendus repellat sint eligendi
              doloribus temporibus dolorem itaque corporis accusantium ex facere
              illum molestias, impedit id ratione ea accusamus praesentium
              beatae. Enim!
            </p>
            <div
              class="content-lesson-attempts"
              v-if="userData.attempts[+$router.currentRoute.query.unitId] && userData.attempts[+$router.currentRoute.query.unitId].lessons[+$router.currentRoute.query.lessonId]"
            >
              <p>
                <b>Count of attempts:</b>
                {{
                  userData.attempts[+$router.currentRoute.query.unitId].lessons[
                    +$router.currentRoute.query.lessonId
                  ].attemptsCount
                }}
              </p>
              <p>
                <b>Last spending time:</b>
                {{
                  userData.attempts[+$router.currentRoute.query.unitId].lessons[
                    +$router.currentRoute.query.lessonId
                  ].time
                }}
                seconds
              </p>
              <p
                v-if="
                  userData.attempts[+$router.currentRoute.query.unitId].lessons[
                    +$router.currentRoute.query.lessonId
                  ].lastDate
                "
              >
              <b>Last date of try:</b>
                {{
                  formatUserFriendlyDate(
                    new Date(
                      userData.attempts[
                        +$router.currentRoute.query.unitId
                      ].lessons[+$router.currentRoute.query.lessonId].lastDate
                    )
                  )
                }}
              </p>
              <p v-else>You didn't tried yet</p>
            </div>
            <button class="content-lesson-start" @click="isStart = true">
              Start lesson
            </button>
          </div>
          <div class="content-lesson-description" v-else>
            <h1>Lesson not found</h1>
          </div>
        </div>
      </div>
      <div v-else>
        <TimerComponent />
        <div
          class="lesson"
          v-html="
            unit.lessons[+$router.currentRoute.query.lessonId].lessonContent
          "
        ></div>
        <button class="lesson-button" @click="finishLesson()">Finish lesson</button>
      </div>
    </div>
    <NotificationComponent
      v-if="showNotification"
      :message="notificationMessage"
      :type="notificationType"
      @close="closeNotification"
      :closeAfter="4000"
    />
  </div>
</template>

<script>
import TimerComponent from "../services/TimerComponent.vue";
import NotificationComponent from "@/components/services/NotificationComponent.vue";

export default {
  name: "ContentComponent",
  components: {
    TimerComponent,
    NotificationComponent
  },
  props: {
    unit: {
      type: Object,
    },
  },
  data() {
    return {
      isStart: false,
      showNotification: false,
      notificationMessage: "",
      notificationType: "",
    };
  },
  computed: {
    userData() {
      return this.$store.getters.currentUser;
    },
  },
  watch: {
    unit(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.isStart = false;
      }
    },
    "$route.query": {
      handler: function () {
        if (this.isStart === true) {
          this.showErrorNotification()
        }
      },
      deep: true,
    },
  },
  methods: {
    formatUserFriendlyDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return date.toLocaleString("en-GB", options);
    },
    finishLesson() {
      this.isStart = false;
      this.showSuccessNotification()
    },
    showSuccessNotification() {
      this.notificationMessage = "Congratulations! You passed the lesson!";
      this.notificationType = "success";
      this.showNotification = true;
    },
    showErrorNotification() {
      this.notificationMessage = "The lesson has been cancelled";
      this.notificationType = "info";
      this.showNotification = true;
    },
    closeNotification() {
      this.showNotification = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.lesson {
  h2 {
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 15px;
  }
  &-button {
    background-color: var(--blue-300);
    border-radius: 5px;
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    margin-top: 30px;
  }
}
.content {
  padding-left: calc(180px + 25px + 30px);
  text-align: left;
  &-container {
    height: calc(100vh - 60px - 90px - 50px);
    background-color: white;
    border-radius: 25px;
    padding: 25px;
    overflow: auto;
  }
  &-description {
    max-width: 50%;
    margin-bottom: 30px;
    h2 {
      margin-bottom: 15px;
    }
  }
  &-lesson {
    &-start {
      background-color: var(--success-color);
      border-radius: 5px;
      color: #fff;
      padding: 10px 20px;
      font-size: 18px;
    }
    &-description {
      max-width: 65%;
      h3 {
        margin-bottom: 15px;
      }
      p {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
