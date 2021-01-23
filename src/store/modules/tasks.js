import { TYPE_ACTIVE } from '../../helpers/constants';
import { stateProcessor } from '../../helpers/stateProcessor';
import { localStorageClient } from '../../shared/localStorageClient';
import { sleep } from '../../helpers/utils';

const client = stateProcessor(localStorageClient('tasks'));

const state = {
  tasks: [],
  loaded: true,
  filteredTasks: null,
  selectedFilterType: ''
};

const mutations = {
  addTask: (state, payload) => {
    state.tasks.push(payload);
  },
  addTasks: (state, payload) => {
    state.tasks = state.tasks.concat(payload);
  },
  enableLoader: state => {
    state.loaded = false;
  },
  disableLoader: state => {
    state.loaded = true;
  },
  changeTaskStatus: (state, payload) => {
    const { id, status } = payload;

    state.tasks.forEach(task => {
      if (task.id === id) {
        task.status.type = status.type;
        task.status.text = status.text;
      }
    });
  },
  filterTasks: (state, { type }) => {
    state.filteredTasks = state.tasks.filter(task => task.status.type === type);
    state.selectedFilterType = type;
  },
  resetFilter: state => {
    state.filteredTasks = null;
    state.selectedFilterType = '';
  }
};

const actions = {
  createTask: (ctx, payload) => {
    const { commit, dispatch } = ctx;

    commit('addTask', payload);
    dispatch('saveTasks');
  },
  saveTasks: async ctx => {
    try {
      const { state } = ctx;
      await client.save(state.tasks);
    } catch (error) {
      console.error(error.message);
    }
  },
  getTasks: async ctx => {
    const { commit } = ctx;

    try {
      commit('enableLoader');
      await sleep(1000);
      const tasks = await client.get();

      if (tasks) {
        commit('addTasks', tasks);
      }

      commit('disableLoader');
    } catch (error) {
      commit('disableLoader');
      console.error(error.message);
    }
  },
  changeTaskStatus: (ctx, payload) => {
    const { commit } = ctx;

    commit('changeTaskStatus', payload);
  },
  filterTasks: (ctx, payload) => {
    const { commit } = ctx;

    commit('filterTasks', payload);
  }
};

const getters = {
  tasks: state => state.tasks,
  loaded: state => state.loaded,
  filteredTasks: state => state.filteredTasks,
  haveTasks: (_, getters) => getters.tasks.length,
  haveFilteredTasks: (_, getters) => getters.filteredTasks && getters.filteredTasks.length,
  activeTasks: (_, getters) =>
    getters.tasks.filter(task => task.status.type === TYPE_ACTIVE).length,
  selectedFilterType: state => state.selectedFilterType
};

export default {
  namespaced: true,
  state() {
    return state;
  },
  mutations,
  actions,
  getters
};
