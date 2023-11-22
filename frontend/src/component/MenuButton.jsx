import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { KebabMenuIcon } from './Icons';

const MenuButton = ({onEdit, onDelete}) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef();
   const buttonRef = useRef();

   const handleClickButton = () => {
      setIsMenuOpen((prev) => !prev);
   };

   useEffect(() => { 
      const handleOutsideClick = (event) => {
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
      <div className="relative">
         <button ref={buttonRef} className="focus:outline-none" aria-label="kebab-menu" onClick={handleClickButton}>
            <KebabMenuIcon className={`w-5 h-5 ${isMenuOpen ? 'text-gray-500' : 'text-gray-200'}`} />
         </button>
         {isMenuOpen && (
            <div ref={menuRef} className="absolute -top-2 right-10 w-36 bg-dark rounded-md shadow-md">
               <button onClick={onEdit} className="w-full px-5 py-2 text-left rounded-t-md text-gray-200 hover:bg-gray-700">Edit</button>
               <button onClick={onDelete} className="w-full px-5 py-2 text-left rounded-b-md text-gray-200 hover:bg-gray-700">
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
};

export default MenuButton;
