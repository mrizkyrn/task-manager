import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './component/Layout.jsx';
import Home from './pages/Home.jsx';
import Tasks, { loader as tasksLoader } from './pages/Tasks.jsx';
import CreateTask from './pages/CreateTask.jsx';
import EditTask from './pages/EditTask.jsx';
import DetailTask from './pages/DetailTask.jsx';

import 'react-toastify/dist/ReactToastify.min.css';

const router = createBrowserRouter([
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
         {
            path: '/tasks/:id',
            element: <DetailTask />,
         },
         {
            path: '/tasks/create',
            element: <CreateTask />,
         },
         {
            path: '/tasks/:id/edit',
            element: <EditTask />,
         }
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
            <RouterProvider router={router} />
      </PersistGate>
   </Provider>
);
