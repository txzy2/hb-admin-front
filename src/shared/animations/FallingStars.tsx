import React from 'react';
import {motion} from 'framer-motion';

const FallingStars: React.FC = () => {
  const stars = Array.from({length: 20});

  return (
    <div className='h-[85vh] absolute top-0 left-0 w-[80vw] pointer-events-none'>
      {stars.map((_, index) => (
        <motion.div
          key={index}
          className='absolute star w-[10px] h-[10px] bg-gray-400 rounded-sm'
          initial={{y: -50, opacity: 0}}
          animate={{y: '85vh', opacity: [1, 0.4, 0]}}
          transition={{
            duration: Math.random() * 5 + 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
          style={{
            left: `${Math.random() * 90}vw`,
            top: `${Math.random() * 10}vh`
          }}
        />
      ))}
    </div>
  );
};

export default FallingStars;
