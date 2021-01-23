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
      store.dispatch('tasks/getTasks');
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
