import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const { totalItems, setIsCartOpen } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-panel border-b border-glass-border' : 'py-5'}`}>
            <div className="container mx-auto px-5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-wider">
                    <Cpu className="text-accent-blue" size={32} />
                    <span className="uppercase">Cyber<span className="text-gradient">Parts</span></span>
                </Link>

                <nav className="hidden md:flex gap-8">
                    {['Home', 'Products', 'Builds', 'Support'].map((item) => (
                        <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="relative font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-accent-blue after:transition-[width] hover:after:w-full">
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-5">
                    <div className="hidden md:flex items-center relative bg-white/5 rounded-full px-4 py-1.5 border border-transparent transition-all duration-300 focus-within:bg-white/10 focus-within:border-accent-purple focus-within:shadow-neon-purple">
                        <Search size={20} className="text-text-secondary" />
                        <input type="text" placeholder="Search components..." className="bg-transparent border-none text-white outline-none w-[200px] ml-2 placeholder:text-text-secondary" />
                    </div>
                    <Button variant="outline" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
                        <ShoppingCart size={18} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent-purple text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Button>
                    <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="absolute top-full left-0 w-full p-5 border-t border-glass-border glass-panel md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <nav className="flex flex-col gap-4">
                            {['Home', 'Products', 'Builds', 'Support'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-semibold p-2.5 rounded-lg transition-colors hover:bg-white/5"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
