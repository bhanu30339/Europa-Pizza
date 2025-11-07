'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { useCart } from '@/lib/cart-context';
import { Pizza, Topping } from '@/lib/supabase';
import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export default function CustomizePizzaPage({ params }: { params: { id: string } }) {
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [allToppings, setAllToppings] = useState<Topping[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [quantity, setQuantity] = useState(1);
  const [selectedDefaultToppings, setSelectedDefaultToppings] = useState<Set<string>>(new Set());
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Cheeses', 'Veggies', 'Proteins']));
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const menuRes = await fetch('/api/menu');
        const menuData = await menuRes.json();

        const foundPizza = menuData.pizzas?.find((p: Pizza) => p.id === params.id);

        if (foundPizza) {
          setPizza(foundPizza);
          setSelectedSize(foundPizza.sizes?.[0]?.name || 'Medium');

          if (foundPizza.pizza_toppings && foundPizza.pizza_toppings.length > 0) {
            const defaultIds = new Set<string>(
              foundPizza.pizza_toppings
                .filter((pt: any) => pt.is_default)
                .map((pt: any) => pt.topping_id)
            );
            setSelectedDefaultToppings(defaultIds);
          }
        } else {
          toast.error('Pizza not found');
          router.push('/menu');
          return;
        }

        if (menuData.toppings) {
          setAllToppings(menuData.toppings);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load pizza details');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id, router]);

  const toggleDefaultTopping = (toppingId: string) => {
    const newSelected = new Set(selectedDefaultToppings);
    if (newSelected.has(toppingId)) {
      newSelected.delete(toppingId);
    } else {
      newSelected.add(toppingId);
    }
    setSelectedDefaultToppings(newSelected);
  };

  const toggleAddon = (toppingId: string) => {
    const newSelected = new Set(selectedAddons);
    if (newSelected.has(toppingId)) {
      newSelected.delete(toppingId);
    } else {
      newSelected.add(toppingId);
    }
    setSelectedAddons(newSelected);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const calculateTotal = () => {
    if (!pizza) return 0;

    const sizeObj = pizza.sizes.find(s => s.name === selectedSize);
    const sizePrice = sizeObj ? sizeObj.price : 0;

    const addonToppings = allToppings.filter(t => selectedAddons.has(t.id));
    const addonsTotal = addonToppings.reduce((sum, t) => sum + t.price, 0);

    return (pizza.base_price + sizePrice + addonsTotal) * quantity;
  };

  const getSelectedToppings = () => {
    const defaultToppings = allToppings.filter(t => selectedDefaultToppings.has(t.id));
    const addonToppings = allToppings.filter(t => selectedAddons.has(t.id));
    return [...defaultToppings, ...addonToppings];
  };

  const handleAddToCart = () => {
    if (!pizza) return;

    const allSelectedToppings = getSelectedToppings();
    const removedToppingIds = pizza.pizza_toppings
      ?.filter((pt: any) => pt.is_default && !selectedDefaultToppings.has(pt.topping_id))
      .map((pt: any) => pt.topping_id) || [];

    addToCart(pizza, selectedSize, quantity, allSelectedToppings, removedToppingIds, comments);
    toast.success('Added to cart!');
  };

  const toppingsByCategory = allToppings.reduce((acc, topping) => {
    if (!acc[topping.category]) {
      acc[topping.category] = [];
    }
    acc[topping.category].push(topping);
    return acc;
  }, {} as { [key: string]: Topping[] });

  const defaultToppings = pizza?.pizza_toppings || [];
  const defaultToppingObjects = allToppings.filter(t =>
    defaultToppings.some((dt: any) => dt.topping_id === t.id && dt.is_default)
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B2635]"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!pizza) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-light mb-2">
              Customize <span className="text-[#8B2635] italic font-serif">Pizza</span>
            </h1>
            <p className="text-gray-600">
              Crafted with passion, enjoyed in every bite. Taste the difference!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="relative h-80 bg-white border border-gray-200 rounded">
                    <Image
                      src={pizza.image_url}
                      alt={pizza.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-serif mb-3">{pizza.name}</h2>
                  <p className="text-gray-600 text-sm mb-4">{pizza.description}</p>

                  <div className="mb-4">
                    <p className="text-3xl font-bold text-[#8B2635] mb-4">
                      ${pizza.base_price.toFixed(0)}
                    </p>
                  </div>

                  {defaultToppingObjects.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">Default Toppings</h3>
                      <p className="text-xs text-gray-500 mb-3">Uncheck the box to remove option.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {defaultToppingObjects.map((topping) => (
                          <label
                            key={topping.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedDefaultToppings.has(topping.id)}
                              onChange={() => toggleDefaultTopping(topping.id)}
                              className="w-4 h-4 text-[#8B2635] border-gray-300 focus:ring-[#8B2635] rounded"
                            />
                            <span className="text-sm text-gray-700">{topping.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Size
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded"
                    >
                      {pizza.sizes.map((size) => (
                        <option key={size.name} value={size.name}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-50 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-50 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-[#8B2635] text-white py-2 rounded hover:bg-[#6d1e29] transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-light mb-6">
                  Select <span className="text-[#8B2635] italic font-serif">Add ons</span>
                </h3>

                <div className="space-y-2">
                  {Object.keys(toppingsByCategory).sort().map((category) => (
                    <div key={category} className="border border-gray-200 rounded">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full px-6 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors rounded-t"
                      >
                        <span className="font-semibold text-gray-900">{category}</span>
                        {expandedCategories.has(category) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>

                      {expandedCategories.has(category) && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200 rounded-b">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {toppingsByCategory[category].map((topping) => {
                              const isDefault = selectedDefaultToppings.has(topping.id);
                              if (isDefault) return null;

                              return (
                                <label
                                  key={topping.id}
                                  className="flex items-start gap-2 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedAddons.has(topping.id)}
                                    onChange={() => toggleAddon(topping.id)}
                                    className="mt-0.5 w-4 h-4 text-[#8B2635] border-gray-300 focus:ring-[#8B2635] rounded"
                                  />
                                  <span className="text-sm text-gray-700">{topping.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Add comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add comments"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded"
                />
              </div>

              <div>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#8B2635] text-white px-8 py-3 rounded hover:bg-[#6d1e29] transition-colors font-medium inline-flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Cart
                  onCheckout={() => router.push('/checkout')}
                  checkoutButtonText="Checkout"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
