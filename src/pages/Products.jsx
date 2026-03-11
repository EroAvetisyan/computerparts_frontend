import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { products, categories } from '../data/products';
import { useMediaQuery } from '../hooks/useMediaQuery';

const INITIAL_VISIBLE_MOBILE = 6;

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('name-asc');
    const [showFilters, setShowFilters] = useState(true);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_MOBILE);
    const isNarrow = useMediaQuery('(max-width: 640px)');

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategories.length > 0) {
            result = result.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // Sorting
        switch (sortBy) {
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return result;
    }, [searchTerm, selectedCategories, sortBy]);

    // Reset visible count when filters/search/sort change (narrow screen)
    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE_MOBILE);
    }, [searchTerm, selectedCategories, sortBy]);

    const displayedProducts = isNarrow
        ? filteredProducts.slice(0, visibleCount)
        : filteredProducts;
    const showSeeMore = isNarrow && filteredProducts.length > visibleCount;

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="pb-20 pt-24">
            <div className="container mx-auto px-5">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        All <span className="text-gradient">Products</span>
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Browse our complete collection of premium PC components
                    </p>
                </div>

                {/* Search and Sort Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-bg-secondary border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-text-secondary focus:border-accent-blue focus:outline-none transition-colors"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors cursor-pointer"
                    >
                        <option value="name-asc">Name: A-Z</option>
                        <option value="name-desc">Name: Z-A</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white hover:border-accent-blue transition-colors"
                    >
                        <SlidersHorizontal size={20} />
                        Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <motion.aside
                        initial={false}
                        animate={{
                            width: showFilters ? 'auto' : 0,
                            opacity: showFilters ? 1 : 0
                        }}
                        className={`${showFilters ? 'block' : 'hidden lg:block'} lg:w-64 flex-shrink-0`}
                    >
                        <div className="glass-panel p-6 rounded-xl sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Filters</h3>
                                {selectedCategories.length > 0 && (
                                    <button
                                        onClick={() => setSelectedCategories([])}
                                        className="text-sm text-accent-blue hover:underline"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
                                    Categories
                                </h4>
                                {categories.map(category => {
                                    const count = products.filter(p => p.category === category).length;
                                    return (
                                        <label
                                            key={category}
                                            className="flex items-center gap-3 cursor-pointer group"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                className="w-4 h-4 rounded border-white/20 bg-bg-tertiary text-accent-purple focus:ring-accent-purple focus:ring-offset-0"
                                            />
                                            <span className="flex-1 group-hover:text-accent-blue transition-colors">
                                                {category}
                                            </span>
                                            <span className="text-xs text-text-secondary">
                                                {count}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-text-secondary">
                                <span className="text-white font-semibold">{filteredProducts.length}</span> products found
                            </p>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search size={40} className="text-text-secondary opacity-50" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-text-secondary">
                                    Try adjusting your search or filters
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                {showSeeMore && (
                                    <div className="flex justify-center mt-8">
                                        <Button
                                            variant="outline"
                                            onClick={() => setVisibleCount(filteredProducts.length)}
                                        >
                                            SEE MORE
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
