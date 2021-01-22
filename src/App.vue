<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import { provide } from 'vue';
import { useStore } from 'vuex';
import { PRIMARY, DANGER, WARNING } from './helpers/constants';
import TheNavbar from './components/TheNavbar';

export default {
  setup: () => {
    const store = useStore();

    const getTasks = () => {
      const tasks = localStorage.getItem('tasks');

      if (!tasks) {
        return;
      }

      store.dispatch('tasks/getTasks', JSON.parse(tasks));
    };
    getTasks();

    provide('primary', PRIMARY);
    provide('danger', DANGER);
    provide('warning', WARNING);

    return {};
  },
  components: {
    TheNavbar
  }
};
</script>
