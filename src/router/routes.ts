import LoggedInLayout from '@/layout/LoggedIn/LoggedIn.layout.vue'

export const routes = [
  {
    path: '/',
    component: LoggedInLayout,
    children: [
      {
        path: '/todo',
        name: 'rtodo',
        component: () =>
          import(/* webpackChunkName: "todo" */ '@/pages/ToDo/ToDo.page.vue'),
      },
      {
        path: '/report',
        name: 'rreport',
        component: () =>
          import(
            /* webpackChunkName: "report" */ '@/pages/Report/Report.page.vue'
          ),
      },
      {
        path: '*',
        redirect: '/todo'
      }
    ],
  },
  {
    path: '*',
    redirect: '/todo'
  }
]
