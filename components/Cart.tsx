'use client';

import { useCart } from '@/lib/cart-context';
import { X, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CartProps {
  showCoupon?: boolean;
  onCheckout?: () => void;
  checkoutButtonText?: string;
  appliedCoupon?: { code: string; discount: number } | null;
  onApplyCoupon?: (code: string) => Promise<void>;
}

export function Cart({
  showCoupon = false,
  onCheckout,
  checkoutButtonText = 'Checkout',
  appliedCoupon = null,
  onApplyCoupon
}: CartProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const subtotal = cartTotal;
  const pickupFee = 2.00;
  const handlingFee = 1.50;
  const surcharge = 0.50;
  const discount = appliedCoupon?.discount || 0;
  const total = subtotal + pickupFee + handlingFee + surcharge - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    if (!onApplyCoupon) return;

    setApplyingCoupon(true);
    try {
      await onApplyCoupon(couponCode);
      setCouponCode('');
    } catch (error) {
      // Error handled in parent
    } finally {
      setApplyingCoupon(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded">
      <h3 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-200">Your Cart</h3>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{item.pizza.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                    {item.selectedToppings && item.selectedToppings.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Add-ons: {item.selectedToppings.map(t => t.name).join(', ')}
                      </p>
                    )}
                    {item.removedToppings && item.removedToppings.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Removed: {item.removedToppings.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    ${item.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {showCoupon && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  disabled={!!appliedCoupon}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !!appliedCoupon}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {appliedCoupon && (
                <p className="text-xs text-green-600 mt-1">
                  Coupon "{appliedCoupon.code}" applied! -${appliedCoupon.discount.toFixed(2)}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pickup Fee</span>
              <span className="text-gray-800">${pickupFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Handling Fee</span>
              <span className="text-gray-800">${handlingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Surcharge</span>
              <span className="text-gray-800">${surcharge.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
              <span className="text-gray-800">Total</span>
              <span className="text-[#8B2635]">${total.toFixed(2)}</span>
            </div>
          </div>

          {onCheckout && (
            <button
              onClick={onCheckout}
              className="w-full bg-[#8B2635] text-white py-3 rounded hover:bg-[#6d1e29] transition-colors font-medium"
            >
              {checkoutButtonText}
            </button>
          )}
        </>
      )}
    </div>
  );
}
