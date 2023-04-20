import Auth from '../pages/Auth/Auth';
import Main from '../pages/Main/Main';
import { LOGIN_ROUTE, TASK_ROUTE } from '../utils/consts';

export const routes = [
  {
      path: LOGIN_ROUTE,
      Component: Auth
  },
  {
      path: TASK_ROUTE,
      Component: Main
  },
]