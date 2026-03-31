import { Bell, Plus } from 'lucide-react';
import CardStack from './CardStack';
import { Profile } from '../types';

export default function MainView({ profiles, onProfileClick }: { profiles: Profile[], onProfileClick: (p: Profile) => void; key?: string }) {
  return (
    <div className="flex flex-col h-full w-full mx-auto relative z-10">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-5xl mx-auto w-full">
        <img 
          src="https://i.postimg.cc/3rcWZV6h/logo.png" 
          alt="Logo" 
          className="h-6 md:h-8 w-auto" 
          style={{ boxShadow: 'none' }}
        />
        <div className="flex items-center gap-4 text-white">
          <button className="relative hover:scale-110 transition-transform">
            <Bell className="w-6 h-6 stroke-1 drop-shadow-md" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-transparent" />
          </button>
          <button className="hover:scale-110 transition-transform">
            <Plus className="w-7 h-7 stroke-1 drop-shadow-md" />
          </button>
        </div>
      </header>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden pb-12 w-full">
        <CardStack profiles={profiles} onProfileClick={onProfileClick} />
      </div>
    </div>
  );
}
