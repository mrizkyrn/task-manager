import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { changeTaskImportance, deleteTask, updateTaskStatus } from '../../api/task';
import { ISOtoReadable, ISOtoTime, overdueISOCheck } from '../../utils/date';
import MenuButton from '../buttons/MenuButton';
import DialogAlert from '../helpers/DialogAlert';
import TaskStatus from './TaskStatus';
import ImportantTaskButton from '../buttons/ImportantTaskButton';

const TaskCard = ({ task, setTasks }) => {
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const navigate = useNavigate();
   const currentLocation = useLocation().pathname.split('/')[1];

   const priorityColor = () => {
      switch (task.priority) {
         case 'high':
            return 'bg-red-700';
         case 'medium':
            return 'bg-yellow-700';
         case 'low':
            return 'bg-green-700';
         default:
            return 'bg-gray-700';
      }
   };

   const updateStatus = async (id, status) => {
      const data = await updateTaskStatus(id, status);

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      setTasks((prev) => prev.map((task) => (task._id === id ? { ...task, status } : task)));
   };

   const handleEdit = (task) => {
      navigate(`/tasks/${task._id}/edit`, { state: { task } });
   };

   const handleDelete = async (id) => {
      setIsAlertOpen(false);

      const data = await deleteTask(id);

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully.', {
         theme: 'colored',
      });
   };

   const handleView = (task) => {
      navigate(`/${currentLocation}/${task._id}`, { state: { task } });
   };

   const handleChangeImportance = async () => {
      const data = await changeTaskImportance(task._id, !task.isImportant);

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, isImportant: !t.isImportant } : t)));
   };

   return (
      <div
         className={`relative w-full h-32 flex justify-between rounded-md ${
            isHovered ? 'bg-[#27374f]' : 'bg-[#212e42]'
         }`}
      >
         <TaskStatus status={task.status} onUpdated={(status) => updateStatus(task._id, status)} />

         <div className="w-full flex justify-between px-5 py-4">
            <div
               onClick={() => handleView(task)}
               className="basis-full flex flex-col justify-between cursor-pointer"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
            >
               <h1 className="w-10/12 text-xl md:text-2xl line-clamp-1 font-bold text-gray-200">{task.title}</h1>
               <p className="text-sm md:text-base leading-6 line-clamp-1 text-gray-300">{task.description}</p>
               <div className="flex justify-between items-center">
                  <p className={`w-20 text-sm text-center text-white rounded-md ${priorityColor()}`}>{task.priority}</p>
                  {task.dueDate && (
                     <p
                        className={`text-xs text-right
                           ${
                              task.status === 'completed'
                                 ? 'line-through text-gray-400'
                                 : overdueISOCheck(task.dueDate)
                                 ? 'text-red-700'
                                 : 'text-gray-400'
                           }
                        `}
                     >
                        {ISOtoReadable(task.dueDate)}
                        <span className="hidden sm:inline"> {ISOtoTime(task.dueDate)}</span>
                     </p>
                  )}
               </div>
            </div>
            <div className="absolute top-4 right-3 basis-12 sm:basis-44 flex gap-3 justify-between items-center">
               <ImportantTaskButton isImportant={task.isImportant} onImportantChange={handleChangeImportance} />
               <MenuButton onEdit={() => handleEdit(task)} onDelete={() => setIsAlertOpen(true)} />
            </div>
         </div>

         {/* Show toast */}
         <ToastContainer />

         {/* Show alert when deleting */}
         {isAlertOpen && (
            <DialogAlert
               message={`Are you sure you want to delete "${task.title}"?`}
               actionText="Delete"
               onCancel={() => setIsAlertOpen(false)}
               onAction={() => handleDelete(task._id)}
            />
         )}
      </div>
   );
};

TaskCard.propTypes = {
   task: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      isImportant: PropTypes.bool.isRequired,
      status: PropTypes.string,
      dueDate: PropTypes.string,
   }).isRequired,
   setTasks: PropTypes.func.isRequired,
};

export default TaskCard;
