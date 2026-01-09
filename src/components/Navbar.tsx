import React, { useState, useEffect } from 'react';
import type { NavItem } from '../types.ts';

const navItems: NavItem[] = [
  { label: 'About Us', href: '#about' },
  {
    label: 'Hotels',
    children: [
      { label: 'Seasons Grand', href: '#grand' },
      { label: 'Seasons Beach Resort', href: '#beach' },
      { label: 'Seasons Mountain Retreat', href: '#mountain' },
    ]
  },
  {
    label: 'Restaurants',
    children: [
      { label: 'Seasons Fine Dine', href: '#finedine' },
      { label: 'Seasons Café', href: '#cafe' },
      { label: 'Seasons Rooftop Bar', href: '#rooftop' },
    ]
  },
  { label: 'Contact Us', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-stone-900/90 backdrop-blur-md py-4 shadow-lg'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="z-50 group">
          <h1 className={`font-serif text-3xl tracking-[0.2em] font-bold uppercase transition-colors duration-300 ${
            isScrolled ? 'text-white' : 'text-white'
          }`}>
            Seasons<span className="text-gold-400 group-hover:text-white transition-colors">.</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="group relative">
              <a
                href={item.href || '#'}
                className="text-white text-xs font-medium uppercase tracking-widest hover:text-gold-400 transition-colors py-2 block"
              >
                {item.label}
              </a>

              {/* Dropdown Menu */}
              {item.children && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white rounded-sm shadow-xl overflow-hidden py-2 border-t-2 border-gold-400">
                    {item.children.map((child, idx) => (
                      <a
                        key={idx}
                        href={child.href}
                        className="block px-6 py-3 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors font-serif italic"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white ml-auto transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-900 z-40 flex items-center justify-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <ul className="text-center space-y-8">
          {navItems.map((item, index) => (
            <li key={index} className="overflow-hidden">
               <a
                href={item.href || '#'}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-serif text-white hover:text-gold-400 transition-colors"
              >
                {item.label}
              </a>
               {item.children && (
                  <div className="mt-4 space-y-3 pl-4 border-l border-white/10 ml-4">
                    {item.children.map((child, idx) => (
                       <a
                        key={idx}
                        href={child.href}
                         onClick={() => setMobileMenuOpen(false)}
                        className="block text-lg font-serif text-stone-400 hover:text-white transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
               )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;