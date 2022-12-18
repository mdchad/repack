import { toast } from 'react-toastify';

function notification(error: any, errorMsg: string, successMsg: string, callback?: any, duration = 2000) {

  if (error) {
    console.log(error);
    toast.error(errorMsg, {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light'
    });
  } else {
    callback()
    toast.success(successMsg, {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light'
    });
  }
}

export default notification