import { useLocation } from 'react-router-dom';
import Container from '../component/Container';
import BackButton from '../component/BackButton';

const DetailTask = () => {
   const location = useLocation();
   const task = location.state.task;

   console.log(task);
   return (
      <Container>
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">{task.title}</h1>
         </div>
         <div className="mt-10 leading-7">
            <p className="text-[#a7acb5]">{task.description}</p>
            {task.notes && (
               <>
                  <h2 className="text-xl font-semibold text-gray-200 mt-7">Additional Notes</h2>
                  <p className="text-[#a7acb5] whitespace-pre-line mt-2">{task.notes}</p>
               </>
            )}

            <p className="text-[#a7acb5] mt-2">Priority: {task.priority}</p>
            <p className="text-[#a7acb5]">Due Date: {task.dueDate}</p>
            <p className="text-[#a7acb5]">Due Time: {task.dueTime}</p>
         </div>
      </Container>
   );
};

export default DetailTask;
