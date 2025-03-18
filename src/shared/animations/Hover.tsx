import React from 'react';
import {motion} from 'framer-motion';

/**
 * The Hover component adds a scaling animation on hover.
 *
 * @param {object} props - The component properties.
 * @param {React.ReactNode} props.children - The child elements to be wrapped with the animation.
 * @param {number} [props.scale=1.1] - The scale factor on hover. Defaults to 1.1.
 * @param {string} [props.className] - The class name to be applied to the element.
 *
 * @returns {JSX.Element} An animated element wrapping the child elements.
 */

interface HoverProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

const Hover: React.FC<HoverProps> = ({children, scale, className}) => {
  return (
    <motion.div
      className={className}
      whileHover={{scale: scale || 1.1}}
      transition={{type: 'spring', stiffness: 400, damping: 10}}
    >
      {children}
    </motion.div>
  );
};

export default Hover;
