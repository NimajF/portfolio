const hiddenTitle = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const hiddenSubTitle = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
};

const hiddenText = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 1 } },
};

// initial={{ x: 10, opacity: 0 }}
// animate={{ x: 0, opacity: 1 }}
// exit={{ x: -300, opacity: 0 }}
// transition={{ duration: 0.5, delay: 1 }}

const container = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1.5,
    },
  },
};

const contactContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.5,
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 1.5 },
  },
};

const hiddenFeaturedInfo = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
};

const hiddenFeaturedImage = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const hiddenProject = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 2 } },
};
const hiddenProjectLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 2 } },
};

export {
  hiddenTitle,
  hiddenSubTitle,
  hiddenText,
  hiddenFeaturedInfo,
  hiddenFeaturedImage,
  hiddenProject,
  hiddenProjectLeft,
  container,
  contactContainer,
  item,
};
