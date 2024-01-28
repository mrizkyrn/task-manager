import PropTypes from "prop-types";
import { XMarkIcon } from "../icons/Icons";

const Modal = ({ onClose, isOpen, children }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="relative w-full flex flex-col justify-center items-center max-w-md bg-semiDark rounded-md shadow-lg py-8 px-5">
            <div className="absolute top-4 right-4">
               <XMarkIcon className="w-7 h-7 text-light cursor-pointer" onClick={onClose} />
            </div>
            {children}
         </div>
      </div>
   );
};

Modal.propTypes = {
   onClose: PropTypes.func.isRequired,
   isOpen: PropTypes.bool.isRequired,
   children: PropTypes.node.isRequired,
};

export default Modal;
