import PropTypes from 'prop-types';
import { CircleCheckIcon, NotStartedIcon, ProgressIcon } from './Icons';
import { useEffect, useRef, useState } from 'react';

const statusConfig = {
   'not-started': {
      className: 'bg-gray-600',
      icon: <NotStartedIcon className="w-5 h-5 sm:w-8 sm:h-8 text-light" />,
   },
   'in-progress': {
      className: 'bg-amber-800',
      icon: <ProgressIcon className="w-5 h-5 sm:w-8 sm:h-8 text-light" />,
   },
   completed: {
      className: 'bg-green-800',
      icon: <CircleCheckIcon className="w-5 h-5 sm:w-8 sm:h-8 text-light" />,
   },
};

const TaskStatus = ({ status, onUpdated }) => {
   const { className, icon } = statusConfig[status] || {};

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef();
   const buttonRef = useRef();

   useEffect(() => {
      const handleOutsideClick = (event) => {
         // Close menu if clicked outside menu and button
         if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
         ) {
            setIsMenuOpen(false);
         }
      };

      if (isMenuOpen) {
         document.addEventListener('mousedown', handleOutsideClick);
      }

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, [isMenuOpen]);

   return (
      <div
         ref={buttonRef}
         onClick={() => setIsMenuOpen((prev) => !prev)}
         className={`relative flex justify-center items-center w-10 sm:w-16 rounded-l-md ${className || ''}`}
      >
         {icon}

         {isMenuOpen && (
            <div ref={menuRef} className="absolute left-14 w-48 bg-dark rounded-md shadow-md">
               <button
                  onClick={() => onUpdated('not-started')}
                  className="w-full flex px-5 py-3 text-left text-sm rounded-t-md text-gray-200 hover:bg-gray-700"
               >
                  <span className="mr-3">
                     <NotStartedIcon className="w-5 h-5 text-gray-600" />
                  </span>
                  Not Started
               </button>
               <button
                  onClick={() => onUpdated('in-progress')}
                  className="w-full flex px-5 py-3 text-left text-sm rounded-t-md text-gray-200 hover:bg-gray-700"
               >
                  <span className="mr-3">
                     <ProgressIcon className="w-5 h-5 text-amber-800" />
                  </span>
                  In Progress
               </button>
               <button
                  onClick={() => onUpdated('completed')}
                  className="w-full flex px-5 py-3 text-left text-sm rounded-b-md text-gray-200 hover:bg-gray-700"
               >
                  <span className="mr-3">
                     <CircleCheckIcon className="w-5 h-5 text-green-800" />
                  </span>
                  Completed
               </button>
            </div>
         )}
      </div>
   );
};

TaskStatus.propTypes = {
   status: PropTypes.string.isRequired,
   onUpdated: PropTypes.func.isRequired,
};

export default TaskStatus;
