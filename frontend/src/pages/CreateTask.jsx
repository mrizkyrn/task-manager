import BackButton from '../component/BackButton';
import Container from '../component/Container';

const CreateTask = () => {
   return (
      <Container>
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">Create Task</h1>
         </div>

         <form className="flex flex-col gap-5 mt-10">
            {/* Title */}
            <div className="flex flex-col gap-2">
               <label htmlFor="title" className="text-gray-200">
                  Title
               </label>
               <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
               />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
               <label htmlFor="description" className="text-gray-200">
                  Description
               </label>
               <textarea
                  name="description"
                  id="description"
                  placeholder="Enter description"
                  rows="4"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
               />
            </div>

            {/* Additonal Notes */}
            <div className="flex flex-col gap-2">
               <label htmlFor="notes" className="text-gray-200">
                  Additonal Notes
               </label>
               <textarea
                  name="notes"
                  id="notes"
                  placeholder="Enter notes"
                  rows="4"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
               />
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-2">
               <label htmlFor="priority" className="text-gray-200">
                  Priority
               </label>
               <select
                  name="priority"
                  id="priority"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                  defaultValue="medium"
               >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
               </select>
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-2">
               <label htmlFor="dueDate" className="text-gray-200">
                  Due Date
               </label>
               <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
               />
            </div>

            {/* Due Time */}
            <div className="flex flex-col gap-2">
               <label htmlFor="dueTime" className="text-gray-200">
                  Due Time
               </label>
               <input
                  type="time"
                  name="dueTime"
                  id="dueTime"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
               />
            </div>

            {/* Additional Files */}
            {/* <div className="flex flex-col gap-2">
               <label htmlFor="files" className="text-gray-200">
                  Additional Files
               </label>
               <input type="file" name="files" id="files" className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200" />
            </div> */}

            {/* Submit */}
            <button
               type="submit"
               className="bg-[#415c8a] hover:bg-[#2d4369] px-5 py-2 rounded-md text-white font-semibold mt-5"
            >
               Create Task
            </button>
         </form>
      </Container>
   );
};

export default CreateTask;
