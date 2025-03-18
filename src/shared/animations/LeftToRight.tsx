import React from 'react';
import {motion} from 'framer-motion';

/**
 * The LeftToRight component animates an element from left to right.
 *
 * @param {object} props - The component properties.
 * @param {React.ReactNode} props.children - The child elements to be wrapped with the animation.
 *
 * @param {string} [props.className] - The class name to be applied to the element.
 * @param {number} [props.startPosition=-100] - The starting position of the element. Defaults to -100.
 * @param {number} [props.endPosition=0] - The ending position of the element. Defaults to 0.
 * @param {number} [props.delay=1.5] - The delay before the animation starts. Defaults to 1.5.
 *
 * @returns {JSX.Element} An animated element wrapping the child elements.
 */

interface LeftToRightProps {
  children: React.ReactNode;
  className?: string;
  startPosition?: number;
  endPosition?: number;
  delay?: number;
}

const LeftToRight: React.FC<LeftToRightProps> = ({
  children,
  className,
  startPosition = -100,
  endPosition = 0,
  delay = 1.5,
}) => {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, x: startPosition}}
      animate={{opacity: 1, x: endPosition}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
};

export default LeftToRight;
