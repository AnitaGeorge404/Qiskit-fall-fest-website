import React, { useState } from 'react';
import { team } from '../data/team';
import TiltedCard from './TiltedCard';
import FoldText from './FoldText';

export default function TeamGrid() {
  const [hoveredMember, setHoveredMember] = useState(0);

  return (
    <section id="team" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)]">Meet the team</h2>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          A passionate team of digital experts dedicated to your brands success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map((member, idx) => (
          <div key={idx} className="w-full aspect-[3/4]">
            <TiltedCard 
              imageSrc={member.image} 
              altText={member.name}
              captionText={member.role}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="flex items-center justify-center w-full h-full p-6 bg-black/60 rounded-[15px] opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                   <FoldText 
                     text={member.name} 
                     trigger="hover" 
                     color="white" 
                     fontSize={24} 
                     className="text-center font-bold"
                   />
                </div>
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
