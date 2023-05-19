import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { openToast } from 'src/redux';

export const useNotify = () => {
  //hook
  const dispatch = useDispatch();

  const errorMessage = useCallback((message: string, duration?: number) => {
    dispatch(
      openToast({
        message: message,
        type: 'error',
        autoHideDuration: duration || 2000,
      })
    );
  }, []);

  const successMessage = useCallback((message: string, duration?: number) => {
    dispatch(
      openToast({
        message: message,
        type: 'success',
        autoHideDuration: duration || 2000,
      })
    );
  }, []);
  const warningMessage = useCallback((message: string, duration?: number) => {
    dispatch(
      openToast({
        message: message,
        type: 'warning',
        autoHideDuration: duration || 2000,
      })
    );
  }, []);
  return {
    error: errorMessage,
    success: successMessage,
    warning: warningMessage,
  };
};

// export const showToast = (type: 'success' | 'error' | 'info' | 'error' | 'warning') => {
// toast.success('Tạo thành công!', {
//   position: 'top-right',
//   autoClose: 1500,
//   closeOnClick: true,
//   pauseOnHover: true,
//   theme: 'colored',
// });
// };
