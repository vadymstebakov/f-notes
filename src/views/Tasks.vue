<template>
  <div v-if="loaded">
    <template v-if="haveTasks">
      <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
      <the-filter :options="options" @filter-tasks="filterTasks"></the-filter>
      <the-task-card :tasks="tasks"></the-task-card>
      <h1 class="text-white center" v-if="isTouchSelect && !haveFilteredTasks">Задач пока нет</h1>
    </template>
    <h1 class="text-white center" v-else>Задач пока нет</h1>
  </div>
  <app-loader v-else></app-loader>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import {
  TYPE_DONE,
  TYPE_ACTIVE,
  TYPE_PENDING,
  TYPE_CANCELLED,
  TEXT_DONE,
  TEXT_ACTIVE,
  TEXT_PENDING,
  TEXT_CANCELLED
} from '../helpers/constants';
import TheFilter from '../components/TheFilter';
import TheTaskCard from '../components/TheTaskCard';
import AppLoader from '../components/UI/AppLoader';

export default {
  setup: () => {
    const options = [
      {
        value: '',
        id: 1,
        text: 'Показать все'
      },
      {
        value: TYPE_DONE,
        id: 2,
        text: TEXT_DONE
      },
      {
        value: TYPE_ACTIVE,
        id: 3,
        text: TEXT_ACTIVE
      },
      {
        value: TYPE_PENDING,
        id: 4,
        text: TEXT_PENDING
      },
      {
        value: TYPE_CANCELLED,
        id: 5,
        text: TEXT_CANCELLED
      }
    ];
    const store = useStore();
    const isTouchSelect = ref(false);

    const filterTasks = type => {
      if (type === '') {
        store.commit('tasks/resetFilter');
        isTouchSelect.value = false;

        return;
      }

      store.dispatch('tasks/filterTasks', {
        type
      });

      isTouchSelect.value = true;
    };

    const tasks = computed(
      () => store.getters['tasks/filteredTasks'] || store.getters['tasks/tasks']
    );

    const haveTasks = computed(() => store.getters['tasks/haveTasks']);

    const haveFilteredTasks = computed(() => store.getters['tasks/haveFilteredTasks']);

    const activeTasks = computed(() => store.getters['tasks/activeTasks']);

    const loaded = computed(() => store.getters['tasks/loaded']);

    return {
      tasks,
      haveTasks,
      haveFilteredTasks,
      activeTasks,
      loaded,
      filterTasks,
      isTouchSelect,
      options
    };
  },
  components: { TheFilter, TheTaskCard, AppLoader }
};
</script>
