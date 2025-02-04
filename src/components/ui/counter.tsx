import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CounterProps {
  value: number;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const [prevValue, setPrevValue] = useState(0);
  
  const spring = useSpring(prevValue, {
    damping: 30,
    stiffness: 100,
  });

  const display = useTransform(spring, (current: number) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    setPrevValue(value);
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
}
