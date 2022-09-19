export const modalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
  },
};

export const modalContentVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: '100vh',
  },
};

export const cartBarContainer = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
};