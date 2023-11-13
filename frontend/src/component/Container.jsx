import PropTypes from 'prop-types';

const Container = ({ children }) => {
   return <div className='w-full px-10 py-5 '>{children}</div>;
};

Container.propTypes = {
   children: PropTypes.node,
};

export default Container;
