import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AddIcon } from '../component/Icons';
import Container from '../component/Container';
import Button from '../component/Button';
import NoteInput from '../component/NoteInput';
import HeaderTitle from '../component/HeaderTitle';


const EditTask = () => {
   const location = useLocation();
   const task = location.state.task;

   const initialForm = {
      title: task.title,
      description: task.description,
      notes: task.notes,
      priority: task.priority,
      completed: task.completed,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      dueTime: task.dueTime ? task.dueTime : '',
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

      try {
         const res = await fetch(`/api/tasks/${task._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...form, notes }),
         });
         const data = await res.json();

         if (!data.success) {
            onSubmitFailure(data.message);
            return;
         }

         onSubmitSuccess();
      } catch (err) {
         onSubmitFailure('Something went wrong. Please try again later.');
         console.log(err);
      }
   };

   const validateForm = () => {
      // check if the title is empty
      if (!form.title) {
         toast.error('Title cannot be empty.');
         return false;
      }

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
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  value={form.dueDate}
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
                  onChange={(e) => setForm({ ...form, dueTime: e.target.value })}
                  value={form.dueTime}
               />
            </div>

            {/* Submit */}
            <Button className="w-full" type="submit">
               Save Task
            </Button>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default EditTask;
