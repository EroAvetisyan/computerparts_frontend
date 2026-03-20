import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

/**
 * հերթականությունը կանստռուկոռի մեջ
 * պարզ հերթականության լոգիկա եմ դրել որ հերթով էթումա, դեմից պրոցեսսոր, մայրական պլատա ու տենց
 */
const BUILDER_CATEGORIES = [
    'CPU',
    'Motherboard',
    'RAM',
    'Storage',
    'GPU',
    'PSU',
    'Cases',
    'Cooling',
];

/**
 * սկզբնական տեսքը օբյեկտա, որտեղ key ը կատեգորիայի անուննա,
 * արժեքը null ա որտև ոչմիբան ընտրած չի
 * օգտագործվումա 1ին ռենդեռի ժամանակ, state ի ինիցիլիզացիայի համար
 */
const initialSelections = Object.fromEntries(
    BUILDER_CATEGORIES.map((cat) => [cat, null])
);

/**
 * toast ի սթայլնա (react-hot-toast)
 */
const toastStyle = {
    style: {
        background: '#1a1a2e',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    iconTheme: {
        primary: '#bc13fe',
        secondary: '#fff',
    },
};

const BUILD_TYPES = [
    'Custom PC',
    'Gaming PC',
    'For Working',
    'Editing PC',
    'Budget PC',
    'High-End PC',
];

const PRESET_BUILD_SELECTIONS = {
    'Custom PC': {
            CPU: null,
            Motherboard: null,
            RAM: null,
            Storage: null,
            GPU: null,
            PSU: null,
            Cases: null,
            Cooling: null,
    },
    'Gaming PC': {
        CPU: 2,
        Motherboard: 5,
        RAM: 4,
        Storage: 3,
        GPU: 1,
        PSU: 6,
        Cases: 20,
        Cooling: 22,
    },
    'For Working': {
        CPU: 8,
        Motherboard: 11,
        RAM: 10,
        Storage: 3,
        GPU: 7,
        PSU: 12,
        Cases: 20,
        Cooling: 21,
    },
    'Editing PC': {
        CPU: 24,
        Motherboard: 17,
        RAM: 10,
        Storage: 9,
        GPU: 23,
        PSU: 12,
        Cases: 20,
        Cooling: 22,
    },
    'Budget PC': {
        CPU: 14,
        Motherboard: 17,
        RAM: 16,
        Storage: 15,
        GPU: 13,
        PSU: 18,
        Cases: 19,
        Cooling: 21,
    },
    'High-End PC': {
        CPU: 2,
        Motherboard: 5,
        RAM: 10,
        Storage: 3,
        GPU: 1,
        PSU: 6,
        Cases: 20,
        Cooling: 22,
    },
};

const Builds = () => {
    const { addToCart, setIsCartOpen } = useCart();
    const [selectedBuildType, setSelectedBuildType] = useState('Custom PC');

    const buildPresetToSelections = (type) => {
        const preset = PRESET_BUILD_SELECTIONS[type] || {};
        return Object.fromEntries(
            BUILDER_CATEGORIES.map((category) => {
                const productId = preset[category];
                const product = products.find((p) => p.id === productId) || null;
                return [category, product];
            })
        );
    };

    const [selections, setSelections] = useState(buildPresetToSelections('Custom PC'));

    /**
     * ստեղծվումա մի անգամ մանոտիռվնիի վախտ; BUILDER_CATEGORIES ից ամեն կատեգորիայի համար
     * պահպանվումա products ից ապրանքների զանգվածում ամեն մեկը իրա կատեգորիայի տակ.
     */
    const productsByCategory = useMemo(() => {
        const map = {};
        BUILDER_CATEGORIES.forEach((cat) => {
            map[cat] = products.filter((p) => p.category === cat);
        });
        return map;
    }, []);

    /** գրումա ընտրած ապրանքը կատեգորիայի տակ */

    const selectProduct = (category, product) => {
        setSelections((prev) => ({ ...prev, [category]: product }));
    };

    /** քցումա ընտրածները սաղ ու տալիսա էլի null*/
    const clearSelection = (category) => {
        setSelections((prev) => ({ ...prev, [category]: null }));
    };

    /**
     * ընտրած կոմպոնենտների ցուցակնա զանգվածի տեսքով
     * իրա մեջ մենակ են կատեգորիաներն են որ ապրաքնը ընտրած չի (selections[cat] != null).
     * հերթականությունը նույննա ինչ որ BUILDER_CATEGORIES ինը
     * ու քցումա cart
     */
    const selectedList = useMemo(() => {
        return BUILDER_CATEGORIES.filter((cat) => selections[cat] != null).map(
            (cat) => ({ category: cat, product: selections[cat] })
        );
    }, [selections]);

    /**
     * կողից selectedList ի մեջ գրումա ընդհանուր փողը
     * ու նորիցա հաշվում ամեն փոփոխության վախտ
     */
    const total = useMemo(() => {
        return selectedList.reduce((sum, { product }) => sum + product.price, 0);
    }, [selectedList]);

    /** եթե կա գոնը 1 հատ ընտրած ապրանք էդ վախտ նոր "Add Build To Cart" Կնոպկեն դառնումա ակտիվ */
    const hasAnySelection = selectedList.length > 0;

    /**
     * button ի աբռաբոտչիկնա
     * հերթայանությամբ սաղ ընտրածները քցումա cart  addToCart ով,
     * toast նամակա գալի եթե սաղ նորմալ ընգելա cart
     */
    const handleAddBuildToCart = () => {
        selectedList.forEach(({ product }) => addToCart(product));
        toast.success('Build added to cart', toastStyle);
        setIsCartOpen(true);
    };

    return (
        <div className="pb-20 pt-24">
            <div className="container mx-auto px-5">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        PC <span className="text-gradient">Builder</span>
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Choose one component per category. Add your build to cart when ready.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-72 flex-shrink-0">
                        <div className="glass-panel rounded-xl p-6 sticky top-24">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold">Build Type</h3>
                                <p className="text-text-secondary text-sm">Choose a preset style</p>
                            </div>
                            <div className="space-y-2">
                                {BUILD_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => {
                                            setSelectedBuildType(type);
                                            setSelections(buildPresetToSelections(type));
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                                            selectedBuildType === type
                                                ? 'bg-accent-purple/20 border-accent-purple text-accent-purple'
                                                : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:text-text-primary'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1 space-y-6">
                        {BUILDER_CATEGORIES.map((category) => {
                            const items = productsByCategory[category] || [];
                            const selected = selections[category];
                            return (
                                <motion.section
                                    key={category}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-panel rounded-2xl p-8"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">
                                            {category}
                                        </h2>
                                        {selected && (
                                            <button
                                                type="button"
                                                onClick={() => clearSelection(category)}
                                                className="text-base text-text-secondary hover:text-accent-blue transition-colors flex items-center gap-2"
                                            >
                                                <X size={14} /> Clear
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {items.map((product) => {
                                            const isSelected =
                                                selected?.id === product.id;
                                            return (
                                                <button
                                                    key={product.id}
                                                    type="button"
                                                    onClick={() =>
                                                        selectProduct(
                                                            category,
                                                            product
                                                        )
                                                    }
                                                    className={`text-left flex items-center gap-4 px-6 py-4 rounded-xl border transition-all duration-200 ${
                                                        isSelected
                                                            ? 'border-accent-blue bg-accent-blue/10 dark:text-white text-text-primary'
                                                            : 'border-white/10 bg-white/5 hover:border-white/20 text-text-secondary hover:text-text-primary'
                                                    }`}
                                                >
                                                    <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-bg-secondary overflow-hidden flex items-center justify-center">
                                                        <img
                                                            src={`/${product.image}`}
                                                            alt={product.name}
                                                            className="max-w-[80%] max-h-[80%] object-contain"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className="block font-medium text-base truncate max-w-[220px]">
                                                            {product.name}
                                                        </span>
                                                        <span className="text-gradient font-semibold text-base">
                                                            ${product.price}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.section>
                            );
                        })}
                    </div>

                    <div className="lg:w-96 flex-shrink-0">
                        <div className="glass-panel rounded-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">
                                Your build
                            </h3>
                            {selectedList.length === 0 ? (
                                <p className="text-text-secondary text-sm">
                                    Select components from the list to see your build summary.
                                </p>
                            ) : (
                                <>
                                    <ul className="space-y-3 mb-6">
                                        {selectedList.map(({ category, product }) => (
                                            <li
                                                key={category}
                                                className="flex justify-between items-start gap-2 text-sm"
                                            >
                                                <div className="min-w-0">
                                                    <span className="text-text-secondary uppercase text-xs">
                                                        {category}
                                                    </span>
                                                    <p className="font-medium truncate">
                                                        {product.name}
                                                    </p>
                                                </div>
                                                <span className="text-gradient font-semibold flex-shrink-0">
                                                    ${product.price}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-white/10 pt-4 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">
                                                Total
                                            </span>
                                            <span className="text-xl font-bold text-gradient">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={handleAddBuildToCart}
                                        disabled={!hasAnySelection}
                                    >
                                        <ShoppingCart size={18} /> Add build to cart
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builds;
