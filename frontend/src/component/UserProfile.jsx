import PropTypes from 'prop-types';
import { useState } from 'react';
import { editUsernameStart, editUsernameSuccess, editUsernameFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { LogOutIcon, XMarkIcon } from './Icons';
import DialogAlert from './DialogAlert';

const UserProfile = ({ onClose, onAlertLogout, onLogout }) => {
   const { currentUser } = useSelector((state) => state.user);
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const [newUsername, setNewUsername] = useState('');
   const [hasChanged, setHasChanged] = useState(false);
   const dispatch = useDispatch();

   const handleUsernameChange = (e) => {
      setNewUsername(e.target.value);
      setHasChanged(e.target.value !== currentUser.username);
   };

   const handleSaveChanges = async () => {
      if (newUsername.length < 3) {
         toast.error('Username must be at least 3 characters long.', {
            theme: 'colored',
         });
         return;
      }

      try {
         dispatch(editUsernameStart());

         const res = await fetch(`/api/users/${currentUser._id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername }),
         });

         const data = await res.json();

         if (!data.success) {
            console.log(data.message);
            dispatch(editUsernameFailure(data.message));
            return;
         }
         dispatch(editUsernameSuccess(data.user.username));
         toast.success('Username updated successfully.', {
            theme: 'colored',
         });
         onClose();
      } catch (err) {
         console.log(err);
      }
   };

   const handleDeleteAccount = async () => {
      try {
         const res = await fetch(`/api/users/${currentUser._id}`, {
            method: 'DELETE',
            credentials: 'include',
         });

         const data = await res.json();

         if (!data.success) {
            console.log(data.message);
            return;
         }

         onLogout();
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
         <ToastContainer />
         {
            isAlertOpen && (
               <DialogAlert
                  message="Are you sure you want to delete your account?"
                  actionText="Delete"
                  onCancel={() => setIsAlertOpen(false)}
                  onAction={handleDeleteAccount}
               />
            )
         }
         {currentUser && (
            <div className="relative w-full flex flex-col justify-center items-center max-w-md bg-dark rounded-md shadow-lg py-8 px-5">
               <div className="absolute top-6 right-3">
                  <XMarkIcon className="w-7 h-7 text-light cursor-pointer" onClick={onClose} />
               </div>
               <img
                  className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full"
                  src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
                  alt="avatar"
               />
               <div className="flex items-center gap-3">
                  <input
                     type="text"
                     autoComplete="off"
                     className="bg-dark text-light text-center w-full rounded-md mt-4"
                     defaultValue={currentUser.username}
                     onChange={handleUsernameChange}
                  />
               </div>
               <div className="w-full flex justify-center items-center gap-5 mt-16">
                  <Button
                     className="w-full text-sm sm:text-base disabled:bg-gray-700 disabled:hover:bg-gray-700"
                     onClick={handleSaveChanges}
                     disabled={!hasChanged}
                  >
                     Save Changes
                  </Button>

                  <Button className="w-full text-sm sm:text-base flex justify-center items-center" onClick={onAlertLogout}>
                     <LogOutIcon className="w-5 h-5 mr-3" />
                     Logout
                  </Button>
               </div>

               {/* Delete user button */}
               <Button className="w-full text-sm sm:text-base flex justify-center items-center mt-5 !bg-red-800" onClick={() => setIsAlertOpen(true)}>
                  Delete Account
               </Button>
            </div>
         )}
      </div>
   );
};

UserProfile.propTypes = {
   onClose: PropTypes.func.isRequired,
   onAlertLogout: PropTypes.func.isRequired,
   onLogout: PropTypes.func.isRequired,
};

export default UserProfile;
