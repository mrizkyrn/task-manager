import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/user/userSlice';

const Header = () => {
   const [showDropdown, setShowDropdown] = useState(false);
   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);

   const handleLogout = () => {
      dispatch(signout());
   };

   return (
      <>
         <nav className="w-full flex justify-between items-center px-5 py-3 bg-slate-800">
            <p className="text-white font-semibold text-base">Task Manager</p>

            <div className="relative">
               <button className="flex items-center gap-2" onClick={() => setShowDropdown((prev) => !prev)}>
                  <span className="text-white font-semibold text-base">{currentUser && currentUser.username}</span>
               </button>
               {showDropdown && (
                  <div className="absolute top-10 right-0 w-40 bg-white rounded-md shadow-md p-2">
                     <button className="w-full text-left text-base font-semibold" onClick={handleLogout}>
                        Logout
                     </button>
                  </div>
               )}
            </div>
         </nav>
      </>
   );
};

Header.propTypes = {
   currentUser: PropTypes.object,
};

export default Header;
