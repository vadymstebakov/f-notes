<template>
  <div class="card form-control">
    <label>Фильтровать по статусу:</label>
    <select @change="filterTasks">
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.value"
        :selected="option.value === selectedFilterType"
        >{{ option.text }}</option
      >
    </select>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  emits: ['filter-tasks'],
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  setup: (_, ctx) => {
    const { emit } = ctx;
    const store = useStore();

    const filterTasks = e => {
      emit('filter-tasks', e.target.value);
    };

    const selectedFilterType = computed(() => store.getters['tasks/selectedFilterType']);

    return {
      filterTasks,
      selectedFilterType
    };
  }
};
</script>
