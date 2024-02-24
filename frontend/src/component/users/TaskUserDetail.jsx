import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DialogAlert from '../helpers/DialogAlert';
import MainButton from '../buttons/MainButton';
import Modal from '../helpers/Modal';

// eslint-disable-next-line react/prop-types
const ButtonGroup = ({ makeAdmin, makeCollaborator, makeViewer, remove }) => (
   <div className="w-full flex flex-col justify-center items-center mt-12 gap-3">
      {makeAdmin && (
         <MainButton
            className="w-full text-sm sm:text-base flex justify-center items-center !bg-slate-800"
            onClick={makeAdmin}
         >
            Make as admin
         </MainButton>
      )}
      {makeCollaborator && (
         <MainButton
            className="w-full text-sm sm:text-base flex justify-center items-center !bg-slate-800"
            onClick={makeCollaborator}
         >
            Make as collaborator
         </MainButton>
      )}
      {makeViewer && (
         <MainButton
            className="w-full text-sm sm:text-base flex justify-center items-center !bg-slate-800"
            onClick={makeViewer}
         >
            Make as viewer
         </MainButton>
      )}
      <MainButton className="w-full text-sm sm:text-base flex justify-center items-center !bg-red-800" onClick={remove}>
         Remove from task
      </MainButton>
   </div>
);

const TaskUserDetail = ({ user, currentUserRole, onClose, onRemove, onChangeRole }) => {
   const { currentUser } = useSelector((state) => state.user);
   const [isAlertOpen, setIsAlertOpen] = useState(false);

   const handleButtonClick = (action) => {
      switch (action) {
         case 'remove':
            setIsAlertOpen(true);
            break;
         case 'admin':
            console.log('Make as admin');
            onChangeRole(user._id, 'admin');
            break;
         case 'collaborator':
            console.log('Make as collaborator');
            onChangeRole(user._id, 'collaborator');
            break;
         case 'viewer':
            console.log('Make as viewer');
            onChangeRole(user._id, 'viewer');
            break;
         default:
            console.log(`Unknown action: ${action}`);
      }
   };

   return (
      <Modal isOpen={true} onClose={onClose}>
         <img
            className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full"
            src={`/avatars/${user.avatar}.jpg`}
            alt="avatar"
         />
         <p className="mt-3 text-lg md:text-xl font-semibold text-gray-200">
            {user.username}{' '}
            {currentUser._id === user._id && <span className="text-sm md:text-base font-normal">(you)</span>}
         </p>
         <p className="mt-1 text-sm md:text-base text-gray-400">{user.role}</p>

         {currentUser._id !== user._id && currentUserRole === 'admin' && (
            <>
               {user.role === 'admin' && (
                  <>
                     <ButtonGroup
                        makeCollaborator={() => handleButtonClick('collaborator')}
                        makeViewer={() => handleButtonClick('viewer')}
                        remove={() => handleButtonClick('remove')}
                     />
                  </>
               )}
               {user.role === 'collaborator' && (
                  <>
                     <ButtonGroup
                        makeAdmin={() => handleButtonClick('admin')}
                        makeViewer={() => handleButtonClick('viewer')}
                        remove={() => handleButtonClick('remove')}
                     />
                  </>
               )}
               {user.role === 'viewer' && (
                  <>
                     <ButtonGroup
                        makeAdmin={() => handleButtonClick('admin')}
                        makeCollaborator={() => handleButtonClick('collaborator')}
                        remove={() => handleButtonClick('remove')}
                     />
                  </>
               )}
            </>
         )}

         {/* Show alert when remove user */}
         {isAlertOpen && (
            <DialogAlert
               message="Are you sure you want to delete your account?"
               actionText="Remove"
               onCancel={() => setIsAlertOpen(false)}
               onAction={() => onRemove(user._id)}
            />
         )}
      </Modal>
   );
};

TaskUserDetail.propTypes = {
   user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
   }).isRequired,
   currentUserRole: PropTypes.string.isRequired,
   onClose: PropTypes.func.isRequired,
   onRemove: PropTypes.func.isRequired,
   onChangeRole: PropTypes.func.isRequired,
};

export default TaskUserDetail;
