import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();

   useEffect(() => {
      if (!currentUser) {
         navigate('/signin');
      }
   }, [currentUser, navigate]);

   return (
      <div className='flex h-screen overflow-hidden bg-semiDark'>
         <Sidebar />
         <Outlet />
      </div>
   );
};

export default Layout;
