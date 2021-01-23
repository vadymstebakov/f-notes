<template>
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
</template>
<script>
import { inject } from 'vue';
import AppStatus from './UI/AppStatus';
import AppButton from './UI/AppButton';

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    return {
      primary: inject('primary')
    };
  },
  components: {
    AppStatus,
    AppButton
  }
};
</script>
