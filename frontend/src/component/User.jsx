import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import UserInfo from './UserInfo';

const User = ({ user, onRemove }) => {
   const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

   return (
      <>
         <img
            className="object-cover w-12 h-12 rounded-full mt-3"
            src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
            alt="avatar"
            data-tooltip-id={`avatar-${user._id}`}
            data-tooltip-content={user.username || 'Unknown'}
            onClick={() => setIsUserInfoOpen(true)}
         />

         <Tooltip id={`avatar-${user._id}`} opacity={1} place="top" style={{ backgroundColor: '#344560' }} />

         {/* Show user info */}
         {isUserInfoOpen && <UserInfo user={user} onClose={() => setIsUserInfoOpen(false)} onRemove={onRemove} />}
      </>
   );
};

User.propTypes = {
   user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
   }).isRequired,
   onRemove: PropTypes.func.isRequired,
};

export default User;
