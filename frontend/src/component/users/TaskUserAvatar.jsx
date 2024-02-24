import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import TaskUserDetail from './TaskUserDetail';

const TaskUserAvatar = ({ user, currentUserRole, onRemove, onChangeRole }) => {
   const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

   return (
      <>
         <img
            className="object-cover w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
            src={`/avatars/${user.avatar}.jpg`}
            alt="avatar"
            data-tooltip-id={`avatar-${user._id}`}
            data-tooltip-content={user.username || 'Unknown'}
            onClick={() => setIsUserInfoOpen(true)}
         />

         <Tooltip id={`avatar-${user._id}`} opacity={1} place="top" style={{ backgroundColor: '#344560' }} />

         {/* Show user info */}
         {isUserInfoOpen && <TaskUserDetail user={user} currentUserRole={currentUserRole} onClose={() => setIsUserInfoOpen(false)} onRemove={onRemove} onChangeRole={onChangeRole}/>}
      </>
   );
};

TaskUserAvatar.propTypes = {
   user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
   }).isRequired,
   currentUserRole: PropTypes.string.isRequired,
   onRemove: PropTypes.func.isRequired,
   onChangeRole: PropTypes.func.isRequired,
};

export default TaskUserAvatar;
