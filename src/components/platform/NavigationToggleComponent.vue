<template>
  <div class="unit">
    <div>
      <input
        type="radio"
        :id="`Unit-${index}`"
        name="unit"
        :value="index"
        v-model="selectedUnit"
      />
      <label :for="`Unit-${index}`" class="unit-container">
        <p class="unit-title">Unit {{ index + 1 }}</p>
        <p class="unit-name">"{{ unit.unitTitle }}"</p>
      </label>
    </div>
    <div
      class="lessons-container"
      :class="{ 'lessons-container-visible': selectedUnit === index }"
    >
      <div v-if="selectedUnit === index" class="lessons-list">
        <div
          v-for="(lesson, i) in unit.lessons"
          :key="`Unit-${index}-${lesson.title}-${i}`"
        >
          <input
            type="radio"
            :id="`Unit-${index}-${lesson.title}-${i}`"
            :name="`Unit-${index}`"
            :value="i"
            v-model="selectedLesson"
          />
          <label
            :for="`Unit-${index}-${lesson.title}-${i}`"
            class="lessons-item"
            @click="$emit('isNav', false)"
            >Lesson {{ i + 1 }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    unit: {
      type: Object,
    },
    index: {
      type: Number,
    },
    activeUnit: {
      type: Number,
    },
    activeLesson: {
      type: Number,
    },
  },
  data() {
    return {
      selectedUnit: null,
      selectedLesson: null,
    };
  },
  mounted: function () {
    this.activeUnit !== null
      ? (this.selectedUnit = this.activeUnit)
      : this.selectedUnit;
    this.activeLesson !== null
      ? (this.selectedLesson = this.activeLesson)
      : this.selectedLesson;
  },
  watch: {
    selectedUnit: function (val) {
      if (!isNaN(val)) {
        this.$emit("activeUnit", val);
      }
    },
    selectedLesson: function (val) {
      if (!isNaN(val)) {
        this.$emit("activeLesson", val);
      }
    },
    activeUnit: function (val) {
      this.selectedUnit = val;
      this.selectedLesson = null;
    },
    activeLesson: function (val) {
      this.selectedLesson = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.unit {
  input {
    position: absolute;
    opacity: 0;
    &:checked ~ label.unit-container {
      background-color: var(--blue-300);
      .unit-title {
        color: #fff;
      }
      .unit-name {
        color: #fff;
      }
    }
  }
  &-container {
    display: block;
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
  }
  &-title {
    font-size: 18px;
    line-height: normal;
    color: white;
    margin-bottom: 5px;
  }
  &-name {
    font-size: 14px;
    color: white;
  }
}

.lessons-container {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease-out;
  overflow: hidden;
  &-visible {
    transform: scaleY(1);
  }
  .lessons-list {
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 0;
    list-style: none;
    .lessons-item {
      display: block;
      padding: 18px;
      padding-left: 42px;
      height: 50px;
      border-radius: 8px;
      font-size: 14px;
      width: 100%;
      position: relative;
      cursor: pointer;
      &::before {
        content: "\2022";
        color: var(--blue-100);;
        font-weight: bold;
        display: inline-block;
        width: 26px;
        font-size: 34px;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    input:checked ~ .lessons-item {
      background-color: var(--blue-300);;
      color: #fff;
    }
  }
}
</style>