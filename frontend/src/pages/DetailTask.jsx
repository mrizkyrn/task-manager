import { useLocation } from 'react-router-dom';
import Container from '../component/Container';
import BackButton from '../component/BackButton';

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
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">{task.title}</h1>
         </div>
         <div className="mt-10 leading-7">
            <p className="text-[#a7acb5]">{task.description}</p>
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
            <p className="text-[#a7acb5] mt-2">Due: {dueDate} at {task.dueTime}</p>

         </div>
      </Container>
   );
};

export default DetailTask;
