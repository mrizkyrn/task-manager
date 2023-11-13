import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/user/userSlice';
import { NavLink } from 'react-router-dom';
import { ArrowIcon, GroupTasksIcon, HomeIcon, LogOutIcon, ProjectIcon, TaskIcon } from './Icons';

const SidebarItem = () => [
   {
      name: 'Home',
      icon: <HomeIcon className="w-5 h-5" />,
      path: '/',
   },
   {
      name: 'Tasks',
      icon: <TaskIcon className="w-5 h-5" />,
      path: '/tasks',
   },
   {
      name: 'Group Tasks',
      icon: <GroupTasksIcon className="w-5 h-5" />,
      path: '/group-tasks',
   },
   {
      name: 'Projects',
      icon: <ProjectIcon className="w-5 h-5" />,
      path: '/projects',
   },
];

const Sidebar = () => {
   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);
   const [isOpen, setIsOpen] = useState(true);

   const handleLogout = () => {
      dispatch(signout());
   };

   return (
      <div
         className={`relative flex-shrink-0 flex flex-col h-screen py-10 px-4 bg-dark border-r border-gray-700 duration-300 ease-in-out ${
            isOpen ? 'w-64' : 'w-20'
         }`}
      >
         <button
            className="absolute top-8 -right-5 p-2 rounded-full border border-gray-700 bg-dark text-light hover:bg-gray-700"
            onClick={() => setIsOpen((prev) => !prev)}
         >
            <ArrowIcon className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`} />
         </button>

         <div className="flex items-start mt-6 -mx-2">
            <img
               className="object-cover mx-2 rounded-full duration-300 ease-in-out w-12 h-12"
               src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
               alt="avatar"
            />
            {isOpen && (
               <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
                  {currentUser && currentUser.username}
               </h4>
            )}
         </div>
         <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="flex flex-col gap-2 mt-5">
               {SidebarItem().map(({ name, icon, path }) => (
                  <NavLink
                     key={name}
                     to={path}
                     className={({ isActive }) =>
                        `flex items-center justify-start gap-3 h-12 px-[0.85rem] rounded-lg text-light hover:bg-gray-700 ${
                           isActive ? 'bg-gray-800' : ''
                        }`
                     }
                  >
                     <div>{icon}</div>
                     {isOpen && <span>{name}</span>}
                  </NavLink>
               ))}
            </nav>
            <button
               className="w-full flex justify-start items-center gap-3 h-12 px-3 rounded-lg text-light hover:bg-gray-600 text-start"
               onClick={handleLogout}
            >
               <div>
                  <LogOutIcon className="w-5 h-5" />
               </div>
               {isOpen && <span>Logout</span>}
            </button>
         </div>
      </div>
   );
};

export default Sidebar;
