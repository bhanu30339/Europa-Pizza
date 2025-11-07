'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { useCart } from '@/lib/cart-context';
import { Pizza } from '@/lib/supabase';
import { toast } from 'sonner';
import { Minus, Plus } from 'lucide-react';

function CheckoutForm({ formData, setFormData, errors, setErrors, validateForm, total, cart, clearCart, appliedCoupon }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setLoading(true);

    try {
      const orderItems = cart.map((item: any) => ({
        pizza_id: item.pizza.id,
        name: item.pizza.name,
        quantity: item.quantity,
        price: item.totalPrice / item.quantity,
        size: item.size,
        customizations: item.selectedToppings?.map((t: any) => ({
          topping_id: t.id,
          topping_name: t.name,
          topping_price: t.price,
        })) || [],
        removed_toppings: item.removedToppings || [],
        comments: item.comments || '',
      }));

      const deliveryFee = formData.shippingMethod === 'delivery' ? 5.00 : 0;
      const totalAmount = total;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_method: formData.shippingMethod,
          delivery_address: formData.shippingMethod === 'delivery'
            ? `${formData.streetName}, ${formData.suburb}, ${formData.pinCode}`
            : null,
          delivery_date: formData.deliveryDate,
          delivery_time: formData.deliveryTime,
          payment_method: formData.paymentMethod,
          coupon_code: appliedCoupon?.code || null,
          items: orderItems,
          total_amount: totalAmount,
          payment_status: 'pending',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to create order');
        setLoading(false);
        return;
      }

      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/order-success?order_id=${data.order.id}`);

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="delivery"
                    checked={formData.shippingMethod === 'delivery'}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                    className="w-4 h-4 text-[#8B2635]"
                  />
                  <span className="text-sm">Delivery $5.00 AUD</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="pickup"
                    checked={formData.shippingMethod === 'pickup'}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                    className="w-4 h-4 text-[#8B2635]"
                  />
                  <span className="text-sm">Pickup $0.00 AUD</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                />
                {errors.deliveryDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Time
                </label>
                <input
                  type="time"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  className={`w-full px-4 py-3 border ${errors.deliveryTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                />
                {errors.deliveryTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.deliveryTime}</p>
                )}
              </div>
            </div>

            {formData.shippingMethod === 'delivery' && (
              <div>
                <h3 className="font-semibold mb-4">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Name
                    </label>
                    <input
                      type="text"
                      value={formData.streetName}
                      onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.streetName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                      placeholder="Enter street name"
                    />
                    {errors.streetName && (
                      <p className="text-red-500 text-xs mt-1">{errors.streetName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Suburb
                    </label>
                    <input
                      type="text"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.suburb ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                      placeholder="Enter suburb"
                    />
                    {errors.suburb && (
                      <p className="text-red-500 text-xs mt-1">{errors.suburb}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className={`w-full px-4 py-3 border ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent rounded`}
                    placeholder="Enter pin code"
                  />
                  {errors.pinCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Payment</h2>
            <div className="bg-white border border-gray-200 p-6 rounded">
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-4 h-4 text-[#8B2635]"
                  />
                  <span className="text-sm">Credit / Debit Card (Pay on Delivery)</span>
                </label>
              </div>
              <p className="text-xs text-gray-500">Payment will be collected upon delivery.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Cart
              showCoupon={true}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={async () => {}}
              checkoutButtonText={loading ? 'Processing...' : 'Place Order'}
              onCheckout={() => {
                const form = document.querySelector('form');
                if (form) {
                  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, addToCart } = useCart();
  const [suggestedPizzas, setSuggestedPizzas] = useState<Pizza[]>([]);
  const [suggestedQuantities, setSuggestedQuantities] = useState<{[key: string]: number}>({});
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discount: number} | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    shippingMethod: 'delivery',
    deliveryDate: '',
    deliveryTime: '',
    streetName: '',
    suburb: '',
    pinCode: '',
    paymentMethod: 'card',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const deliveryFee = formData.shippingMethod === 'delivery' ? 5.00 : 0;
  const total = cartTotal + deliveryFee + 2.00 + 1.50 + 0.50 - (appliedCoupon?.discount || 0);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/menu');
    }
  }, [cart.length, router]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();

        if (data.pizzas) {
          const cartCategoryIds = cart.map((item: any) => item.pizza.category_id).filter(Boolean);
          const cartPizzaIds = new Set(cart.map((item: any) => item.pizza.id));

          let popularPizzas = data.pizzas.filter((p: Pizza) =>
            p.is_popular && p.is_available && !cartPizzaIds.has(p.id)
          );

          const sameCategoryPizzas = data.pizzas.filter((p: Pizza) =>
            cartCategoryIds.includes(p.category_id) &&
            p.is_available &&
            !cartPizzaIds.has(p.id) &&
            !p.is_popular
          );

          const otherPizzas = data.pizzas.filter((p: Pizza) =>
            !cartCategoryIds.includes(p.category_id) &&
            p.is_available &&
            !cartPizzaIds.has(p.id) &&
            !p.is_popular
          );

          const mixedSuggestions = [
            ...popularPizzas.slice(0, 2),
            ...sameCategoryPizzas.slice(0, 2),
            ...otherPizzas.slice(0, 2),
          ].slice(0, 6);

          setSuggestedPizzas(mixedSuggestions);

          const initialQuantities: {[key: string]: number} = {};
          mixedSuggestions.forEach(p => {
            initialQuantities[p.id] = 1;
          });
          setSuggestedQuantities(initialQuantities);
        }
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      }
    }

    if (cart.length > 0) {
      fetchSuggestions();
    }
  }, [cart]);

  const updateSuggestedQuantity = (pizzaId: string, delta: number) => {
    setSuggestedQuantities(prev => ({
      ...prev,
      [pizzaId]: Math.max(1, (prev[pizzaId] || 1) + delta)
    }));
  };

  const addSuggestedToCart = (pizza: Pizza) => {
    const quantity = suggestedQuantities[pizza.id] || 1;
    const defaultSize = pizza.sizes && pizza.sizes.length > 0 ? pizza.sizes[0].name : 'Medium';
    addToCart(pizza, defaultSize, quantity, [], [], '');
    toast.success(`Added ${pizza.name} to cart!`);
  };

  const handleApplyCoupon = async (code: string) => {
    try {
      const response = await fetch(`/api/coupons/validate?code=${code}&amount=${cartTotal}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Invalid coupon code');
        return;
      }

      setAppliedCoupon({
        code: data.code,
        discount: data.discount
      });
      toast.success('Coupon applied successfully!');
    } catch (error) {
      toast.error('Failed to apply coupon');
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    if (!formData.deliveryTime) newErrors.deliveryTime = 'Delivery time is required';

    if (formData.shippingMethod === 'delivery') {
      if (!formData.streetName.trim()) newErrors.streetName = 'Street name is required';
      if (!formData.suburb.trim()) newErrors.suburb = 'Suburb is required';
      if (!formData.pinCode.trim()) {
        newErrors.pinCode = 'Pin code is required';
      } else if (!/^\d{4,6}$/.test(formData.pinCode)) {
        newErrors.pinCode = 'Please enter a valid pin code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-light mb-8">Checkout</h1>

          {suggestedPizzas.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">People also ordered</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {suggestedPizzas.map((pizza) => (
                  <div key={pizza.id} className="border border-gray-200">
                    <div className="relative h-32">
                      <Image
                        src={pizza.image_url}
                        alt={pizza.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium mb-2 truncate">{pizza.name}</p>
                      <p className="text-[#8B2635] font-semibold mb-2">${pizza.base_price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateSuggestedQuantity(pizza.id, -1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 text-sm hover:bg-gray-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm">{suggestedQuantities[pizza.id] || 1}</span>
                        <button
                          onClick={() => updateSuggestedQuantity(pizza.id, 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 text-sm hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => addSuggestedToCart(pizza)}
                          className="flex-1 bg-[#8B2635] text-white text-xs py-1.5 rounded hover:bg-[#6d1e29]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            validateForm={validateForm}
            total={total}
            cart={cart}
            clearCart={clearCart}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
