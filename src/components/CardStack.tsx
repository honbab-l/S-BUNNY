import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Profile } from '../types';

export default function CardStack({ profiles, onProfileClick }: { profiles: Profile[], onProfileClick: (p: Profile) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < profiles.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        {profiles.map((profile, index) => {
          const offset = index - currentIndex;
          // Render only nearby cards for performance
          if (Math.abs(offset) > 2) return null;

          let x = "0%";
          let scale = 1;
          let zIndex = 20;
          let opacity = 1;
          let blur = "0px";

          if (offset === -1) { x = "-70%"; scale = 0.85; zIndex = 10; opacity = 0.6; blur = "4px"; }
          else if (offset === 1) { x = "70%"; scale = 0.85; zIndex = 10; opacity = 0.6; blur = "4px"; }
          else if (offset < -1) { x = "-100%"; scale = 0.7; zIndex = 0; opacity = 0; blur = "8px"; }
          else if (offset > 1) { x = "100%"; scale = 0.7; zIndex = 0; opacity = 0; blur = "8px"; }

          return (
            <motion.div
              key={profile.id}
              className="absolute w-[260px] md:w-[340px] aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-200 cursor-pointer"
              initial={false}
              animate={{ x, scale, zIndex, opacity, filter: blur }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => offset === 0 ? onProfileClick(profile) : (offset < 0 ? handlePrev() : handleNext())}
              drag={offset === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset: dragOffset }) => {
                if (dragOffset.x < -50) handleNext();
                else if (dragOffset.x > 50) handlePrev();
              }}
            >
              <img src={profile.mainImage} alt={profile.name} className="w-full h-full object-cover pointer-events-none text-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full p-8 text-white pointer-events-none">
                <h2 className="text-4xl font-light mb-3">{profile.name}, {profile.age}</h2>
                <div className="flex items-center gap-2 mb-2 text-lg font-light">
                  <Home className="w-5 h-5 stroke-1" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-lg font-light">
                  <Heart className="w-5 h-5 stroke-1" />
                  <span>{profile.traits}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Overlays */}
      <button onClick={handlePrev} className="absolute left-4 md:left-12 z-30 p-2 text-white/70 hover:text-white transition-colors" disabled={currentIndex === 0}>
        <ChevronLeft className="w-10 h-10 stroke-1" />
      </button>
      <button onClick={handleNext} className="absolute right-4 md:right-12 z-30 p-2 text-white/70 hover:text-white transition-colors" disabled={currentIndex === profiles.length - 1}>
        <ChevronRight className="w-10 h-10 stroke-1" />
      </button>
    </div>
  );
}
