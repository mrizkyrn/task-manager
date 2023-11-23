import Container from '../component/Container';
import { Link, useLoaderData } from 'react-router-dom';
import TaskCard from '../component/TaskCard';
import { AddIcon } from '../component/Icons';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export async function loader() {
   try {
      const res = await fetch('/api/tasks', {
         method: 'GET',
         credentials: 'include',
      });
      const data = await res.json();

      if (!data.success) {
         console.log(data.message);
         return null;
      }

      return data.data;
   } catch (err) {
      console.log(err);
      return null;
   }
}

const Tasks = () => {
   const [tasks, setTasks] = useState(useLoaderData());

   const handleDeleteTask = async (id) => {
      try {
         const res = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            credentials: 'include',
         });
         const data = await res.json();

         if (!data.success) {
            console.log(data.message);
            toast.error('Something went wrong. Please try again later.', {
               theme: 'colored',
            });
            return;
         }

         console.log(data);
         setTasks((prev) => prev.filter((task) => task._id !== id));
         toast.success('Task deleted successfully.', {
            theme: 'colored',
         });
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Container>
         <ToastContainer />
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-200">My Tasks</h1>
            <Link to={'create'} className="bg-primary hover:bg-[#2d4369] px-5 py-2 rounded-md text-white font-semibold">
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
                  tasks.map((task) => <TaskCard key={task._id} task={task} onDelete={() => handleDeleteTask(task._id)} />)
               )
            ) : (
               <p className="text-gray-400 text-center mt-10">Something went wrong while fetching tasks.</p>
            )}
         </div>
      </Container>
   );
};

export default Tasks;
