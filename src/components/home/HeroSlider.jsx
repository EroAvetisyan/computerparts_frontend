import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const slides = [
    {
        id: 1,
        productId: 1, // NVIDIA GeForce RTX 4090
        title: "Next Gen Gaming",
        subtitle: "RTX 4090 Series",
        description: "Experience the ultimate performance with the new NVIDIA GeForce RTX 4090.",
        image: "/public/rtx.png",
        accent: "var(--accent-green)"
    },
    {
        id: 2,
        productId: 2, // Intel Core i9-14900K
        title: "Unleash Speed",
        subtitle: "Intel Core i9-14900K",
        description: "Push the limits with the world's fastest desktop processor.",
        image: "/public/intel.png",
        accent: "var(--accent-blue)"
    },
    {
        id: 3,
        productId: 3, // Samsung 990 PRO
        title: "Limitless Storage",
        subtitle: "Samsung 990 PRO",
        description: "Blistering speeds for gaming and creative work.",
        image: "/public/sam.png",
        accent: "var(--accent-purple)"
    }
];

const HeroSlider = () => {
    return (
        <div className="w-full h-[80vh] min-h-[600px] relative overflow-hidden [&_.swiper-pagination-bullet]:bg-text-secondary [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:bg-accent-blue [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-button-next]:text-accent-blue [&_.swiper-button-prev]:text-accent-blue">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="w-full h-full flex items-center relative bg-bg-primary">
                            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" style={{ background: `radial-gradient(circle at 70% 50%, ${slide.accent}40 0%, transparent 60%)` }}></div>
                            <div className="container mx-auto px-16 md:px-20 relative z-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full pt-[60px] lg:pt-0 text-center lg:text-left">
                                <motion.div
                                    className="flex flex-col gap-6 items-center lg:items-start"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-[2px]" style={{ color: slide.accent }}>{slide.subtitle}</h2>
                                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)] dark:from-white dark:to-[#aaa] bg-clip-text text-transparent">{slide.title}</h1>
                                    <p className="text-lg text-text-secondary dark:text-text-secondary max-w-[500px]">{slide.description}</p>
                                    <Link to={`/product/${slide.productId}`}>
                                        <Button variant="primary" size="lg" className="mt-4">
                                            Shop Now <ArrowRight size={20} />
                                        </Button>
                                    </Link>
                                </motion.div>
                                <motion.div
                                    className="flex justify-center items-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <img src={slide.image} alt={slide.title} className="max-w-full max-h-[300px] lg:max-h-[500px] object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
