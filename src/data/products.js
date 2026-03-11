export const products = [
    {
        id: 1,
        name: "NVIDIA GeForce RTX 4090",
        category: "GPU",
        price: 1599.99,
        image: "rtx.png",
        isFeatured: true,
        stock: 12,
        description: "The ultimate gaming GPU with 24GB GDDR6X memory. Experience unmatched 4K gaming performance and ray tracing capabilities."
    },
    {
        id: 2,
        name: "Intel Core i9-14900K",
        category: "CPU",
        price: 589.99,
        image: "intel.png",
        isFeatured: true,
        stock: 25,
        description: "24-core powerhouse processor with up to 6.0 GHz boost. Perfect for gaming, streaming, and content creation."
    },
    {
        id: 3,
        name: "Samsung 990 PRO 2TB NVMe",
        category: "Storage",
        price: 169.99,
        image: "sam.png",
        isFeatured: false,
        stock: 44,
        description: "PCIe 4.0 NVMe SSD with read speeds up to 7,450 MB/s. Lightning-fast load times for games and applications."
    },
    {
        id: 4,
        name: "G.SKILL Trident Z5 RGB 32GB",
        category: "RAM",
        price: 139.99,
        image: "mmm.png",
        isFeatured: true,
        stock: 33,
        description: "DDR5-6000 32GB (2x16GB) kit with stunning RGB lighting. Optimized for Intel and AMD platforms."
    },
    {
        id: 5,
        name: "ASUS ROG Maximus Z790 Hero",
        category: "Motherboard",
        price: 629.99,
        image: "asus.png",
        isFeatured: false,
        stock: 8,
        description: "Premium ATX motherboard with DDR5 support, PCIe 5.0, and comprehensive cooling solutions."
    },
    {
        id: 6,
        name: "Corsair RM1000x Shift",
        category: "PSU",
        price: 209.99,
        image: "vvv.png",
        isFeatured: true,
        stock: 18,
        description: "80 PLUS Gold certified 1000W modular PSU. Whisper-quiet operation with premium connectors."
    },
    {
        id: 7,
        name: "AMD Radeon RX 7900 XTX",
        category: "GPU",
        price: 999.99,
        image: "amd1.png",
        isFeatured: true,
        stock: 15,
        description: "24GB GDDR6 RDNA 3 architecture. Exceptional 4K gaming and content creation performance."
    },
    {
        id: 8,
        name: "AMD Ryzen 9 7950X",
        category: "CPU",
        price: 699.99,
        image: "amd2.png",
        isFeatured: true,
        stock: 20,
        description: "16-core, 32-thread processor with 5.7 GHz boost. Dominates gaming and productivity tasks."
    },
    {
        id: 9,
        name: "WD Black SN850X 1TB",
        category: "Storage",
        price: 129.99,
        image: "wd.png",
        isFeatured: false,
        stock: 52,
        description: "PCIe Gen4 NVMe SSD built for gaming. Up to 7,300 MB/s read speeds with Game Mode 2.0."
    },
    {
        id: 10,
        name: "Corsair Vengeance 64GB DDR5",
        category: "RAM",
        price: 249.99,
        image: "dd.avif",
        isFeatured: false,
        stock: 27,
        description: "DDR5-5600 64GB (2x32GB) kit for extreme multitasking. Built for creators and power users."
    },
    {
        id: 11,
        name: "MSI MPG Z790 Carbon WiFi",
        category: "Motherboard",
        price: 449.99,
        image: "msi.png",
        isFeatured: false,
        stock: 14,
        description: "Feature-rich ATX motherboard with WiFi 6E, DDR5, and premium VRM design."
    },
    {
        id: 12,
        name: "EVGA SuperNOVA 850 GT",
        category: "PSU",
        price: 149.99,
        image: "ev.png",
        isFeatured: false,
        stock: 31,
        description: "850W 80 PLUS Gold fully modular PSU. 10-year warranty and ultra-quiet fan."
    },
    {
        id: 13,
        name: "NVIDIA RTX 4070 Ti",
        category: "GPU",
        price: 799.99,
        image: "4070.png",
        isFeatured: false,
        stock: 22,
        description: "12GB GDDR6X Ada Lovelace GPU. Exceptional 1440p and 4K gaming with DLSS 3."
    },
    {
        id: 14,
        name: "Intel Core i5-14600K",
        category: "CPU",
        price: 319.99,
        image: "intel2.png",
        isFeatured: false,
        stock: 38,
        description: "14-core hybrid architecture with up to 5.3 GHz. Perfect mainstream gaming processor."
    },
    {
        id: 15,
        name: "Crucial P5 Plus 500GB",
        category: "Storage",
        price: 59.99,
        image: "p5.png",
        isFeatured: false,
        stock: 67,
        description: "Affordable PCIe Gen4 NVMe SSD. Great for OS drive or game library expansion."
    },
    {
        id: 16,
        name: "Kingston Fury Beast 16GB DDR4",
        category: "RAM",
        price: 54.99,
        image: "king.png",
        isFeatured: false,
        stock: 89,
        description: "DDR4-3200 16GB kit. Reliable performance for budget and mid-range builds."
    },
    {
        id: 17,
        name: "GIGABYTE B650 AORUS Elite",
        category: "Motherboard",
        price: 199.99,
        image: "b6.png",
        isFeatured: false,
        stock: 24,
        description: "AM5 socket ATX motherboard for Ryzen 7000. Solid VRM and PCIe 4.0 support."
    },
    {
        id: 18,
        name: "Thermaltake Toughpower GF3 750W",
        category: "PSU",
        price: 119.99,
        image: "gf3.png",
        isFeatured: false,
        stock: 41,
        description: "750W 80 PLUS Gold with ATX 3.0 support. Ready for next-gen GPUs."
    },
    {
        id: 19,
        name: "NZXT H510 Flow",
        category: "Cases",
        price: 89.99,
        image: "nz.png",
        isFeatured: false,
        stock: 35,
        description: "Mid-tower case with optimized airflow. Clean design with tempered glass panel."
    },
    {
        id: 20,
        name: "Corsair 4000D Airflow",
        category: "Cases",
        price: 104.99,
        image: "case1.avif",
        isFeatured: true,
        stock: 28,
        description: "Exceptional airflow mid-tower with spacious interior. Easy cable management."
    },
    {
        id: 21,
        name: "Noctua NH-D15",
        category: "Cooling",
        price: 109.99,
        image: "nh.png",
        isFeatured: false,
        stock: 19,
        description: "Dual-tower air cooler legend. Whisper-quiet operation with maximum cooling performance."
    },
    {
        id: 22,
        name: "Arctic Liquid Freezer II 280",
        category: "Cooling",
        price: 119.99,
        image: "arc.png",
        isFeatured: true,
        stock: 23,
        description: "280mm AIO liquid cooler with VRM fan. Exceptional cooling for high-end CPUs."
    },
    {
        id: 23,
        name: "AMD Radeon RX 7800 XT",
        category: "GPU",
        price: 499.99,
        image: "rx.png",
        isFeatured: false,
        stock: 17,
        description: "16GB GDDR6 for excellent 1440p gaming. Ray tracing and FSR 3 support."
    },
    {
        id: 24,
        name: "AMD Ryzen™ 7 9700X",
        category: "CPU",
        price: 449.99,
        image: "9000.png",
        isFeatured: true,
        stock: 11,
        description: "Gaming champion with 3D V-Cache technology. Unbeatable gaming performance per dollar."
    }
];

export const categories = [
    "GPU", "CPU", "Motherboard", "RAM", "Storage", "PSU", "Cases", "Cooling"
];
