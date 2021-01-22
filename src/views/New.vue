<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="form.title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model.trim="form.date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="form.description"></textarea>
    </div>

    <app-button :isDisable="!areFieldsFill" hasNotClickEvent :modifier="primary">
      Создать
    </app-button>
  </form>
</template>

<script>
import { reactive, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { TYPE_ACTIVE, TEXT_ACTIVE } from '../helpers/constants';
import AppButton from '../components/UI/AppButton';

export default {
  setup: () => {
    const store = useStore();
    const router = useRouter();

    const form = reactive({
      title: '',
      date: '',
      description: ''
    });

    const areFieldsFill = computed(
      () =>
        Boolean(form.title.length && form.date.length && form.description.length) &&
        Boolean(new Date(form.date).getTime() > new Date().getTime())
    );

    const selectedFilterType = computed(() => store.getters['tasks/selectedFilterType']);

    const createTask = () => {
      store.dispatch('tasks/createTask', {
        title: form.title,
        description: form.description,
        id: `_${Date.now()}`,
        date: new Date(form.date).toLocaleDateString(),
        status: {
          type: TYPE_ACTIVE,
          text: TEXT_ACTIVE
        }
      });

      if (selectedFilterType.value) {
        store.commit('tasks/resetFilter');
      }

      form.title = '';
      form.description = '';
      form.date = '';
      router.push('/');
    };

    return {
      primary: inject('primary'),
      form,
      areFieldsFill,
      createTask
    };
  },
  components: {
    AppButton
  }
};
</script>
