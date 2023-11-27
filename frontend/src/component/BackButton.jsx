import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BackIcon } from './Icons';

const BackButton = ({ to = '..', relative = 'path' }) => {
   return (
      <div className="inline-block">
         <Link to={to} relative={relative}>
            <BackIcon className="h-6 w-6 sm:h-8 sm:w-8 text-light" />
         </Link>
      </div>
   );
};

BackButton.propTypes = {
   to: PropTypes.string,
   relative: PropTypes.string,
};

export default BackButton;
