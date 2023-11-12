import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/user/userSlice';
import { NavLink } from 'react-router-dom';
import { LogOutIcon } from './Icons';

const Sidebar = () => {
   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);

   const handleLogout = () => {
      dispatch(signout());
   };
   return (
      <div className="flex-shrink-0 flex flex-col w-64 h-screen py-8 px-4 bg-dark border-r border-gray-700">
         <div className="flex flex-col items-center mt-6 -mx-2">
            <img
               className="object-cover w-24 h-24 mx-2 rounded-full"
               src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
               alt="avatar"
            />
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
               {currentUser && currentUser.username}
            </h4>
         </div>
         <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="flex flex-col gap-2">
               <NavLink
                  to="/"
                  className={({ isActive }) =>
                     `p-3 rounded-lg text-light hover:bg-gray-600 ${isActive ? 'bg-gray-700' : ''}`
                  }
               >
                  Dashboard
               </NavLink>
               <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                     `p-3 rounded-lg text-light hover:bg-gray-600 ${isActive ? 'bg-gray-700' : ''}`
                  }
               >
                  Tasks
               </NavLink>
               <NavLink
                  to="/groups"
                  className={({ isActive }) =>
                     `p-3 rounded-lg text-light hover:bg-gray-600 ${isActive ? 'bg-gray-700' : ''}`
                  }
               >
                  Groups
               </NavLink>
               <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                     `p-3 rounded-lg text-light hover:bg-gray-600 ${isActive ? 'bg-gray-700' : ''}`
                  }
               >
                  Settings
               </NavLink>
            </nav>
            <button className="w-full p-3 rounded-lg text-light hover:bg-gray-600 text-start" onClick={handleLogout}>
               <span className='flex items-center justify-start'>
                  <LogOutIcon className='w-4 h-4 mr-3' />
                  Logout
               </span>
            </button>
         </div>
      </div>
   );
};

export default Sidebar;
