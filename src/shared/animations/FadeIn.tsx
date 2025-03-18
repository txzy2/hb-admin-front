import React, {ReactNode} from 'react';
import {motion} from 'framer-motion';

/**
 * The FadeIn component fades in an element with the specified delay.
 *
 * @param {object} props - The component properties.
 * @param {React.ReactNode} props.children - The child elements to be wrapped with the animation.
 * @param {string} [props.className] - The class name to be applied to the element.
 *
 * @returns {JSX.Element} An animated element wrapping the child elements.
 */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({children, className, delay = 0.5}) => {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        duration: 1.5,
        delay,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
