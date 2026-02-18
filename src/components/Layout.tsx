import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Footer: React.FC = () => (
  <footer id="contact" className="bg-stone-950 text-white pt-24 pb-12 px-6 border-t border-stone-800">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div className="md:col-span-1">
        <h3 className="font-serif text-3xl mb-6">Seasons<span className="text-gold-500">.</span></h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-6">
          A collection of the world's finest properties, dedicated to the art of luxury living.
        </p>
        <div className="flex space-x-4">
          <div className="w-8 h-8 rounded-full border border-stone-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all cursor-pointer text-xs">FB</div>
          <div className="w-8 h-8 rounded-full border border-stone-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all cursor-pointer text-xs">IG</div>
          <div className="w-8 h-8 rounded-full border border-stone-700 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all cursor-pointer text-xs">TW</div>
        </div>
      </div>

      <div>
        <h4 className="uppercase tracking-widest text-xs font-bold mb-8 text-stone-400">Navigation</h4>
        <ul className="space-y-4 text-sm font-light text-stone-300">
          <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
          <li><Link to="/#about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
          <li><Link to="/hotels" className="hover:text-gold-400 transition-colors">Destinations</Link></li>
          <li><Link to="/#dining" className="hover:text-gold-400 transition-colors">Dining</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="uppercase tracking-widest text-xs font-bold mb-8 text-stone-400">Contact</h4>
        <ul className="space-y-4 text-sm font-light text-stone-300">
          <li>123 Luxury Lane, Metropolis</li>
          <li>contact@seasons-hotels.com</li>
          <li>+1 (555) 123-4567</li>
        </ul>
      </div>

      <div>
        <h4 className="uppercase tracking-widest text-xs font-bold mb-8 text-stone-400">Reservations</h4>
        <p className="text-stone-500 text-sm mb-4">Ready to experience luxury?</p>
        <Link
          to="/hotels"
          className="inline-block px-6 py-3 border border-gold-500 text-gold-400 text-xs font-semibold uppercase tracking-widest hover:bg-gold-500 hover:text-stone-900 transition-colors"
        >
          Book Your Stay
        </Link>
      </div>
    </div>

    <div className="container mx-auto border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
      <p>&copy; 2026 Seasons Hospitality Group. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-stone-400">Privacy Policy</a>
        <a href="#" className="hover:text-stone-400">Terms of Service</a>
      </div>
    </div>
  </footer>
);

interface LayoutProps {
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ showFooter = true }) => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    {showFooter && <Footer />}
  </>
);

export default Layout;
