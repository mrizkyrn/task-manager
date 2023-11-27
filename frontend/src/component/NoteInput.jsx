import PropTypes from 'prop-types';
import { XMarkIcon } from './Icons';

const NoteInput = ({ index, form, setForm }) => {
   return (
      <li className="w-full flex justify-between gap-2">
         <input
            name={`notes-${index}`}
            id={`notes-${index}`}
            placeholder={`Enter note ${index + 1}`}
            className="w-full bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
            onChange={(e) => {
               const notes = [...form.notes];
               notes[index] = e.target.value;
               setForm({ ...form, notes });
            }}
            value={form.notes[index]}
         />
         <button
            type="button"
            className="bg-red-900 p-3 rounded-md text-gray-200"
            onClick={() => {
               const notes = [...form.notes];
               notes.splice(index, 1);
               setForm({ ...form, notes });
            }}
         >
            <XMarkIcon className="w-5 h-5" />
         </button>
      </li>
   );
};

NoteInput.propTypes = {
   index: PropTypes.number.isRequired,
   form: PropTypes.object.isRequired,
   setForm: PropTypes.func.isRequired,
};

export default NoteInput;
