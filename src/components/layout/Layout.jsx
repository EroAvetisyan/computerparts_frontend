import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../ui/CartDrawer';
import { useCart } from '../../context/CartContext';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    const { isCartOpen, setIsCartOpen } = useCart();
    return (
        <div className="app-layout">
            <Toaster position="bottom-right" reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#1a1a2e',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                }}
            />
            <Header />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
