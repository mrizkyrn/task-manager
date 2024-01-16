import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { XMarkIcon } from '../icons/Icons';
import DialogAlert from '../helpers/DialogAlert';
import MainButton from '../buttons/MainButton';

const UserInfo = ({ user, onClose, onRemove }) => {
   const { currentUser } = useSelector((state) => state.user);
   const [isAlertOpen, setIsAlertOpen] = useState(false);

   return (
      <div className="fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="relative w-full flex flex-col justify-center items-center max-w-md bg-semiDark rounded-md shadow-lg py-8 px-5">
            <div className="absolute top-4 right-4">
               <XMarkIcon className="w-7 h-7 text-light cursor-pointer" onClick={onClose} />
            </div>

            <img
               className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full"
               src={`/avatars/${user.avatar}.jpg`}
               alt="avatar"
            />
            <p className="mt-3 text-lg md:text-xl font-semibold text-gray-200">{user.username}</p>

            <MainButton
               className="w-full text-sm sm:text-base flex justify-center items-center mt-12 !bg-red-800"
               onClick={() => setIsAlertOpen(true)}
            >
               {currentUser._id === user._id ? 'Leave the task' : 'Remove user'}
            </MainButton>
         </div>

         {/* Show alert when remove user */}
         {isAlertOpen && (
            <DialogAlert
               message="Are you sure you want to delete your account?"
               actionText="Remove"
               onCancel={() => setIsAlertOpen(false)}
               onAction={() => onRemove(user._id)}
            />
         )}
      </div>
   );
};

UserInfo.propTypes = {
   user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
   }).isRequired,
   onClose: PropTypes.func.isRequired,
   onRemove: PropTypes.func.isRequired,
};

export default UserInfo;
