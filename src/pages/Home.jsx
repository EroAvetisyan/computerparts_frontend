import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck, Cpu } from 'lucide-react';
import HeroSlider from '../components/home/HeroSlider';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { products, categories } from '../data/products';
import { useMediaQuery } from '../hooks/useMediaQuery';

const INITIAL_VISIBLE_MOBILE = 6;

const Home = () => {
    const featuredProducts = products.filter(p => p.isFeatured);
    const isNarrow = useMediaQuery('(max-width: 640px)');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_MOBILE);

    const displayedProducts = isNarrow
        ? featuredProducts.slice(0, visibleCount)
        : featuredProducts;
    const showSeeMore = isNarrow && featuredProducts.length > visibleCount;

    return (
        <div className="pb-20">
            <HeroSlider />

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="p-8 rounded-xl text-center transition-transform duration-300 hover:-translate-y-1 glass-panel flex flex-col items-center">
                        <Zap className="text-accent-blue mb-4" size={32} />
                        <h3 className="mb-2.5 text-lg font-semibold">Fast Shipping</h3>
                        <p className="text-text-secondary text-sm">Get your parts delivered within 24 hours.</p>
                    </div>
                    <div className="p-8 rounded-xl text-center transition-transform duration-300 hover:-translate-y-1 glass-panel flex flex-col items-center">
                        <Shield className="text-accent-blue mb-4" size={32} />
                        <h3 className="mb-2.5 text-lg font-semibold">Official Warranty</h3>
                        <p className="text-text-secondary text-sm">All products come with manufacturer warranty.</p>
                    </div>
                    <div className="p-8 rounded-xl text-center transition-transform duration-300 hover:-translate-y-1 glass-panel flex flex-col items-center">
                        <Truck className="text-accent-blue mb-4" size={32} />
                        <h3 className="mb-2.5 text-lg font-semibold">Secure Packaging</h3>
                        <p className="text-text-secondary text-sm">We ensure your heavy GPUs arrive safe.</p>
                    </div>
                    <div className="p-8 rounded-xl text-center transition-transform duration-300 hover:-translate-y-1 glass-panel flex flex-col items-center">
                        <Cpu className="text-accent-blue mb-4" size={32} />
                        <h3 className="mb-2.5 text-lg font-semibold">Expert Support</h3>
                        <p className="text-text-secondary text-sm">Need help building? Ask our experts.</p>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="container mx-auto px-5">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-4xl font-bold">Shop by <span className="text-gradient">Category</span></h2>
                        <Button variant="outline">View All <ArrowRight size={16} /></Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                className="p-8 rounded-xl text-center cursor-pointer transition-all duration-300 flex items-center justify-center glass-panel hover:border-accent-blue"
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-lg font-semibold">{cat}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16">
                <div className="container mx-auto px-5">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-4xl font-bold">Featured <span className="text-gradient">Products</span></h2>
                        <Button variant="outline">View All <ArrowRight size={16} /></Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {showSeeMore && (
                        <div className="flex justify-center mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setVisibleCount(featuredProducts.length)}
                            >
                                SEE MORE
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Banner Section */}
            <section className="py-16">
                <div className="container mx-auto px-5">
                    <div className="relative overflow-hidden rounded-[20px] p-16 text-center border border-accent-purple bg-gradient-to-br from-bg-secondary to-bg-tertiary neon-glow">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.2)_0%,transparent_70%)] pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">Build Your Dream PC</h2>
                            <p className="text-text-secondary mb-8 text-xl">Use our custom PC builder tool to ensure compatibility and performance.</p>
                            <Button variant="primary">Start Building</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
