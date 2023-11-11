import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './component/Layout.jsx';

const routes = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Dashboard />,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <RouterProvider router={routes} />
         </PersistGate>
      </Provider>
   </React.StrictMode>
);
