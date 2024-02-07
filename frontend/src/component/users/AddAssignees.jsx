import PropTypes from 'prop-types';
import Modal from '../helpers/Modal';
import { searchUserByUsername } from '../../api/user';
import { PlusIcon } from '../icons/Icons';
import { useEffect, useState } from 'react';

const AddAssignees = ({ isOpen, onClose, onAddUser }) => {
   const [query, setQuery] = useState('');
   const [userResults, setUserResults] = useState([]);

   useEffect(() => {
      if (!query.trim()) {
         setUserResults([]);
         return;
      }

      const search = async () => {
         const data = await searchUserByUsername(query);
         setUserResults(data.data);
      };

      search();
   }, [query]);

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <p className="font-semibold text-gray-300">Add Assignees</p>

         {/* search input user */}
         <input
            type="text"
            placeholder="Search user..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm h-12 px-3 mt-3 bg-dark/50 rounded-md text-gray-300 focus:outline-none"
         />

         {/* result */}
         <div className="flex flex-col items-center justify-start mt-5 h-48 w-full overflow-y-scroll">
            {userResults.length === 0 ? (
               <div className="flex flex-col items-center justify-center gap-3 h-full">
                  <p className="text-sm text-gray-400">No user found</p>
               </div>
            ) : (
               userResults.map((user) => (
                  <div
                     key={user._id}
                     className="w-full flex justify-between items-center px-5 py-3 hover:bg-dark/25 border-b-2 border-dark/50"
                  >
                     <div className="flex items-center gap-3">
                        <img src={`/avatars/${user.avatar}.jpg`} alt="user" className="w-10 h-10 rounded-full" />
                        <p className="text-sm font-semibold text-gray-300">{user.username}</p>
                     </div>
                     <button
                        onClick={() => onAddUser(user._id)}
                        className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-gray-600"
                     >
                        <PlusIcon className="w-6 h-6 text-light" />
                     </button>
                  </div>
               ))
            )}
         </div>
      </Modal>
   );
};

AddAssignees.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onAddUser: PropTypes.func.isRequired,
};

export default AddAssignees;
