<template>
  <div class="card">
    <h2>Страница не найдена</h2>
    <router-link to="/" custom v-slot="{ navigate }">
      <app-button :modifier="primary" @action="navigate">
        На главную
      </app-button>
    </router-link>
  </div>
</template>
<script>
import { inject } from 'vue';
import AppButton from '../components/UI/AppButton';

export default {
  setup: () => {
    return {
      primary: inject('primary')
    };
  },
  components: {
    AppButton
  }
};
</script>
