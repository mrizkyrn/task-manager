import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { editUserStart, editUsernameSuccess, editAvatarSuccess, editUserFailure } from '../../redux/user/userSlice';
import { changeUsername, changeAvatar, deleteUser } from '../../api/user';
import { LogOutIcon } from '../icons/Icons';
import MainButton from '../buttons/MainButton';
import DialogAlert from '../helpers/DialogAlert';
import SelectAvatar from './SelectAvatar';
import Modal from '../helpers/Modal';

const UserProfile = ({ onClose, onAlertLogout, onLogout }) => {
   const { currentUser } = useSelector((state) => state.user);
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const [isSelectAvatarOpen, setIsSelectAvatarOpen] = useState(false);
   const [newUsername, setNewUsername] = useState(currentUser.username);
   const [newAvatar, setNewAvatar] = useState(currentUser.avatar);
   const [hasChanged, setHasChanged] = useState(false);
   const dispatch = useDispatch();

   const handleUsernameChange = (e) => {
      setNewUsername(e.target.value);
      setHasChanged(e.target.value !== currentUser.username);
   };

   const handleAvatarChange = (avatar) => {
      setNewAvatar(avatar);
      setHasChanged(avatar !== currentUser.avatar);
      setIsSelectAvatarOpen(false);
   };

   const handleSaveChanges = async () => {
      if (newUsername.length < 3) {
         toast.error('Username must be at least 3 characters long.', {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      dispatch(editUserStart());

      if (newUsername !== currentUser.username) {
         const data = await changeUsername(currentUser._id, newUsername);

         if (!data.success) {
            dispatch(editUserFailure(data.message));
            toast.error(data.message, {
               theme: 'colored',
               position: 'top-left',
            });
            return;
         }

         dispatch(editUsernameSuccess(data.data.username));
         toast.success('Username updated successfully.', {
            theme: 'colored',
         });
      }

      if (newAvatar !== currentUser.avatar) {
         const data = await changeAvatar(currentUser._id, newAvatar);

         if (!data.success) {
            dispatch(editUserFailure(data.message));
            toast.error(data.message, {
               theme: 'colored',
               position: 'top-left',
            });
            return;
         }

         dispatch(editAvatarSuccess(data.data.avatar));
         toast.success('Avatar updated successfully.', {
            theme: 'colored',
         });
      }

      onClose();
   };

   const handleDeleteAccount = async () => {
      const data = await deleteUser(currentUser._id);

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      onClose();
      onLogout();
   };

   return (
      <Modal isOpen={true} onClose={onClose}>
         <img
            className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full"
            src={`/avatars/${newAvatar}.jpg`}
            alt="avatar"
            onClick={() => setIsSelectAvatarOpen(true)}
         />
         <div className="flex items-center gap-3">
            <input
               type="text"
               autoComplete="off"
               className="bg-semiDark text-light md:text-lg font-semibold text-center w-full rounded-md mt-4"
               defaultValue={currentUser.username}
               onChange={handleUsernameChange}
            />
         </div>
         <div className="w-full flex justify-center items-center gap-5 mt-16">
            <MainButton
               className="w-full text-sm sm:text-base disabled:bg-gray-700 disabled:hover:bg-gray-700"
               onClick={handleSaveChanges}
               disabled={!hasChanged}
            >
               Save Changes
            </MainButton>

            <MainButton
               className="w-full text-sm sm:text-base flex justify-center items-center"
               onClick={onAlertLogout}
            >
               <LogOutIcon className="w-5 h-5 mr-3" />
               Logout
            </MainButton>
         </div>

         <MainButton
            className="w-full text-sm sm:text-base flex justify-center items-center mt-5 !bg-red-800"
            onClick={() => setIsAlertOpen(true)}
         >
            Delete Account
         </MainButton>

         {/* Show toast when username is updated */}
         <ToastContainer />

         {/* Show alert when delete account */}
         {isAlertOpen && (
            <DialogAlert
               message="Are you sure you want to delete your account?"
               actionText="Delete"
               onCancel={() => setIsAlertOpen(false)}
               onAction={handleDeleteAccount}
            />
         )}

         {/* Show select avatar */}
         {isSelectAvatarOpen && (
            <SelectAvatar onClose={() => setIsSelectAvatarOpen(false)} onSelected={handleAvatarChange} />
         )}
      </Modal>
   );
};

UserProfile.propTypes = {
   onClose: PropTypes.func.isRequired,
   onAlertLogout: PropTypes.func.isRequired,
   onLogout: PropTypes.func.isRequired,
};

export default UserProfile;
