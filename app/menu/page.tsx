'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/lib/cart-context';
import { Pizza, Category } from '@/lib/supabase';
import { Search, ChevronDown, Minus, Plus } from 'lucide-react';
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
        console.log('Fetching menu data...');
        const [menuRes, catRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/categories'),
        ]);

        console.log('Menu response status:', menuRes.status);
        console.log('Categories response status:', catRes.status);

        const menuData = await menuRes.json();
        const catData = await catRes.json();

        console.log('Menu data:', menuData);
        console.log('Categories data:', catData);

        const fetchedPizzas = menuData.pizzas || [];
        const fetchedCategories = catData.categories || [];

        console.log('Fetched pizzas count:', fetchedPizzas.length);
        console.log('Fetched categories count:', fetchedCategories.length);

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
        toast.error('Failed to load menu data');
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

  const FilterControls = (
    <div className="flex flex-col items-end gap-3 w-full font-['Inter']">
      <div className="relative w-full max-w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B83439]" />
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-[#2E2E2E] py-2 pl-10 pr-4 text-sm text-[#2E2E2E] focus:outline-none focus:ring-1 focus:ring-[#B83439]"
        />
      </div>

      <div className="flex items-center justify-end gap-4 w-full max-w-[400px]">
        <label className="flex items-center gap-2 text-[#2E2E2E] text-sm font-semibold">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={() => setVegOnly(!vegOnly)}
            className="accent-[#B83439] h-4 w-4"
          />
          Veg Only
        </label>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-[#2E2E2E] py-2 pl-3 pr-8 text-sm text-[#2E2E2E] focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Sort: A–Z</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen pt-12 pb-20 font-['Instrument_Serif']">
        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
          {/* LEFT SIDE */}
          <div>
            {/* Heading */}
            <div className="mb-10">
              <h1 className="text-[56px] font-['Instrument_Serif'] text-[#2E2E2E] text-left leading-[1.1]">
                Our <span className="text-[#b83439] font-Sans">Menu</span>
              </h1>
              <p className="text-left text-[#2E2E2E] text-[18px] font-['Inter'] mt-3">
                Crafted with passion, enjoyed in every<br></br> bite. Taste the difference!
              </p>
            </div>

            {/* Filters for Mobile */}
            <div className="lg:hidden mb-8">{FilterControls}</div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-[#2E2E2E]/30 mb-10 overflow-x-auto font-['Inter']">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative pb-2 text-[15px] font-semibold whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'text-[#2E2E2E]'
                      : 'text-[#555] hover:text-[#2E2E2E]'
                  }`}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B83439]" />
                  )}
                </button>
              ))}
            </div>

            {/* Pizza Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPizzas.map((pizza) => {
                const selectedSize = selectedSizes[pizza.id] || 'Small';
                const sizeObj = pizza.sizes.find((s) => s.name === selectedSize);
                const sizePrice = sizeObj ? sizeObj.price : 0;
                const totalPrice = pizza.base_price + sizePrice;

                return (
                  <div
                    key={pizza.id}
                    className="bg-white border border-[#e8e8e8] p-6 hover:shadow-md transition font-['Inter']"
                  >
                    <div className="relative h-56 mb-4">
                      <Image
                        src={pizza.image_url}
                        alt={pizza.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <h3 className="text-[22px] font-['Instrument_Serif'] text-[#121214] mb-1">
                      {pizza.name}
                    </h3>
                    <p className="text-[#444] text-[14px] mb-2 line-clamp-2 leading-snug">
                      {pizza.description}
                    </p>

                    <p className="text-[#B83439] text-[14px] font-bold mb-4">
                      ${totalPrice.toFixed(2)}
                    </p>

                    <div className="mb-3">
                      <select
                        value={selectedSize}
                        onChange={(e) => updateSize(pizza.id, e.target.value)}
                        className="w-full border border-[#ccc] py-2 px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#B83439]"
                      >
                        {pizza.sizes.map((size) => (
                          <option key={size.name} value={size.name}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#ccc]">
                        <button
                          onClick={() => updateQuantity(pizza.id, -1)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-[#2E2E2E]">
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
                        className="text-[14px] font-medium text-white bg-[#B83439] px-6 py-2 hover:bg-[#6d1e29] transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN - Floating cart section */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="flex flex-col gap-6">
                {/* Filters - Fixed at top */}
                <div className="bg-white z-10">
                  {FilterControls}
                </div>
                
                {/* Cart - Floats with screen */}
                <div className="sticky top-40">
                  <CartSidebar />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}