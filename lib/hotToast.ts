import toast from 'react-hot-toast';

export const notify = (message: string) =>
  toast.success(message, {
    style: {
      fontSize: '1.5rem',
    },
  });