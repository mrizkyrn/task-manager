import Container from '../component/Container';
import { Link, useLoaderData } from 'react-router-dom';
import TaskCard from '../component/TaskCard';
import { AddIcon } from '../component/Icons';

export async function loader() {
   try {
      const res = await fetch('/api/tasks', {
         method: 'GET',
         credentials: 'include',
      });
      const data = await res.json();
      if (data.success) return data.tasks;
      return null;
   } catch (err) {
      console.log(err);
      return null;
   }
}

const Tasks = () => {
   const tasks = useLoaderData();

   return (
      <Container>
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-200">My Tasks</h1>
            <Link
               to={'create'}
               className="bg-[#415c8a] hover:bg-[#2d4369] px-5 py-2 rounded-md text-white font-semibold"
            >
               <span>
                  <AddIcon className="w-6 h-6 inline-block mr-2" />
               </span>
               Create Task
            </Link>
         </div>

         <div className="flex flex-col gap-7 mt-10">
            {tasks ? (
               tasks.length === 0 ? (
                  <p className="text-gray-400 text-center mt-10">No tasks found. Create one.</p>
               ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} />)
               )
            ) : (
               <p className="text-gray-400 text-center mt-10">Something went wrong while fetching tasks.</p>
            )}
         </div>
      </Container>
   );
};

export default Tasks;
