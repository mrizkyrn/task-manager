import PropTypes from 'prop-types';

const Button = ({ children, className = '', ...rest }) => {
   return (
      <button
         className={`bg-primary hover:bg-[rgb(70,111,158)] px-5 py-2 rounded-md text-white font-semibold ${className}`}
         {...rest}
      >
         {children}
      </button>
   );
};

Button.propTypes = {
   children: PropTypes.node.isRequired,
   className: PropTypes.string,
};

export default Button;
