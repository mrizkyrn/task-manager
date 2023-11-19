import PropTypes from 'prop-types';
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const CustomAlert = ({ status, message, varian = 'solid', onClose }) => {
   return (
      <div className="fixed top-0 right-0 z-50 p-5">
         <Alert status={status} variant={varian}>
            <AlertIcon />
            {message}
            <div className="ml-3">
               <CloseButton onClick={onClose} />
            </div>
         </Alert>
      </div>
   );
};

CustomAlert.propTypes = {
   status: PropTypes.string.isRequired,
   message: PropTypes.string.isRequired,
   varian: PropTypes.string,
   onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
