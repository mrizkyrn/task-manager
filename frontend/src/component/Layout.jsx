import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();

   useEffect(() => {
      if (!currentUser) {
         navigate('/signin');
      }
   }, [currentUser, navigate]);

   return (
      <div>
         <Header />
         <Outlet />
      </div>
   );
};

export default Layout;
