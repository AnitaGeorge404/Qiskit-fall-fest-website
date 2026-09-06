import React from 'react';
import { featuredOrganizer, studentOrganizers } from '../data/organizers';

export default function Organizers() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-3xl p-8 md:p-12 shadow-xl">
        <h2 className="text-3xl font-black mb-12 text-center">Event Organizers</h2>
        
        {/* Featured Organizer */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="w-32 h-32 rounded-full bg-[var(--muted)] border border-[var(--border-color)] flex items-center justify-center mb-4 overflow-hidden">
            <span className="text-sm opacity-50">{featuredOrganizer.logo}</span>
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{featuredOrganizer.name}</h3>
          <p className="text-pink-accent font-medium mb-1">{featuredOrganizer.role}</p>
          <p className="text-sm text-[var(--muted-foreground)]">{featuredOrganizer.description}</p>
        </div>

        {/* Student Organizers */}
        <div className="border-t border-[var(--border-color)] pt-12">
          <h3 className="text-xl font-bold text-pink-accent text-center mb-10">Student Organizers</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {studentOrganizers.map((org, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[var(--muted)] border border-[var(--border-color)] flex items-center justify-center mb-3 text-[10px] text-center">
                  {org.image}
                </div>
                <h4 className="font-bold text-sm">{org.name}</h4>
                <p className="text-xs text-blue-accent">{org.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
