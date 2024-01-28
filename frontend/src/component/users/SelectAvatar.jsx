import PropTypes from 'prop-types';
import Modal from '../helpers/Modal';

const avatars = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5', 'avatar-6', 'avatar-7', 'avatar-8'];

const SelectAvatar = ({ onClose, onSelected }) => {
   return (
      <Modal isOpen={true} onClose={onClose}>
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
      </Modal>
   );
};

SelectAvatar.propTypes = {
   onClose: PropTypes.func.isRequired,
   onSelected: PropTypes.func.isRequired,
};

export default SelectAvatar;
