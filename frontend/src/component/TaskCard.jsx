import PropTypes from 'prop-types';
import { useState } from 'react';
import MenuButton from './MenuButton';
import DialogAlert from './DialogAlert';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {
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

   const createdAt = new Date(task.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });

   const handleEdit = (task) => {
      navigate(`/tasks/${task._id}/edit`, { state: { task } });
   };

   const handleDelete = async () => {
      setIsAlertOpen(false);

      onDelete();
   };

   const handleView = (task) => {
      navigate(`/tasks/${task._id}`, { state: { task } });
   };

   return (
      <div
         className={`w-full h-32 flex justify-between gap-3 rounded-md px-5 py-4 ${
            isHovered ? 'bg-[#27374f]' : 'bg-[#212e42]'
         }`}
      >
         {isAlertOpen && (
            <DialogAlert
               message={`Are you sure you want to delete "${task.title}"?`}
               actionText="Delete"
               onCancel={() => setIsAlertOpen(false)}
               onAction={handleDelete}
            />
         )}
         <div
            onClick={() => handleView(task)}
            className="basis-full flex flex-col justify-between cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            <h1 className="text-2xl font-bold text-gray-200">{task.title}</h1>
            <p className="leading-6 mt-1 line-clamp-1 text-gray-300">{task.description}</p>
            <p className={`w-20 text-sm text-center text-white rounded-md ${priorityColor()}`}>{task.priority}</p>
         </div>
         <div className="basis-[12rem] flex flex-col justify-between items-end">
            <MenuButton onEdit={() => handleEdit(task)} onDelete={() => setIsAlertOpen(true)} />
            <p className="text-sm text-gray-400 text-right">{createdAt}</p>
         </div>
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
   }).isRequired,
   onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
