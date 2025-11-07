'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cart } from './Cart';

export function CartSidebar() {
  const router = useRouter();

  return (
    <div className="bg-white border-l border-gray-200 w-full lg:w-96 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Cart
          onCheckout={() => router.push('/checkout')}
          checkoutButtonText="Checkout"
        />
      </div>
    </div>
  );
}
