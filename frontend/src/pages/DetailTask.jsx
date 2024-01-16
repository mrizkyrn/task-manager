import { useLocation } from 'react-router-dom';
import Container from '../component/layouts/Container';
import HeaderTitle from '../component/layouts/HeaderTitle';
import TaskInfo from '../component/tasks/TaskInfo';

const DetailTask = () => {
   const location = useLocation();
   const task = location.state.task;
   const dueDate = new Date(task.dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });

   return (
      <Container>
         <HeaderTitle title={task.title} />

         <div className="flex flex-col sm:flex-row justify-between items-start gap-10 mt-10 leading-7">
            <div className="w-full">
               <p className="text-[#a7acb5] whitespace-pre-line">{task.description}</p>

               {task.notes.length > 0 && (
                  <>
                     <h2 className="text-xl font-semibold text-gray-200 mt-7">Additional Notes</h2>
                     {task.notes.map((note, index) => (
                        <div key={index} className="flex items-start gap-3 justify-start mt-2">
                           <span className="text-light">&#9900;</span>
                           <p className="text-[#a7acb5]">{note}</p>
                        </div>
                     ))}
                  </>
               )}

               <p className="text-[#a7acb5] mt-2">Priority: {task.priority}</p>
               <p className="text-[#a7acb5] mt-2">
                  Due: {dueDate} {task.dueTime && task.dueTime}
               </p>
            </div>
            <div className="w-full sm:basis-2/3 md:max-w-sm">
               <TaskInfo task={task} />
            </div>
         </div>
      </Container>
   );
};

export default DetailTask;
