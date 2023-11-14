import { Link } from 'react-router-dom';
import { BackIcon } from './Icons';

const BackButton = () => {
   return (
      <div className="inline-block">
         <Link to={'..'} relative="path" className="flex justify-start items-center text-white px-4 py-2 rounded-md">
            <BackIcon className="w-6 h-6" />
         </Link>
      </div>
   );
};

export default BackButton;
