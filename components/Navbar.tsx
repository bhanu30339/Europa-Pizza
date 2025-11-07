'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-[#4A1E1E] sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Left: Logo + Brand + Nav Links */}
          <div className="flex items-center space-x-10">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-extrabold text-white uppercase tracking-wide">
                EUROPA
              </span>
              <Image
                src="/assets/logo.png"
                alt="Europa Pizza Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-extrabold text-white uppercase tracking-wide">
                PIZZA
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-white text-[26px] font-medium hover:text-gray-300 transition"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-white text-[28px] font-medium hover:text-gray-300 transition"
              >
                Menu
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-white text-[28px] font-medium hover:text-gray-300 transition"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 bg-white text-[#8B2635] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Right Side: Phone + Order Now */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-white text-lg font-medium">
              <Phone className="h-5 w-5 mr-2 text-white" />
              1300 827 286
            </div>

            <Link
              href="/menu"
              className="bg-[#C13C3C] hover:bg-[#a63030] text-white px-5 py-2 text-[15px] font-semibold flex items-center gap-2 transition"
            >
              <span className="text-xl">»</span>
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
