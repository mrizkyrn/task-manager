import PropTypes from 'prop-types';
import { KebabMenuIcon } from './Icons';

const TaskCard = ({ task }) => {
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

   return (
      <div className="w-full h-32 flex flex-col justify-between bg-[#212e42] rounded-md px-5 py-4">
         <div>
            <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold text-gray-200">{task.title}</h1>
               <KebabMenuIcon className="w-5 h-5 text-gray-200" />
            </div>
            <p className="leading-6 mt-1 line-clamp-1 text-gray-300">{task.description}</p>
         </div>
         <div className="flex justify-between items-center">
            <p className={`w-20 text-sm text-center text-white rounded-md ${priorityColor()}`}>{task.priority}</p>
            <p className="text-sm text-gray-400">{createdAt}</p>
         </div>
      </div>
   );
};

TaskCard.propTypes = {
   task: PropTypes.shape({
      title: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
   }).isRequired,
};

export default TaskCard;
