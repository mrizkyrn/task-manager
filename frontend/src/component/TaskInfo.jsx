import PropTypes from 'prop-types';
import { PlusIcon } from './Icons';
import { useEffect, useState } from 'react';
import User from './User';

const TaskInfo = ({ task }) => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const getUsers = async () => {
         try {
            const res = await fetch(`/api/tasks/${task._id}/users`, {
               method: 'GET',
               credentials: 'include',
            });

            const data = await res.json();

            if (!data.success) {
               console.log(data.message);
               return;
            }

            setUsers(data.data);
         } catch (error) {
            console.log(error);
         }
      };

      getUsers();
   }, [task._id, task.users]);

   const handleAddUser = async () => {
      try {
         const res = await fetch(`/api/tasks/${task._id}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: '6565e1dc6f8eef1e0c630d22' }),
         });

         const data = await res.json();

         if (!data.success) {
            console.log(data.message);
            return;
         }

         setUsers((prev) => [...prev, data.data]);
      } catch (error) {
         console.log(error);
      }
   };

   const handleRemoveUser = async (userId) => {
      try {
         const res = await fetch(`/api/tasks/${task._id}/users/`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
         });

         const data = await res.json();

         if (!data.success) {
            console.log(data.message);
            return;
         }

         setUsers((prev) => prev.filter((user) => user._id !== userId));
      } catch (error) {
         console.log(error);
      }
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
            <p className="font-semibold text-gray-300 mb-3">Created by</p>
            <User user={task.creator} onRemove={handleRemoveUser} />
         </div>

         <div>
            <p className="font-semibold text-gray-300">Assigned to</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
               {users && users.map((user) => <User key={user._id} user={user} onRemove={handleRemoveUser} />)}
               <button
                  onClick={handleAddUser}
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
            <p className="font-semibold text-gray-300">Updated at</p>
            <p className="mt-2 text-gray-400">{formatDate(task.updatedAt)}</p>
         </div>
      </div>
   );
};

TaskInfo.propTypes = {
   task: PropTypes.object.isRequired,
};

export default TaskInfo;
