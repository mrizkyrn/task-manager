import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import { PlusIcon } from './Icons';
import { useEffect, useState } from 'react';

const TaskInfo = ({ task }) => {
   const [users, setUsers] = useState([]);
   console.log(users);

   useEffect(() => {
      if (task.users.length <= 0) return;

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
            console.log(data);

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
            body: JSON.stringify({ userId: '65648ff1d6551f69a7c19ea7' }),
         });

         const data = await res.json();
         console.log(data);

         if (!data.success) {
            console.log(data.message);
            return;
         }

         setUsers([...users, data.data]);
      } catch (error) {
         console.log(error);
      }
   }

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
            <p className="font-semibold text-gray-300">Created by</p>
            <img
               className="object-cover w-12 h-12 rounded-full mt-3"
               src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
               alt="avatar"
               data-tooltip-id={`avatar-${task.creator._id}`}
               data-tooltip-content={task.creator.username || 'Unknown'}
            />
         </div>

         <div>
            <p className="font-semibold text-gray-300">Assigned to</p>
            <div className="flex items-center gap-3 mt-3">
               {users &&
                  users.map((user) => (
                     <img
                        key={user._id}
                        className="object-cover w-12 h-12 rounded-full"
                        src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
                        alt="avatar"
                        data-tooltip-id={`avatar-${user._id}`}
                        data-tooltip-content={user.username || 'Unknown'}
                     />
                  ))}
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

         <Tooltip id={`avatar-${task.creator._id}`} opacity={1} place="top" style={{ backgroundColor: '#344560' }} />
         {
            users.map((user) => (
               <Tooltip key={user._id} id={`avatar-${user._id}`} opacity={1} place="top" style={{ backgroundColor: '#344560' }} />
            ))
         }
      </div>
   );
};

TaskInfo.propTypes = {
   task: PropTypes.object.isRequired,
};

export default TaskInfo;
