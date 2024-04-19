import PropTypes from 'prop-types';
import { ExclamationIcon, ExclamationSolidIcon } from '../icons/Icons';

const ImportantTaskButton = ({ isImportant, onImportantChange }) => {
   return (
      <button onClick={onImportantChange} className="focus:outline-none hover:text-light">
         {isImportant ? (
            <ExclamationSolidIcon className="w-6 h-6 text-light" />
         ) : (
            <ExclamationIcon className="w-6 h-6 text-light" />
         )}
      </button>
   );
};

ImportantTaskButton.propTypes = {
   isImportant: PropTypes.bool.isRequired,
   onImportantChange: PropTypes.func.isRequired,
};

export default ImportantTaskButton;
