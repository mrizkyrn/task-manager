import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTask } from '../api/task';
import { AddIcon } from '../component/icons/Icons';
import Container from '../component/layouts/Container';
import MainButton from '../component/buttons/MainButton';
import NoteInput from '../component/helpers/NoteInput';
import HeaderTitle from '../component/layouts/HeaderTitle';

const initialForm = {
   title: '',
   description: '',
   notes: [],
   priority: 'medium',
   status: 'not-started',
   dueDate: '',
};

const CreateTask = () => {
   const [form, setForm] = useState(initialForm);

   const handleAddNote = () => {
      setForm({ ...form, notes: [...form.notes, ''] });
   };

   const handleSubmit = async (e) => {
      console.log(form);
      e.preventDefault();

      if (!validateForm()) return;

      // remove empty notes
      const notes = form.notes.filter((note) => note !== '');

      // convert the date to ISO format
      if (form.dueDate) form.dueDate = new Date(form.dueDate).toISOString();

      const data = await createTask({ ...form, notes });

      if (!data.success) {
         onSubmitFailure(data.message);
         return;
      }

      onSubmitSuccess();
   };

   const validateForm = () => {
      // check if the title is empty
      if (!form.title) {
         toast.error('Title cannot be empty.', {
            position: 'top-left',
            theme: 'colored',
         });
         return false;
      }

      return true;
   };

   const onSubmitSuccess = () => {
      // set the form data to empty
      setForm(initialForm);

      // show the success toast
      toast.success('Task created successfully.', {
         theme: 'colored',
      });
   };

   const onSubmitFailure = (message) => {
      toast.error(message, {
         theme: 'colored',
      });
   };

   return (
      <Container>
         <HeaderTitle title="Create Task" />

         <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col gap-2">
               <label htmlFor="title" className="text-gray-200">
                  Title *
               </label>
               <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  value={form.title}
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
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  value={form.description}
               />
            </div>

            {/* Additonal Notes */}
            <div className="flex flex-col gap-2">
               <label className="text-gray-200">Additonal Notes</label>
               {form.notes.length > 0 && (
                  <ul className="flex flex-col gap-5">
                     {form.notes.map((note, index) => (
                        <NoteInput key={index} index={index} form={form} setForm={setForm} />
                     ))}
                  </ul>
               )}
               <button
                  type="button"
                  className="flex bg-[#2b3d56] p-3 rounded-md text-gray-200 mx-auto mt-3"
                  onClick={handleAddNote}
               >
                  <AddIcon className="w-6 h-6 mr-3" />
                  Add Notes
               </button>
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
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  value={form.priority}
               >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
               </select>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
               <label htmlFor="status" className="text-gray-200">
                  Status
               </label>
               <select
                  name="status"
                  id="status"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  value={form.status}
               >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
               </select>
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-2">
               <label htmlFor="dueDate" className="text-gray-200">
                  Due Date
               </label>
               <input
                  type="datetime-local"
                  name="dueDate"
                  id="dueDate"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  value={form.dueDate}
               />
            </div>

            {/* Submit */}
            <MainButton className="w-full mt-5" type="submit">
               Create Task
            </MainButton>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default CreateTask;
