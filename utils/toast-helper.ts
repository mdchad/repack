import toast from 'react-hot-toast';

function notification(error: any, errorMsg: string, successMsg: string, callback = () => {}) {

  if (error) {
    console.log(error);
    toast.error(errorMsg, { position: 'top-right' });
  } else {
    callback()
    toast.success(successMsg, { position: 'top-right' });
  }
}

export default notification