'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-20 flex flex-col items-center justify-center text-center font-['Playfair_Display']">
          <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
          <h2 className="text-4xl font-light text-gray-900 mb-3">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6 text-lg">Add some delicious pizzas to get started!</p>
          <button
            onClick={() => router.push('/menu')}
            className="bg-[#8B2635] text-white px-8 py-3 text-lg font-medium hover:bg-[#6d1e29] transition"
          >
            Browse Menu
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-14 pb-12 bg-white font-['Instrument_Serif']">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-light mb-2 font-['Instrument_Serif']">Checkout</h1>
        </div>
      </section>

      {/* Checkout Body */}
      <section className="bg-white pb-20">
        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - People also ordered + Form */}
          <div className="lg:col-span-2">
            {/* People also ordered */}
            <div className="mb-12">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                People also ordered
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="relative w-full h-28 mb-2">
                      <Image
                        src="/assets/garlicbread.jpg"
                        alt="Garlic Bread"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <p className="text-sm text-gray-700">Garlic Bread</p>
                    <p className="text-[#8B2635] font-medium text-sm">$12.3</p>
                    <div className="flex justify-center items-center gap-2 mt-2">
                      <button className="border border-gray-300 px-2 py-0.5 hover:bg-gray-100">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm">1</span>
                      <button className="border border-gray-300 px-2 py-0.5 hover:bg-gray-100">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button className="mt-2 text-[#8B2635] text-sm font-semibold hover:underline">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Details Form */}
            <form className="space-y-10 text-gray-800">
              {/* Personal Details */}
              <div>
                <h3 className="text-base font-semibold mb-3">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635] focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 p-3 w-full mt-4 focus:ring-1 focus:ring-[#8B2635] focus:outline-none"
                />
              </div>

              {/* Delivery Details */}
              <div>
                <h3 className="text-base font-semibold mb-3">Delivery Details</h3>
                <div className="flex flex-wrap gap-6 mb-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="shipping" defaultChecked className="accent-[#8B2635]" />
                    Delivery $5.00 AUD
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="shipping" className="accent-[#8B2635]" />
                    Pickup $0.00 AUD
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635]"
                  />
                  <input
                    type="time"
                    className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-base font-semibold mb-3">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Street Name"
                    className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635]"
                  />
                  <input
                    type="text"
                    placeholder="Suburb"
                    className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pin Code"
                  className="border border-gray-300 p-3 w-full focus:ring-1 focus:ring-[#8B2635]"
                />
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-base font-semibold mb-3">Payment</h3>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="payment" defaultChecked className="accent-[#8B2635]" />
                  Credit / Debit Card
                </label>
              </div>
            </form>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold border-b border-[#8B2635] pb-2 mb-4">
                Cart
              </h2>

              {cart.map((item) => (
                <div key={item.id} className="mb-6">
                  <p className="font-semibold">{item.pizza.name}</p>
                  <p className="text-sm text-gray-700 mb-2">{item.size}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="border border-gray-300 px-2 py-0.5 hover:bg-gray-100"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="border border-gray-300 px-2 py-0.5 hover:bg-gray-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {item.selectedToppings?.map((t, i) => (
                      <li key={i}>{t.name}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-gray-300 my-4"></div>

              <div className="flex items-center justify-between text-sm mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-300 p-2 mr-2 focus:ring-1 focus:ring-[#8B2635]"
                />
                <button className="text-[#8B2635] font-semibold hover:underline">Apply</button>
              </div>

              <div className="text-sm space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Card Surcharge</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-2 mb-4 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#8B2635]">${cartTotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-[#8B2635] text-white py-3 font-medium hover:bg-[#6d1e29] transition">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
