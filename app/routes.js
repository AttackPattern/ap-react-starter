import AppRoot from './components/AppRoot.jsx';
import SomePage from './components/something/index.jsx';
import NotFound from './components/NotFound/index.jsx';

export default [{
  component: AppRoot,
  path: '/',
  indexRoute: { component: SomePage },
  childRoutes: [/*{
    component: ComponentName,
    path: '/path-you-wanted' ,
  },*/{
    component: NotFound,
    path: '*',
    status: 404,
  }],
}];
