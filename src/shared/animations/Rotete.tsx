import React from 'react';
import { motion } from 'framer-motion';

interface RoteteProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * @param {object} props - The component properties.
 * @param {React.ReactNode} props.children - The child elements to be wrapped with the animation.
 *
 * @param {string} [props.className] - The class name to be applied to the element.
 * @param {number} [props.rotate=360] - The rotate angle. Default 360.
 * @param {number} [props.delay=1.5] - The delay before the animation starts. Defaults to 1.5.
 *
 * @returns {JSX.Element} An animated element wrapping the child elements.
 *
 */

const Rotete: React.FC<RoteteProps> = ({ children, className, delay = 1.5 }) => {
  return (
    <motion.div
      className={className}
      initial={{ rotate: 0, scale: 0.5 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default Rotete;
