import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { updateTask } from '../api/task';
import { AddIcon } from '../component/icons/Icons';
import Container from '../component/layouts/Container';
import MainButton from '../component/buttons/MainButton';
import NoteInput from '../component/helpers/NoteInput';
import HeaderTitle from '../component/layouts/HeaderTitle';
import { ISOtoLocalDate } from '../utils/date';

const EditTask = () => {
   const location = useLocation();
   const task = location.state.task;

   const initialForm = {
      title: task.title,
      description: task.description,
      notes: task.notes,
      priority: task.priority,
      status: task.status,
      dueDate: ISOtoLocalDate(task.dueDate),
      isImportant: task.isImportant,
   };

   const [form, setForm] = useState(initialForm);

   const handleAddNote = () => {
      setForm({ ...form, notes: [...form.notes, ''] });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      // remove empty notes
      const notes = form.notes.filter((note) => note !== '');

      const data = await updateTask(task._id, { ...form, notes });

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
            theme: 'colored',
            position: 'top-left',
         });
         return false;
      }

      // convert the date to ISO format
      if (form.dueDate) form.dueDate = new Date(form.dueDate).toISOString();

      return true;
   };

   const onSubmitSuccess = () => {
      // show the success toast
      toast.success('Task updated successfully.', {
         theme: 'colored',
      });
   };

   const onSubmitFailure = (message) => {
      toast.error(message, {
         theme: 'colored',
         position: 'top-left',
      });
   };

   return (
      <Container>
         <HeaderTitle title="Edit Task" backTo={'../..'} />

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

            {/* Importance */}
            <div className="flex items-center gap-3 mt-4">
               <input
                  type="checkbox"
                  id="isImportant"
                  className="w-5 h-5 rounded-md"
                  onChange={(e) => setForm({ ...form, isImportant: e.target.checked })}
                  checked={form.isImportant}
               />
               <label htmlFor="isImportant" className="text-gray-400">
                  Mark as Important Task
               </label>
            </div>

            {/* Submit */}
            <MainButton className="w-full mt-5" type="submit">
               Save Task
            </MainButton>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default EditTask;
