import PropTypes from 'prop-types';
import BackButton from '../buttons/BackButton';

const HeaderTitle = ({ title, backTo, relativeTo }) => {
   return (
      <div className="flex items-start gap-2">
         <BackButton to={backTo} relative={relativeTo} />
         <h1 className="inline text-2xl sm:text-3xl font-semibold text-gray-200 ml-2">{title}</h1>
      </div>
   );
};

HeaderTitle.propTypes = {
   title: PropTypes.string.isRequired,
   backTo: PropTypes.string,
   relativeTo: PropTypes.string,
};

export default HeaderTitle;
