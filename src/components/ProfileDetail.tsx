import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Profile } from '../types';

export default function ProfileDetail({ profile, onClose }: { profile: Profile, onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const handleHeartClick = () => {
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 1000);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx(p => (p + 1) % profile.gallery.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx(p => (p - 1 + profile.gallery.length) % profile.gallery.length);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen flex items-center justify-center md:p-8">
        <motion.div
          className="relative w-full bg-[#f5f5f5] min-h-screen md:min-h-0 md:h-[85vh] md:max-w-5xl md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-black transition bg-white/50 backdrop-blur-md rounded-full md:bg-transparent">
            <X className="w-6 h-6 stroke-1" />
          </button>

          {/* Left: Image Carousel (45% width on PC) */}
          <div className="relative w-full md:w-[45%] aspect-[2/3] md:aspect-auto md:h-full bg-gray-200 shrink-0 group">
            <img 
              src={profile.gallery[imgIdx]} 
              alt={profile.name} 
              className="w-full h-full object-cover text-transparent"
            />
            {/* Arrows */}
            <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/20 p-2 rounded-full backdrop-blur-sm transition">
              <ChevronLeft className="w-8 h-8 stroke-1" />
            </button>
            <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/20 p-2 rounded-full backdrop-blur-sm transition">
              <ChevronRight className="w-8 h-8 stroke-1" />
            </button>
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {profile.gallery.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          </div>

          {/* Right: Content (55% width on PC) */}
          <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col md:overflow-y-auto">
            {/* Gray Info Box */}
            <div className="bg-[#e5e5e5] rounded-2xl p-6 mb-8 shrink-0 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-black mb-2">{profile.name}, {profile.age}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700">{profile.location}</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700">{profile.traits}</span>
              </div>
              <p className="text-gray-600 font-light text-base whitespace-pre-wrap">
                {profile.detailText}
              </p>
            </div>

            <div className="flex-grow min-h-[2rem]" />

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-4 mt-auto shrink-0 pb-8 md:pb-0">
              <div className="relative">
                <button 
                  onClick={handleHeartClick}
                  className="p-4 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
                >
                  <Heart className="w-6 h-6 stroke-1 text-black" />
                </button>
                <AnimatePresence>
                  {showHeartAnim && (
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -50, scale: 1.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Heart className="w-8 h-8 fill-white text-white drop-shadow-md" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href={profile.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-black text-white py-4 rounded-full font-light tracking-wider hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 stroke-1" />
                CONTACT
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
