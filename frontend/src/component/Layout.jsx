import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();

   useEffect(() => {
      if (!currentUser) {
         navigate('/signin');
      }
   }, [currentUser, navigate]);

   return (
      <>
         <Navbar />
         <div className="w-full sm:pl-20 lg:pl-64 py-10 min-h-screen bg-semiDark">
            <Outlet />
         </div>
      </>
   );
};

export default Layout;
