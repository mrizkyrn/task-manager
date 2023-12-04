import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getUserTasks } from '../api/task';
import { AddIcon } from '../component/Icons';
import Container from '../component/Container';
import TaskCard from '../component/TaskCard';

export async function loader() {
   const data = await getUserTasks();
   return data.data.tasks;
}

const Tasks = () => {
   const [tasks, setTasks] = useState(useLoaderData());

   return (
      <Container>
         <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-200">My Tasks</h1>

            <Link
               to="create"
               className="bg-primary hover:bg-[#2d4369] px-2 sm:px-4 py-2 rounded-md text-sm sm:text-base text-white font-semibold"
            >
               <span>
                  <AddIcon className="w-6 h-6 inline-block mr-2" />
               </span>
               Create Task
            </Link>
         </div>

         <div className="flex flex-col gap-7 mt-10">
            {tasks.length > 0 ? (
               tasks.map((task) => <TaskCard key={task._id} task={task} setTasks={setTasks} />)
            ) : (
               <p className="text-sm sm:text-base text-gray-400 text-center mt-10">
                  You don&apos;t have any tasks yet. Create one now!
               </p>
            )}
         </div>
      </Container>
   );
};

export default Tasks;
