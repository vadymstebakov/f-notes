import { TYPE_ACTIVE } from '../../helpers/constants';

const state = {
  tasks: [],
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
  saveTasks: ctx => {
    const { state } = ctx;

    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  getTasks: (ctx, payload) => {
    const { commit } = ctx;

    commit('addTasks', payload);
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
