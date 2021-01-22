<template>
  <template v-if="haveTasks">
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
    <div class="card form-control">
      <label>Фильтровать по статусу:</label>
      <select @change="filterTasks">
        <option v-for="option in options" :key="option.id" :value="option.value" :selected="option.value === selectedFilterType">{{ option.text }}</option>
      </select>
    </div>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <app-status :type="task.status.type">
          {{ task.status.text }}
        </app-status>
      </h2>
      <p>
        <strong>
          <small>
            {{ task.date }}
          </small>
        </strong>
      </p>
      <router-link :to="`/task/${task.id}`" custom v-slot="{ navigate }">
        <app-button :modifier="primary" @action="navigate">Посмотреть</app-button>
      </router-link>
    </div>
    <h1 class="text-white center" v-if="isTouchSelect && !haveFilteredTasks">Задач пока нет</h1>
  </template>
  <h1 class="text-white center" v-else>Задач пока нет</h1>
</template>

<script>
import { inject, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { TYPE_DONE, TYPE_ACTIVE, TYPE_PENDING, TYPE_CANCELLED, TEXT_DONE, TEXT_ACTIVE, TEXT_PENDING, TEXT_CANCELLED } from '../helpers/constants';
import AppStatus from '../components/UI/AppStatus';
import AppButton from '../components/UI/AppButton';

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
      },
    ];
    const store = useStore();
    const isTouchSelect = ref(false);

    const filterTasks = e => {
      const type = e.target.value;

      if (type === '') {
        store.commit('tasks/resetFilter');
        isTouchSelect.value = false;

        return;
      }

      store.dispatch('tasks/filterTasks', {
        type,
      });

      isTouchSelect.value = true;
    };

    const tasks = computed(() => store.getters['tasks/filteredTasks'] || store.getters['tasks/tasks']);

    const haveTasks = computed(() => store.getters['tasks/haveTasks']);

    const haveFilteredTasks = computed(() => store.getters['tasks/haveFilteredTasks']);

    const activeTasks = computed(() => store.getters['tasks/activeTasks']);

    const selectedFilterType = computed(() => store.getters['tasks/selectedFilterType']);

    return {
      primary: inject('primary'),
      tasks,
      haveTasks,
      haveFilteredTasks,
      activeTasks,
      filterTasks,
      isTouchSelect,
      options,
      selectedFilterType,
    };
  },
  components: { AppStatus, AppButton }
};
</script>
