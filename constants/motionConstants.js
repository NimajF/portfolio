const hiddenTitle = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.4,
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
      delay: 0.2,
      duration: 0.4,
    },
  },
};

const hiddenText = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.3 } },
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
      delay: 0.4,
      duration: 0.5,
    },
  },
};

const contactContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.4,
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, delay: 0 },
  },
};

const hiddenFeaturedInfo = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
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
      delay: 0.2,
      duration: 0.4,
    },
  },
};

const hiddenProject = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};
const hiddenProjectLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

// Featured project animations - slide from sides
const hiddenFeaturedProjectRight = {
  hidden: {
    opacity: 0,
    x: 150,
    y: 50,
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

const hiddenFeaturedProjectLeft = {
  hidden: {
    opacity: 0,
    x: -150,
    y: 50,
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

// About page animations
const hiddenAboutSection = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

const hiddenSkillsContainer = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      delay: 0.2,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

export {
  hiddenTitle,
  hiddenSubTitle,
  hiddenText,
  hiddenFeaturedInfo,
  hiddenFeaturedImage,
  hiddenProject,
  hiddenProjectLeft,
  hiddenFeaturedProjectRight,
  hiddenFeaturedProjectLeft,
  container,
  contactContainer,
  item,
};
