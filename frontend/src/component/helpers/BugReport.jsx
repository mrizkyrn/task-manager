import { useState } from 'react';
import Modal from './Modal';
import { BugIcon } from '../icons/Icons';
import { ToastContainer, toast } from 'react-toastify';
import { postBug } from '../../api/bug';

const BugReport = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [title, setTitle] = useState('');
   const [detail, setDetail] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = await postBug({ title, detail });

      if (!data.success) {
         toast.error(data.message, {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      toast.success(data.message, {
         theme: 'colored',
      });

      setTitle('');
      setDetail('');
      setIsOpen(false);
   };

   return (
      <>
         <button
            className={`fixed bottom-24 sm:bottom-4 right-0 p-2 bg-dark rounded-l-full text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-dark duration-200 ease-in-out`}
            onClick={() => setIsOpen(true)}
         >
            <BugIcon className="w-5 h-5" />
         </button>

         <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h1 className="text-3xl font-bold text-light mb-8">Report a Bug</h1>

            <form className="w-full flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit}>
               {/* Bug Title */}
               <div className="w-full max-w-4xl flex flex-col gap-2">
                  <label htmlFor="title" className="text-gray-200">
                     Title
                  </label>
                  <input
                     type="text"
                     name="title"
                     id="title"
                     placeholder="Enter title"
                     className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>

               {/* Bug Detail */}
               <div className="w-full max-w-4xl flex flex-col gap-2">
                  <label htmlFor="detail" className="text-gray-200">
                     Detail
                  </label>
                  <textarea
                     name="detail"
                     id="detail"
                     placeholder="Enter bug details"
                     rows="4"
                     className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                     onChange={(e) => setDetail(e.target.value)}
                  />
               </div>

               {/* Submit Button */}
               <button
                  className="w-full py-3 text-center text-light bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-700 disabled:hover:bg-gray-700"
                  type="submit"
                  disabled={!title || !detail}
               >
                  Submit
               </button>
            </form>
         </Modal>

         <ToastContainer />
      </>
   );
};

export default BugReport;
