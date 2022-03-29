import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const InView = ({ children, ...rest }) => {
  const animation = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }
  }, [animation, inView]);
  return (
    <motion.div ref={ref} initial="hidden" animate={animation} {...rest}>
      {children}
    </motion.div>
  );
};
export default InView;
