import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Play, ArrowUpRight, Globe, ExternalLink } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'The Glass House',
    category: 'Real Estate',
    // To use a YouTube thumbnail, use the format: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
    image: 'https://img.youtube.com/vi/tO01J-M3g0U/maxresdefault.jpg',
    type: 'video',
    orientation: 'landscape',
    youtubeLink: 'https://www.youtube.com/watch?v=cu17V4nZK-c'
  },
  {
    id: 2,
    title: 'Vertical Reel: Penthouse',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'video',
    orientation: 'portrait',
    vimeoLink: 'https://www.dropbox.com/scl/fi/c3xzdgi5m0f1o6k93r3zy/V3.mp4?rlkey=mb2t9lyuyf7fk2mb52721kxc9&st=2no80bc1&dl=0'
  },
  {
    id: 3,
    title: 'Metropolitan Gala',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    orientation: 'landscape',
    vimeoLink: 'https://vimeo.com/123456789'
  },
  {
    id: 4,
    title: 'Neon Nights Festival',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    orientation: 'landscape',
    vimeoLink: 'https://vimeo.com/123456789'
  },
  {
    id: 5,
    title: 'Reel: Summer Vibes',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1533174000228-4f59c2be2c76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'video',
    orientation: 'portrait',
    vimeoLink: 'https://vimeo.com/123456789'
  },
  {
    id: 6,
    title: 'Skyline Penthouse',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600607687931-cebf0746e50e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    orientation: 'landscape',
    vimeoLink: 'https://vimeo.com/123456789'
  }
];

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, PORTFOLIO_ITEMS.length));
  };

  // Timezone calculations
  const vnTime = time.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', hour: '2-digit', minute:'2-digit' });
  const localTime = time.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute:'2-digit' });
  
  const vnDay = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long' }).format(time);
  const isWorking = vnDay !== 'Sunday';

  const localOffset = -(time.getTimezoneOffset() / 60);
  const vnOffset = 7;
  const diff = vnOffset - localOffset;
  const diffText = diff === 0 
    ? 'We are in the same timezone' 
    : diff > 0 
      ? `Vietnam is ${diff} hours ahead of you` 
      : `Vietnam is ${Math.abs(diff)} hours behind you`;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] selection:bg-black/10 overflow-x-hidden">
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white bg-white pointer-events-none z-[100] mix-blend-difference flex items-center justify-center hidden md:flex"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <span className="font-display font-medium text-sm tracking-[0.2em] uppercase">Sam.</span>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-sm uppercase tracking-widest hover:opacity-50 transition-opacity hidden md:block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Instagram
            </a>
            <a 
              href="#contact" 
              className="text-sm uppercase tracking-widest hover:opacity-50 transition-opacity"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main>
        
        {/* Hero Section - Editorial Style */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mb-8 ml-1">
              Video Editor • Real Estate & Events
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-[9vw] leading-[0.85] font-display font-light tracking-tighter mb-12">
              CRAFTING <br />
              <span className="font-serif italic text-black/60">HIGH-END</span> <br />
              VISUALS.
            </h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-black/10 pt-10 mt-10">
              <p className="text-lg md:text-xl font-light text-[var(--color-text-secondary)] max-w-md">
                Ready whenever you need. <br/>
                <span className="text-[var(--color-text-primary)] font-medium">Worldwide delivery.</span>
              </p>
              
              <button 
                className="group flex items-center gap-4 text-sm uppercase tracking-widest"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="w-12 h-[1px] bg-black group-hover:w-24 transition-all duration-500"></span>
                View Showreel
              </button>
            </div>
          </motion.div>
        </section>

        {/* Who I Am Section */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <motion.div 
              className="md:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">Who I Am</h2>
            </motion.div>
            <motion.div 
              className="md:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-2xl md:text-4xl font-serif leading-tight mb-6">
                I am Sam, a dedicated video editor specializing in high-end real estate and luxury events.
              </h3>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed font-light max-w-2xl">
                Based in Vietnam, I partner with global creators, agencies, and brands to transform raw footage into compelling visual narratives. My approach is rooted in precision, rhythm, and a deep understanding of visual storytelling. Whether it's a dynamic vertical property tour or a cinematic event aftermovie, I ensure every frame serves a purpose.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills & Toolkit Section */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-8">Expertise</h3>
              <ul className="space-y-4 font-serif text-xl md:text-2xl text-[var(--color-text-primary)]">
                <li>Property Tour / Walkthrough</li>
                <li>Neighborhood Spotlight</li>
                <li>Agent / Brand Promos</li>
                <li>Client Testimonials</li>
                <li>Luxury Showcase</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-8">Toolkit</h3>
              <ul className="space-y-4 font-serif text-xl md:text-2xl text-[var(--color-text-primary)]">
                <li>Final Cut Pro <span className="text-sm font-sans text-black/40 align-middle ml-2">Advanced</span></li>
                <li>Adobe After Effects</li>
                <li>Color Grading <span className="text-sm font-sans text-black/40 align-middle ml-2">LOG (Sony, Canon, etc.)</span></li>
              </ul>
            </motion.div>
          </div>

          {/* The Process */}
          <div className="border-t border-black/10 pt-24">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-16"
            >
              The Process
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: '01', title: 'Request', desc: 'Receive your project details and raw footage via Dropbox link.' },
                { step: '02', title: 'Vision & Quote', desc: 'Listen to your ideas, discuss the creative direction, and provide a quote.' },
                { step: '03', title: 'Editing', desc: 'Start working immediately and deliver the first draft within 24 hours.' },
                { step: '04', title: 'Revisions', desc: 'Review the video. Up to 3 rounds of free revisions to ensure it is perfect.' },
                { step: '05', title: 'Delivery', desc: 'Once you are 100% satisfied, an invoice is sent for payment.' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <span className="text-sm font-serif italic text-[var(--color-text-secondary)]">{item.step}</span>
                  <h4 className="text-base font-medium">{item.title}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-16">Selected Works</h2>
          
          <div className="flex flex-col gap-20 md:gap-32">
            <AnimatePresence mode="popLayout">
              {PORTFOLIO_ITEMS.slice(0, visibleCount).map((item, index) => (
                <motion.a 
                  href={item.vimeoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center group cursor-none`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`w-full ${item.orientation === 'portrait' ? 'md:w-1/3' : 'md:w-2/3'} overflow-hidden bg-[var(--color-surface)]`}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className={`w-full ${item.orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9] md:aspect-[4/3]'} object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100`}
                    />
                  </div>
                  
                  <div className={`w-full ${item.orientation === 'portrait' ? 'md:w-2/3' : 'md:w-1/3'} flex flex-col justify-center`}>
                    <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-4 block">
                      {String(index + 1).padStart(2, '0')} — {item.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-serif mb-4 group-hover:italic transition-all duration-500">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-black/50 group-hover:text-black transition-colors">
                      <Play className="w-4 h-4" /> Watch Film
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {visibleCount < PORTFOLIO_ITEMS.length && (
              <button 
                onClick={handleLoadMore}
                className="px-10 py-4 border border-black/20 rounded-full text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Load More Projects
              </button>
            )}
            <a 
              href="https://www.dropbox.com/scl/fo/331vbxngwx0i7e6qvwucs/AJe6cVbd51BPQVRxD1EYhWI?rlkey=qjv09vo0a9u5vzv2idyu7inac&e=2&st=k22gkctz&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-black/20 rounded-full text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center gap-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              View More Samples <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

        {/* Availability & Timezone Section */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 bg-white text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-black/50 mb-8">Availability</h3>
              
              <div className="mb-8 flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWorking ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isWorking ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
                <span className="text-sm uppercase tracking-widest font-medium">
                  {isWorking ? 'Currently Online' : 'Currently Offline (Sunday)'}
                </span>
              </div>

              <p className="text-2xl font-serif mb-2">Monday — Saturday</p>
              <p className="text-base text-black/70">24 Hours / 6 Days a Week</p>
              <p className="text-sm text-black/50 mt-4 italic">* Closed on Sundays (Vietnam Time)</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-black/50 mb-8">Timezone (UTC+7)</h3>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end border-b border-black/10 pb-3">
                  <span className="text-black/70">Your Local Time</span>
                  <span className="text-lg md:text-xl font-serif">{localTime}</span>
                </div>
                <div className="flex justify-between items-end border-b border-black/10 pb-3">
                  <span className="text-black/70">My Time (Vietnam)</span>
                  <span className="text-lg md:text-xl font-serif">{vnTime}</span>
                </div>
                <p className="text-sm text-black/50 mt-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {diffText}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 px-6 text-center border-t border-black/10">
          <h2 className="text-4xl md:text-7xl font-display font-light tracking-tighter mb-8">
            LET'S <span className="font-serif italic">WORK</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a 
              href="mailto:samedit.prees@gmail.com"
              className="inline-flex items-center gap-3 text-base md:text-lg uppercase tracking-widest border-b border-black pb-2 hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] transition-colors"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              contact@samedit.com <ArrowUpRight className="w-5 h-5" />
            </a>
            <span className="hidden md:block text-[var(--color-text-secondary)]">or</span>
            <a 
              href="https://wa.me/1234567890"
              className="inline-flex items-center gap-3 text-base md:text-lg uppercase tracking-widest border-b border-black pb-2 hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] transition-colors"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              WhatsApp <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[var(--color-text-secondary)] bg-[var(--color-surface)] border-t border-black/10">
        <p>© {new Date().getFullYear()} Sam Visuals.</p>
        <p className="mt-4 md:mt-0">All rights reserved.</p>
      </footer>
    </div>
  );
}


