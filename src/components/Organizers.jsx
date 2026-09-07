import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, MapPin } from 'lucide-react';
import { featuredOrganizer } from '../data/organizers';
import DotField from './DotField';
import CircularGallery from './CircularGallery';

const studentGalleryItems = [
  { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', text: 'Student Lead' },
  { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80', text: 'Quantum Track' },
  { image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80', text: 'Workshops & Events' },
  { image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80', text: 'Design & Media' },
  { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80', text: 'Community & PR' },
  { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80', text: 'Logistics & Tech' },
];

export default function Organizers() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Outer Event Organizers Card with Unified DotField Background */}
      <div className="relative overflow-hidden bg-[var(--panel-bg)]/80 border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md">
        {/* Full-width DotField Background for the entire Event Organizers container */}
        <div className="absolute inset-0 pointer-events-auto">
          <DotField
            dotRadius={4.5}
            dotSpacing={6}
            cursorRadius={380}
            cursorForce={0.12}
            bulgeStrength={80}
            glowRadius={0}
            gradientFrom="rgba(156, 163, 175, 0.75)"
            gradientTo="rgba(107, 114, 128, 0.55)"
            glowColor="transparent"
          />
        </div>

        {/* Section Content sitting over DotField */}
        <div className="relative z-10 pointer-events-none">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-[var(--text-primary)]">Event Organizers</h2>
          
          {/* QuDAIS Lab Square Background Card */}
          <div className="flex justify-center mb-16 pointer-events-auto">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square bg-[var(--panel-bg)]/85 backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden group"
              style={{
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Subtle Ambient Gradient Corner Glows */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-pink-500/15 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center w-full">
                {/* 1. Logo Container */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 border-2 border-[var(--border-color)] flex items-center justify-center shadow-lg group-hover:border-pink-500/40 transition-colors duration-300">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-wider bg-gradient-to-r from-pink-accent to-blue-accent bg-clip-text text-transparent">
                      {featuredOrganizer.logo}
                    </span>
                  </div>
                  {/* Verified / Host badge */}
                  <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[var(--panel-bg)] border border-[var(--border-color)] shadow-md text-pink-accent">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* 2. Heading */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
                  {featuredOrganizer.name}
                </h3>

                {/* 3. Location */}
                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[var(--muted-foreground)] mb-4 px-2">
                  <MapPin className="w-4 h-4 text-[var(--text-primary)] opacity-70 flex-shrink-0" />
                  <span>{featuredOrganizer.description}</span>
                </div>

                {/* 4. Subheading / Role */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-pink-500/10 text-pink-accent border border-pink-500/20">
                  <Award className="w-3.5 h-3.5" />
                  {featuredOrganizer.role}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Student Organizers Section with Circular Gallery */}
          <div className="border-t border-[var(--border-color)]/60 pt-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-pink-accent mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Core Team
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Student Organizers</h3>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto mt-1">
                Drag or scroll horizontally to explore the student organizing committee.
              </p>
            </div>

            {/* Circular Gallery Container */}
            <div className="relative w-full h-[520px] md:h-[580px] pointer-events-auto select-none rounded-2xl overflow-hidden">
              <CircularGallery
                items={studentGalleryItems}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.06}
                scrollEase={0.03}
                scrollSpeed={2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


