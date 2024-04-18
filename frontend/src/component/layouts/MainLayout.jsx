import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import BugReport from '../helpers/BugReport';

const Layout = () => {
   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();

   // if user is not logged in, redirect to signin page
   useEffect(() => {
      if (!currentUser) {
         navigate('/signin');
      }
   }, [currentUser, navigate]);

   return (
      <>
         <Navbar />
         <BugReport />
         <div className="font-poppins w-full pb-28 sm:pb-10 pt-10 sm:pl-20 lg:pl-64 min-h-screen bg-semiDark">
            <Outlet />
         </div>
      </>
   );
};

export default Layout;
