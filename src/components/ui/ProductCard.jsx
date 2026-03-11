import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation when clicking 'Add'
        addToCart(product);
        toast.success(`Added ${product.name} to cart`, {
            style: {
                background: '#1a1a2e',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            iconTheme: {
                primary: '#bc13fe',
                secondary: '#fff',
            },
        });
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="rounded-xl overflow-hidden flex flex-col transition-colors duration-300 glass-panel hover:border-accent-blue group block"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="h-full flex flex-col"
            >
                <div className="relative w-full aspect-square bg-bg-secondary overflow-hidden flex items-center justify-center">
                    <img src={`/${product.image}`} alt={product.name} className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 backdrop-blur-[2px] group-hover:opacity-100">
                        <Button variant="primary" className="px-4 py-2 text-sm" onClick={handleAddToCart}>
                            <ShoppingCart size={18} /> Add
                        </Button>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <span className="text-xs text-text-secondary uppercase tracking-widest">{product.category}</span>
                    <h3 className="text-base font-medium text-text-primary mb-1">{product.name}</h3>
                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-xl font-bold text-gradient">${product.price}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
