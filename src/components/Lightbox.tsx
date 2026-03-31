import { motion } from 'motion/react';
import { X } from 'lucide-react';

export default function Lightbox({ image, onClose }: { image: string, onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
      >
        <X className="w-8 h-8" />
      </button>
      <motion.img 
        src={image} 
        alt="Enlarged view" 
        className="max-w-full max-h-full object-contain rounded-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 25 }}
      />
    </motion.div>
  );
}
