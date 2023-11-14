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
      <div className="flex h-screen overflow-hidden bg-semiDark">
         <Sidebar />
         <div className="flex flex-col flex-1 w-0 overflow-auto">
            <Outlet />
         </div>
      </div>
   );
};

export default Layout;
