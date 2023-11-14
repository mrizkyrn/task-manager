import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Home from './pages/Home.jsx';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './component/Layout.jsx';
import Tasks, { loader as tasksLoader } from './pages/Tasks.jsx';
import NotFound from './pages/NotFound.jsx';

const routes = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/tasks',
            element: <Tasks />,
            loader: tasksLoader,
         },
      ],
   },
   {
      path: '/signup',
      element: <SignUp />,
   },
   {
      path: '/signin',
      element: <SignIn />,
   },
   {
      path: '*',
      element: <NotFound />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
         <RouterProvider router={routes} />
      </PersistGate>
   </Provider>
);
