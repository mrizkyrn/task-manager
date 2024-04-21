import { useEffect, useState } from 'react';
import Container from '../component/layouts/Container';
import TaskCard from '../component/tasks/TaskCard';
import TaskCardSkeleton from '../component/skeletons/TaskCardSkeleton';
import { getUserTasks } from '../api/task';

const ImportantTasks = () => {
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const getTasks = async () => {
         const data = await getUserTasks();

         setTasks(data.data.tasks);
         setLoading(false);
      };

      getTasks();
   }, []);

   const renderTasks = () => {
      if (loading) {
         return tasks.map((task) => <TaskCardSkeleton key={task._id} />);
      } else {
         const importantTasks = tasks.filter((task) => task.isImportant);
         if (importantTasks.length > 0) {
            return importantTasks.map((task) => <TaskCard key={task._id} task={task} setTasks={setTasks}/>);
         } else {
            return (
               <p className="text-sm sm:text-base text-gray-400 text-center mt-10">
                  You don&apos;t have any important tasks.
               </p>
            );
         }
      }
   };

   return (
      <Container>
         <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-200">Important Tasks</h1>
         </div>

         <div className="flex flex-col gap-7 mt-10">
            {renderTasks()}
         </div>
      </Container>
   );
};

export default ImportantTasks;
