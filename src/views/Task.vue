<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p>
      <strong>Статус</strong>:
      <app-status :type="task.status.type">{{ task.status.text }}</app-status>
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.date }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <app-button :isDisable="isBtnPendingDisable" :type="types.pending" @action="process">Взять в работу</app-button>
      <app-button :isDisable="isBtnDoneDisable" :modifier="primary" :type="types.done" @action="process">Завершить</app-button>
      <app-button :isDisable="isBtnCancelledDisable" :modifier="danger" :type="types.cancelled" @action="process">Отменить</app-button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import { inject, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {
  TYPE_DONE,
  TYPE_PENDING,
  TYPE_CANCELLED,
  TEXT_DONE,
  TEXT_PENDING,
  TEXT_CANCELLED
} from '../helpers/constants';
import AppStatus from '../components/UI/AppStatus';
import AppButton from '../components/UI/AppButton';

export default {
  setup: () => {
    const store = useStore();
    const route = useRoute();
    const types = reactive({
      done: TYPE_DONE,
      pending: TYPE_PENDING,
      cancelled: TYPE_CANCELLED
    });
    const id = route.params.id;
    const task = store.getters['tasks/tasks'].find(task => task.id === id);

    const selectedFilterType = computed(() => store.getters['tasks/selectedFilterType']);

    const process = type => {
      switch (type) {
        case types.done:
          store.dispatch('tasks/changeTaskStatus', {
            id,
            status: {
              type,
              text: TEXT_DONE
            }
          });
          break;
        case types.pending:
          store.dispatch('tasks/changeTaskStatus', {
            id,
            status: {
              type,
              text: TEXT_PENDING
            }
          });
          break;
        case types.cancelled:
          store.dispatch('tasks/changeTaskStatus', {
            id,
            status: {
              type,
              text: TEXT_CANCELLED
            }
          });
          break;
        default:
          break;
      }

      if (selectedFilterType.value) {
        store.commit('tasks/resetFilter');
      }
      store.dispatch('tasks/saveTasks');
    };

    const isBtnPendingDisable = computed(() => task.status.type === types.pending);
    const isBtnDoneDisable = computed(() => task.status.type === types.done);
    const isBtnCancelledDisable = computed(() => task.status.type === types.cancelled);

    return {
      primary: inject('primary'),
      danger: inject('danger'),
      task,
      id,
      process,
      types,
      isBtnPendingDisable,
      isBtnDoneDisable,
      isBtnCancelledDisable,
    };
  },
  components: { AppStatus, AppButton }
};
</script>
