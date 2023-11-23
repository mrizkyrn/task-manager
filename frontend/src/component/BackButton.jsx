import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BackIcon } from './Icons';

const BackButton = ({ to = '..', relative = 'path' }) => {
   return (
      <div className="inline-block">
         <Link
            to={to}
            relative={relative}
            className="flex justify-start items-center text-white px-4 py-2 rounded-md"
         >
            <BackIcon className="w-6 h-6" />
         </Link>
      </div>
   );
};

BackButton.propTypes = {
   to: PropTypes.string,
   relative: PropTypes.string,
};

export default BackButton;
