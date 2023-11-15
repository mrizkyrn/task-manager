import PropTypes from 'prop-types';

const Button = ({ children, onClick, className = '' }) => {
   return (
      <button
         onClick={onClick}
         className={`bg-[#415c8a] hover:bg-[#2d4369] px-5 py-2 rounded-md text-white font-semibold mt-5 ${className}`}
      >
         {children}
      </button>
   );
};

Button.propTypes = {
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func.isRequired,
   className: PropTypes.string,
};

export default Button;
