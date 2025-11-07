'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/lib/cart-context';
import { Pizza, Category } from '@/lib/supabase';
import { Search, ChevronDown, Minus, Plus, Leaf } from 'lucide-react';
import { toast } from 'sonner';

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const [menuRes, catRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/categories'),
        ]);
        const menuData = await menuRes.json();
        const catData = await catRes.json();

        const fetchedPizzas = menuData.pizzas || [];
        const fetchedCategories = catData.categories || [];

        setPizzas(fetchedPizzas);
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          setActiveCategory(fetchedCategories[0].id);
        }

        const initialQuantities: { [key: string]: number } = {};
        const initialSizes: { [key: string]: string } = {};
        fetchedPizzas.forEach((pizza: Pizza) => {
          initialQuantities[pizza.id] = 1;
          initialSizes[pizza.id] = pizza.sizes?.[0]?.name || 'Small';
        });
        setQuantities(initialQuantities);
        setSelectedSizes(initialSizes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  const filteredPizzas = pizzas
    .filter((pizza) => {
      if (activeCategory && pizza.category_id !== activeCategory) return false;
      if (vegOnly && !pizza.is_vegetarian) return false;
      if (searchQuery && !pizza.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.base_price - b.base_price;
      if (sortBy === 'price-high') return b.base_price - a.base_price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const updateQuantity = (pizzaId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [pizzaId]: Math.max(1, (prev[pizzaId] || 1) + delta),
    }));
  };

  const updateSize = (pizzaId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [pizzaId]: size,
    }));
  };

  const handleAddToCart = (pizza: Pizza) => {
    const size = selectedSizes[pizza.id] || 'Small';
    const quantity = quantities[pizza.id] || 1;
    addToCart(pizza, size, quantity, [], []);
    toast.success(`Added ${pizza.name} to cart!`);
  };

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen pt-28 pb-20 font-['Playfair_Display']">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col lg:flex-row gap-10">
          {/* Left Content */}
          <div className="flex-1">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 mb-10">
              {/* Left: Heading */}
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-3 leading-tight">
                  Our <span className="text-[#8B2635] italic font-semibold">Menu</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Crafted with passion, enjoyed in every bite. Taste the difference!
                </p>
              </div>

              {/* Right: Search + Veg + Sort */}
              <div className="flex flex-col items-end gap-3">
                <div className="relative w-full max-w-[400px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8B2635]" />
                  <input
                    type="text"
                    placeholder="Search Products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-black py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 w-full max-w-[400px]">
                  <label className="flex items-center gap-2 text-gray-800 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={vegOnly}
                      onChange={() => setVegOnly(!vegOnly)}
                      className="accent-[#8B2635] h-4 w-4"
                    />
                    Veg Only
                  </label>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-black py-2 px-3 text-sm focus:outline-none"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Sort: A–Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-6 border-b border-gray-300 mb-8 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative pb-2 text-sm font-semibold whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'text-black'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B2635]" />
                  )}
                </button>
              ))}
            </div>

            {/* Pizza Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPizzas.map((pizza) => {
                const selectedSize = selectedSizes[pizza.id] || 'Small';
                const sizeObj = pizza.sizes.find((s) => s.name === selectedSize);
                const sizePrice = sizeObj ? sizeObj.price : 0;
                const totalPrice = pizza.base_price + sizePrice;

                return (
                  <div
                    key={pizza.id}
                    className="bg-white border border-gray-200 p-5 hover:shadow-md transition"
                  >
                    <div className="relative h-56 mb-4">
                      <Image
                        src={pizza.image_url}
                        alt={pizza.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {pizza.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pizza.description}</p>

                    <p className="text-[#8B2635] font-semibold mb-4">
                      ${totalPrice.toFixed(2)}
                    </p>

                    <div className="mb-3">
                      <select
                        value={selectedSize}
                        onChange={(e) => updateSize(pizza.id, e.target.value)}
                        className="w-full border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
                      >
                        {pizza.sizes.map((size) => (
                          <option key={size.name} value={size.name}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(pizza.id, -1)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-gray-800">
                          {quantities[pizza.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(pizza.id, 1)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(pizza)}
                        className="bg-[#8B2635] text-white px-5 py-2 font-semibold hover:bg-[#6d1e29] transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="hidden lg:block w-[350px] sticky top-24 h-fit border-l border-gray-200 pl-8">
            <CartSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
