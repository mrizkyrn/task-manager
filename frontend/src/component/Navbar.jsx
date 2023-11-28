import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutStart, signoutSuccess, signoutFailure } from '../redux/user/userSlice';
import { GroupTasksIcon, HomeIcon, LogOutIcon, ProjectIcon, TaskIcon } from './Icons';
import DialogAlert from './DialogAlert';
import UserProfile from './UserProfile';

const NavbarItems = () => [
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

const Navbar = () => {
   const dispatch = useDispatch();
   const { currentUser, loading } = useSelector((state) => state.user);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const username = currentUser && currentUser.username;
   const avatar = currentUser && currentUser.avatar;

   const handleProfileClick = () => {
      setIsProfileOpen(true);
   };

   const handleLogout = async () => {
      try {
         dispatch(signoutStart());

         const res = await fetch('/api/auth/signout', {
            method: 'GET',
         });

         const data = await res.json();

         if (!data.success) {
            dispatch(signoutFailure('Something went wrong. Please try again later.'));
            return;
         }

         dispatch(signoutSuccess());
      } catch (err) {
         console.log(err);
         dispatch(signoutFailure('Something went wrong. Please try again later.'));
      }
   };

   return (
      <>
         {/* Desktop Navbar */}
         <div className="w-20 lg:w-64 fixed flex-shrink-0 hidden sm:flex flex-col h-screen py-10 px-4 bg-dark border-r border-gray-700 duration-200 ease-in-out">
            <div className="flex items-start mt-6 -mx-2">
               <img
                  onClick={handleProfileClick}
                  className="object-cover mx-2 rounded-full duration-300 ease-in-out w-12 h-12 cursor-pointer"
                  src={`/avatars/${avatar}.jpg`}
                  alt="avatar"
               />
               <h4 className="hidden lg:block mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
                  {username}
               </h4>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
               <nav className="flex flex-col gap-4 mt-5">
                  {NavbarItems().map(({ name, icon, path }) => (
                     <NavLink
                        key={name}
                        to={path}
                        aria-label={name}
                        className={({ isActive }) =>
                           `flex items-center justify-start gap-3 h-12 px-[0.85rem] rounded-lg text-light hover:bg-gray-700 ${
                              isActive ? 'bg-gray-800' : ''
                           }`
                        }
                     >
                        <div>{icon}</div>
                        <span className="hidden lg:block">{name}</span>
                     </NavLink>
                  ))}
               </nav>
               <button
                  className="w-full flex justify-start items-center gap-3 h-12 px-3 rounded-lg text-light hover:bg-gray-600 text-start"
                  aria-label="logout"
                  onClick={() => setIsAlertOpen(true)}
               >
                  <div>
                     <LogOutIcon className="w-5 h-5" />
                  </div>
                  <span className="hidden lg:block">{loading ? 'Loading...' : 'Logout'}</span>
               </button>
            </div>
         </div>

         {/* Mobile Navbar */}
         <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-2 sm:hidden h-20 px-5 pb-3 bg-dark border-t border-gray-700">
            {NavbarItems().map(({ name, icon, path }) => (
               <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                     `w-full flex justify-center py-3 text-center rounded-lg text-light hover:bg-gray-700 ${
                        isActive ? 'bg-gray-800' : ''
                     }`
                  }
               >
                  <div>{icon}</div>
               </NavLink>
            ))}

            <div className="relative flex justify-center py-3 w-full">
               <img
                  className="object-cover w-8 h-8 rounded-full cursor-pointer"
                  src={`/avatars/${avatar}.jpg`}
                  alt="avatar"
                  onClick={handleProfileClick}
               />
            </div>
         </div>

         {/* Show alet when logout */}
         {isAlertOpen && (
            <DialogAlert
               message="Are you sure you want to logout?"
               actionText="Logout"
               onCancel={() => setIsAlertOpen(false)}
               onAction={handleLogout}
            />
         )}

         {/* Show user profile */}
         {isProfileOpen && (
            <UserProfile
               user={currentUser}
               onClose={() => setIsProfileOpen(false)}
               onAlertLogout={() => setIsAlertOpen(true)}
               onLogout={handleLogout}
            />
         )}
      </>
   );
};

export default Navbar;
