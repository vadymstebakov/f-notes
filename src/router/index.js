import { createRouter, createWebHistory } from 'vue-router';
import Tasks from './../views/Tasks';

const routes = [
  {
    path: '/',
    name: 'Tasks',
    alias: '/tasks',
    component: Tasks,
    children: [
      {
        path: '/task/:id',
        name: 'Task',
        component: () =>
          import(
            /* webpackChunkName: "task" */
            /* webpackMode: "lazy" */
            '../views/Task'
          )
      }
    ]
  },
  {
    path: '/new',
    name: 'New',
    component: () =>
      import(
        /* webpackChunkName: "new" */
        /* webpackMode: "lazy" */
        '../views/New'
      )
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: () =>
      import(
        /* webpackChunkName: "notFound" */
        /* webpackMode: "lazy" */
        '../views/NotFound'
      )
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});

export default router;
