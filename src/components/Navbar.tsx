import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', href: '/', to: '/' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'About', href: '/#about', to: '/' },
  { label: 'Dining', href: '/#dining', to: '/#dining' },
  { label: 'Contact', href: '/#contact', to: '/' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [userMenuOpen]);

  const linkClass = 'text-white text-xs font-medium uppercase tracking-widest hover:text-gold-400 transition-colors py-2 block';
  const mobileLinkClass = 'block text-2xl font-serif text-white hover:text-gold-400 transition-colors';

  const renderNavLink = (item: NavItem, isMobile = false) => {
    const href = item.to || item.href || '#';
    const className = isMobile ? mobileLinkClass : linkClass;

    if (item.to && !item.href) {
      return (
        <Link to={item.to} className={className} onClick={() => isMobile && setMobileMenuOpen(false)}>
          {item.label}
        </Link>
      );
    }
    return (
      <a href={item.href || href} className={className} onClick={() => isMobile && setMobileMenuOpen(false)}>
        {item.label}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-stone-900/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="z-50 group">
          <h1 className="font-serif text-3xl tracking-[0.2em] font-bold uppercase text-white transition-colors duration-300 group-hover:text-gold-400">
            Seasons<span className="text-gold-400 group-hover:text-white transition-colors">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <li key={index}>{renderNavLink(item)}</li>
          ))}
          {isAuthenticated ? (
            <li className="relative group" ref={userMenuRef}>
              <button
                className={`${linkClass} cursor-pointer flex items-center gap-2`}
                onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
              >
                <span className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-stone-900 text-xs font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
                {user?.name}
              </button>
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-sm shadow-xl py-2 border-t-2 border-gold-400">
                  <div className="px-6 py-3 border-b border-stone-100">
                    <p className="text-sm font-medium text-stone-900">{user?.name}</p>
                    <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="block w-full text-left px-6 py-3 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className={linkClass}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-6 py-2 border border-white text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white ml-auto transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-stone-900 z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <ul className="text-center space-y-8">
          {navItems.map((item, index) => (
            <li key={index}>{renderNavLink(item, true)}</li>
          ))}
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className={mobileLinkClass}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className={mobileLinkClass} onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="inline-block px-8 py-3 border border-white text-white uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
