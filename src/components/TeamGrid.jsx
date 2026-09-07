import React, { useState } from 'react';
import { team } from '../data/team';
import IDCard from './IDCard';
import { User } from 'lucide-react';

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

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left side: Grid of list items */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-4 p-4 rounded-md border cursor-pointer transition-all duration-300 ${hoveredMember === idx ? 'bg-[var(--background)] border-[var(--text-primary)] shadow-none' : 'bg-[var(--panel-bg)] border-[var(--border-color)] hover:border-[var(--muted-foreground)]'}`}
              onMouseEnter={() => setHoveredMember(idx)}
            >
              <div className="w-12 h-12 rounded-md bg-[var(--muted)] flex items-center justify-center border border-[var(--border-color)] shrink-0 overflow-hidden text-[var(--muted-foreground)]">
                {member.image !== "<to be filled>" ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-[var(--text-primary)]">{member.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side: ID Card Details */}
        <div className="w-full lg:w-[450px] xl:w-[500px] shrink-0 sticky top-28">
          <IDCard member={team[hoveredMember]} />
        </div>
      </div>
    </section>
  );
}
