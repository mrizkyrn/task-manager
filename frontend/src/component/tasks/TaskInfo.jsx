import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { addUserToAssignees, removeUserFromAssginees, getAllAssignedUsers } from '../../api/task';
import { PlusIcon } from '../icons/Icons';
import User from '../users/User';
import AddAssignees from '../users/AddAssignees';

const TaskInfo = ({ task }) => {
   const [assignedUsers, setAssignedUsers] = useState([]);
   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

   useEffect(() => {
      const getAssignedUsers = async () => {
         const data = await getAllAssignedUsers(task._id);
         setAssignedUsers(data.data);
      };

      if (task.assignees.length > 0) getAssignedUsers();
   }, [task._id, task.assignees]);

   const handleAddUser = async (userId) => {
      const data = await addUserToAssignees(task._id, { id: userId, role: 'viewer' });

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      setAssignedUsers((prev) => [...prev, data.data]);
      toast.success(`${data.data.username} added to collaborators.`, {
         theme: 'colored',
      });
   };

   const handleRemoveUser = async (userId) => {
      const data = await removeUserFromAssginees(task._id, userId);

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      setAssignedUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success(data.message, {
         theme: 'colored',
      });
   };

   const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   };

   return (
      <div className="w-full flex flex-col justify-start items-start gap-5 p-5 sm:p-7 rounded-xl bg-dark/50">
         <div>
            <p className="font-semibold text-gray-300">Created by {task.creator.username}</p>
         </div>

         <div className="w-full h-0.5 bg-gray-700" />

         <div>
            <p className="font-semibold text-gray-300">Assignees</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
               {assignedUsers &&
                  assignedUsers.map((user) => <User key={user._id} user={user} onRemove={handleRemoveUser} />)}
               <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="flex justify-center items-center w-12 h-12 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600"
               >
                  <PlusIcon className="w-6 h-6 text-light" />
               </button>
            </div>
         </div>

         <div className="mt-3">
            <p className="font-semibold text-gray-300">Created at</p>
            <p className="mt-2 text-gray-400">{formatDate(task.createdAt)}</p>
         </div>

         <div>
            <p className="font-semibold text-gray-300">Last updated</p>
            <p className="mt-2 text-gray-400">{formatDate(task.updatedAt)}</p>
         </div>

         {/* Toastify */}
         <ToastContainer />

         {/* Add User Modal */}
         <AddAssignees
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
            onAddUser={handleAddUser}
         />
      </div>
   );
};

TaskInfo.propTypes = {
   task: PropTypes.object.isRequired,
};

export default TaskInfo;
