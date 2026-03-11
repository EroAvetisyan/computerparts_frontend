import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';


const Footer = () => {
    return (
        <footer className="bg-bg-secondary pt-16 pb-5 mt-auto border-t border-glass-border">
            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                <div>
                    <h3 className="text-2xl font-bold mb-5 uppercase">Cyber<span className="text-gradient">Parts</span></h3>
                    <p className="text-text-secondary mb-5 text-sm leading-relaxed">
                        Your ultimate destination for high-end computer parts and custom builds.
                        Level up your gaming experience with the best hardware.
                    </p>
                    <div className="flex gap-4 text-text-secondary">
                        <a href="#" className="hover:text-accent-blue transition-colors duration-300"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-accent-blue transition-colors duration-300"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-accent-blue transition-colors duration-300"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-accent-blue transition-colors duration-300"><Youtube size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-5 text-white">Shop</h4>
                    <ul className="flex flex-col gap-2.5 list-none">
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Components</a></li>
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Peripherals</a></li>
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Laptops</a></li>
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Custom Builds</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-5 text-white">Support</h4>
                    <ul className="flex flex-col gap-2.5 list-none">
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Contact Us</a></li>
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">FAQs</a></li>
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Shipping & Returns</a></li>
                        <li><a href="#" className="text-text-secondary text-sm transition-all duration-300 hover:text-accent-blue hover:pl-1">Warranty</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-5 text-white">Contact</h4>
                    <ul className="flex flex-col gap-4 list-none">
                        <li className="flex items-center gap-2.5 text-text-secondary text-sm"><MapPin size={16} /> 123 Tech Avenue, Silicon City</li>
                        <li className="flex items-center gap-2.5 text-text-secondary text-sm"><Phone size={16} /> +1 (555) 123-4567</li>
                        <li className="flex items-center gap-2.5 text-text-secondary text-sm"><Mail size={16} /> support@cyberparts.com</li>
                    </ul>
                </div>
            </div>
            <div className="pt-5 border-t border-white/5 text-center text-text-secondary text-xs">
                <div className="container mx-auto px-5">
                    <p>&copy; 2026 CyberParts. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
