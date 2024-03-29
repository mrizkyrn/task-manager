import { useEffect, useState } from 'react';
import Container from '../component/layouts/Container';
import TaskCard from '../component/tasks/TaskCard';
import TaskCardSkeleton from '../component/skeletons/taskCardSkeleton';
import { getUserTasks } from '../api/task';

const Tasks = () => {
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

   return (
      <Container>
         <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-200">Important Tasks</h1>
         </div>

         <div className="flex flex-col gap-7 mt-10">
            {loading ? (
               tasks.map((task) => <TaskCardSkeleton key={task._id} />)
            ) : tasks.length > 0 ? (
               tasks.filter((task) => task.priority === 'important').map((task) => <TaskCard key={task._id} task={task} setTasks={setTasks} />)
            ) : (
               <p className="text-sm sm:text-base text-gray-400 text-center mt-10">
                  You don&apos;t have any important tasks.
               </p>
            )}
         </div>
      </Container>
   );
};

export default Tasks;
