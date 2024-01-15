import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { deleteTask, updateTaskStatus } from '../api/task';
import MenuButton from './MenuButton';
import DialogAlert from './DialogAlert';
import TaskStatus from './TaskStatus';

const TaskCard = ({ task, setTasks }) => {
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const navigate = useNavigate();

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

   const dueDate =
      task.dueDate &&
      new Date(task.dueDate).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      });

   const updateStatus = async (id, status) => {
      const data = await updateTaskStatus(id, status);

      if (!data.success) {
         toast.error('Something went wrong. Please try again later.', {
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
         toast.error('Something went wrong. Please try again later.', {
            theme: 'colored',
         });
         return;
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully.', {
         theme: 'colored',
      });
   };

   const handleView = (task) => {
      navigate(`/tasks/${task._id}`, { state: { task } });
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
                  <p className="text-sm text-gray-400 text-right">{dueDate}</p>
               </div>
            </div>
            <div className="absolute top-4 right-3 text-sm sm:text-base basis-12 sm:basis-44 flex flex-col justify-between items-end">
               <MenuButton
                  onEdit={() => handleEdit(task)}
                  onDelete={() => setIsAlertOpen(true)}
               />
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
      completed: PropTypes.bool.isRequired,
      status: PropTypes.string,
      dueDate: PropTypes.string,
   }).isRequired,
   setTasks: PropTypes.func.isRequired,
};

export default TaskCard;
