'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { Minus, Plus, Trash2 } from 'lucide-react';

type PizzaSize = { name: string; price: number };
type Pizza = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  base_price: number;
  sizes: PizzaSize[];
  is_vegetarian?: boolean;
};

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  // ------- fetch “People also ordered” -------
  const [suggestions, setSuggestions] = useState<Pizza[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        const all: Pizza[] = data?.pizzas ?? [];
        setSuggestions(all.slice(0, 6));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // ------- delivery/pickup + fees -------
  const [method, setMethod] = useState<'delivery' | 'pickup'>('delivery');
  const deliveryFee = 5.0;
  const pickupFee = 0.0;
  const handlingFee = 1.5;
  const cardSurcharge = 5.5;

  // ------- coupon (simple local demo) -------
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<'idle' | 'applied' | 'invalid'>('idle');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    // Demo: CHEESE20 gives $2.00 off
    if (coupon.trim().toUpperCase() === 'CHEESE20') {
      setDiscount(2.0);
      setCouponMsg('applied');
    } else {
      setDiscount(0);
      setCouponMsg('invalid');
    }
  };

  const subTotal = cartTotal;
  const shipFee = method === 'delivery' ? deliveryFee : pickupFee;

  const grandTotal = useMemo(() => {
    const raw = subTotal + shipFee + handlingFee + cardSurcharge - discount;
    return raw < 0 ? 0 : raw;
  }, [subTotal, shipFee, discount]);

  // ------- simple controlled form fields (no submit wiring) -------
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    instructions: '',
    street: '',
    suburb: '',
    streetNo: '',
    suburb2: '',
    payment: 'card', // radio
  });

  const setField =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen pt-12 pb-16">
        <div className="container mx-auto max-w-6xl px-5">
          {/* Heading */}
          <h1 className="text-[64px] font-normal font-['Instrument_Serif'] text-[#2E2E2E] mb-6">
            Checkout
          </h1>

          {/* People also ordered */}
          <section className="mb-8">
            <h3 className="text-[18px] font-semibold text-[#2E2E2E] mb-3 font-['Inter']">
              People also Ordered
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {suggestions.map((p) => (
                <div key={p.id} className="font-Sans">
                  <div className="relative aspect-[1/1] w-full border border-[#e8e8e8]">
                    <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                  </div>
                  <p className="mt-2 text-[14px] font-Sans text-[#2E2E2E] line-clamp-2">{p.name}</p>
                  <p className="text-[14px] text-[#B83439]">${p.base_price.toFixed(2)}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <button className="h-7 w-7 border text-sm grid place-items-center">-</button>
                    <span className="text-sm">1</span>
                    <button className="h-7 w-7 border text-sm grid place-items-center">+</button>
                    <button className="ml-auto px-3 h-7 border text-sm">Add</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Two columns: left form / right cart */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* LEFT FORM */}
            <div className="font-['Inter'] text-[#2E2E2E]">
              {/* Personal Details */}
              <h4 className="text-[22px] font-semibold mb-3">Personal Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs block mb-2">Full Name</label>
                  <input
                    value={form.fullName}
                    onChange={setField('fullName')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-2">Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={setField('phone')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs block mb-2">Email</label>
                  <input
                    value={form.email}
                    onChange={setField('email')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
              </div>

              {/* Delivery Details */}
              <h4 className="text-[18px] font-semibold mt-6 mb-3">Delivery Details</h4>

              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="ship"
                    checked={method === 'delivery'}
                    onChange={() => setMethod('delivery')}
                  />
                  Delivery <span className="text-xs text-[#777]">( ${deliveryFee.toFixed(2)} )</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="ship"
                    checked={method === 'pickup'}
                    onChange={() => setMethod('pickup')}
                  />
                  Pickup <span className="text-xs text-[#777]">( ${pickupFee.toFixed(2)} )</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs block mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={setField('date')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-2">Delivery Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={setField('time')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs block mb-2">Delivery Instructions</label>
                <textarea
                  rows={3}
                  value={form.instructions}
                  onChange={setField('instructions')}
                  className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  placeholder="Please enter any delivery instructions"
                />
              </div>

              {/* Address */}
              <h4 className="text-[18px] font-semibold mb-3">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs block mb-2">Street Name</label>
                  <input
                    value={form.street}
                    onChange={setField('street')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-2">Suburb</label>
                  <input
                    value={form.suburb}
                    onChange={setField('suburb')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-2">Street Number</label>
                  <input
                    value={form.streetNo}
                    onChange={setField('streetNo')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-2">Suburb</label>
                  <input
                    value={form.suburb2}
                    onChange={setField('suburb2')}
                    className="w-full border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                </div>
              </div>

              {/* Payment */}
              <h4 className="text-[18px] font-semibold mb-3">Payment Method</h4>
              <div className="border-t border-[#dfc8c8] pt-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="pay"
                    checked={form.payment === 'card'}
                    onChange={() => setForm((s) => ({ ...s, payment: 'card' }))}
                  />
                  Credit / Debit Card
                </label>
              </div>
            </div>

            {/* RIGHT CART */}
            <aside className="font-['Inter'] text-[#2E2E2E]">
              <div className="border-t-4 border-[#dfc8c8] pt-2 mb-3">
                <h4 className="text-[28px] font-['Instrument_Serif']">Cart</h4>
              </div>

              {/* Items */}
              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{item.pizza.name}</span>
                      <div className="flex items-center gap-1">
                        <button
                          className="h-6 w-6 border grid place-items-center"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="h-6 w-6 border grid place-items-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Toppings / Adds (if your cart item has these arrays) */}
                    {item.selectedToppings?.length > 0 && (
                      <div className="text-xs text-[#666] ml-1">
                        <p className="leading-5">Toppings</p>
                        <ul className="list-disc ml-4">
                          {item.selectedToppings.map((t: any) => (
                            <li key={t.name}>{t.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-[#B83439]">
                        ${(item.totalPrice ?? 0).toFixed(2)}
                      </span>
                      <button
                        className="text-[#B83439] hover:underline flex items-center gap-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>

                    <div className="h-px bg-[#e9e9e9] mt-3" />
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mt-4">
                <div className="flex">
                  <input
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border border-[#dadada] px-3 py-2 outline-none focus:ring-1 focus:ring-[#B83439]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="ml-2 px-4 py-2 border border-[#B83439] text-[#B83439] hover:bg-[#B83439] hover:text-white transition"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg === 'applied' && (
                  <p className="text-xs text-green-600 mt-2">Applied Successfully!</p>
                )}
                {couponMsg === 'invalid' && (
                  <p className="text-xs text-red-600 mt-2">Invalid coupon.</p>
                )}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{method === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                  <span>${shipFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Fee</span>
                  <span>${handlingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Card Surcharge</span>
                  <span>${cardSurcharge.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#B83439]">
                    <span>Coupon</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="h-px bg-[#e9e9e9] my-2" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-[#B83439] hover:bg-[#6d1e29] text-white py-3 text-sm font-semibold">
                Pay Now
              </button>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
