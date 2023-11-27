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
   console.log(task);

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
            <p className="text-[#a7acb5] mt-2">Due: {dueDate} {task.dueTime && task.dueTime}</p>
            
            {/* created by */}
            <div className="flex items-center gap-3 mt-10">
               <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://avatars.githubusercontent.com/u/11138376?s=400&u=1a4b7c7d1e9a5b0a2b7d2e6d1f2b2e9f5f2e9e5f&v=4"
                  alt="avatar"
               />
               <div>
                  <p className="text-[#a7acb5]">{task.creator ? task.creator.username : 'Anonymous'}</p>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default DetailTask;
