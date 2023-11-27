import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { CircleCheckIcon, DeleteIcon, EditIcon, KebabMenuIcon } from './Icons';

const MenuButton = ({ onCompleted, onEdit, onDelete, isCompleted }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef();
   const buttonRef = useRef();

   const handleClickButton = () => {
      setIsMenuOpen((prev) => !prev);
   };

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
      <div className="relative flex justify-center items-center hover:bg-[#1b2738] rounded-lg w-7 h-7">
         <button ref={buttonRef} aria-label="kebab-menu" onClick={handleClickButton}>
            <KebabMenuIcon className={`w-5 h-5 ${isMenuOpen ? 'text-gray-500' : 'text-gray-200'}`} />
         </button>

         {isMenuOpen && (
            <div ref={menuRef} className="absolute -top-2 right-10 w-48 bg-dark rounded-md shadow-md">
               <button
                  onClick={() => onCompleted() && setIsMenuOpen(false)}
                  className="w-full flex items-center px-5 py-2 text-left rounded-t-md text-gray-200 hover:bg-gray-700"
               >
                  <span className="mr-3">
                     <CircleCheckIcon className="w-5 h-5" />
                  </span>
                  {isCompleted ? 'Mark as Uncompleted' : 'Mark as Completed'}
               </button>
               <button
                  onClick={onEdit}
                  className="w-full flex px-5 py-2 text-left rounded-t-md text-gray-200 hover:bg-gray-700"
               >
                  <span className="mr-3">
                     <EditIcon className="w-5 h-5" />
                  </span>
                  Edit
               </button>
               <button
                  onClick={onDelete}
                  className="w-full flex px-5 py-2 text-left rounded-b-md text-red-600 hover:bg-gray-700"
               >
                  <span className="mr-3">
                     <DeleteIcon className="w-5 h-5 text-red-600" />
                  </span>
                  Delete
               </button>
            </div>
         )}
      </div>
   );
};

MenuButton.propTypes = {
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   onCompleted: PropTypes.func.isRequired,
   isCompleted: PropTypes.bool.isRequired,
};

export default MenuButton;
