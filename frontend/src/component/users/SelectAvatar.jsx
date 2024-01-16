import PropTypes from 'prop-types';
import { XMarkIcon } from '../icons/Icons';

const avatars = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5', 'avatar-6', 'avatar-7', 'avatar-8'];

const SelectAvatar = ({ onClose, onSelected }) => {
   return (
      <div className="fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="relative flex flex-col justify-center items-center max-w-md bg-semiDark rounded-md shadow-lg py-8 px-5">
            <div className="absolute top-4 right-4">
               <XMarkIcon className="w-7 h-7 text-light cursor-pointer" onClick={onClose} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-200 mb-8">Select Avatar</h1>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-5">
               {avatars.map((avatar, index) => (
                  <img
                     key={index}
                     className="object-cover max-w-[80px] w-full h-auto rounded-full cursor-pointer hover:opacity-80"
                     src={`/avatars/${avatar}.jpg`}
                     alt="avatar"
                     onClick={() => onSelected(avatar)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

SelectAvatar.propTypes = {
   onClose: PropTypes.func.isRequired,
   onSelected: PropTypes.func.isRequired,
};

export default SelectAvatar;
