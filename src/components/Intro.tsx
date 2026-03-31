import { motion } from 'motion/react';

export default function Intro({ onNext }: { onNext: () => void; key?: string }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center cursor-pointer z-50"
      onClick={onNext}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-center">
        <img 
          src="https://i.postimg.cc/3rcWZV6h/logo.png" 
          alt="Logo" 
          className="w-64 h-auto mx-auto" 
          style={{ boxShadow: 'none' }}
        />
      </div>
    </motion.div>
  );
}
