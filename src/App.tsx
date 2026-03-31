import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import MainView from './components/MainView';
import ProfileDetail from './components/ProfileDetail';
import { profiles } from './data';
import { Profile } from './types';

export default function App() {
  const [stage, setStage] = useState<'intro' | 'main'>('intro');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  return (
    <div className="fixed inset-0 bg-[linear-gradient(135deg,#fbc2eb_0%,#a6c1ee_100%)] overflow-hidden font-sans font-light">
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <Intro key="intro" onNext={() => setStage('main')} />
        )}
        {stage === 'main' && (
          <MainView key="main" profiles={profiles} onProfileClick={setSelectedProfile} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProfile && (
          <ProfileDetail profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
