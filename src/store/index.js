import { createStore, createLogger } from 'vuex';
import tasks from './modules/tasks';

export default createStore({
  plugins: [createLogger()],
  modules: {
    tasks
  }
});
