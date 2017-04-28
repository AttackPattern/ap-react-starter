import HomePage from './components/Homepage/index.jsx';
import SubPage from './components/SubPage/index.jsx';

export default [
  {
    path: '/',
    component: HomePage,
  }, {
    path: '/child',
    component: SubPage,
  },
];
