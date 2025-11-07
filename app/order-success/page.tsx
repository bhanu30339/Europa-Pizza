'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams?.get('order_id');
    const paymentIntent = searchParams?.get('payment_intent');

    if (!orderId) {
      toast.error('No order found');
      router.push('/');
      return;
    }

    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();

        if (response.ok && data.order) {
          setOrder(data.order);

          if (paymentIntent) {
            await fetch(`/api/orders/${orderId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                payment_status: 'paid',
                stripe_payment_intent_id: paymentIntent,
              }),
            });
          }
        } else {
          toast.error('Order not found');
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [searchParams, router]);

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

  if (!order) {
    return null;
  }

  const pickupTime = order.pickup_time
    ? new Date(order.pickup_time).toLocaleString('en-AU', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600">
                Thank you for your order. We have sent a confirmation to your email and SMS.
              </p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Number</h3>
                  <p className="text-2xl font-bold text-[#8B2635]">
                    {order.order_number}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Pickup/Delivery OTP
                  </h3>
                  <p className="text-2xl font-bold text-[#8B2635] tracking-wider">
                    {order.otp}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Show this OTP when collecting your order
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {order.shipping_method === 'delivery' ? 'Delivery' : 'Pickup'} Time
                  </p>
                  <p className="text-gray-900">{pickupTime}</p>
                </div>
              </div>

              {order.delivery_address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Delivery Address</p>
                    <p className="text-gray-900">{order.delivery_address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Contact Number</p>
                  <p className="text-gray-900">{order.customer_phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Email</p>
                  <p className="text-gray-900">{order.customer_email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                {order.items && order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.quantity}x {item.name}
                        {item.size && <span className="text-sm text-gray-500"> ({item.size})</span>}
                      </p>
                      {item.customizations && item.customizations.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          + {item.customizations.map((c: any) => c.topping_name).join(', ')}
                        </p>
                      )}
                      {item.comments && (
                        <p className="text-xs text-gray-500 italic mt-1">
                          Note: {item.comments}
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">Total</p>
                  <p className="text-2xl font-bold text-[#8B2635]">
                    ${order.total_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Please save your OTP <strong>{order.otp}</strong>.
                You will need to provide this when collecting your order. A confirmation has been
                sent to your email and SMS.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push('/menu')}
                className="flex-1 bg-[#8B2635] text-white py-3 rounded hover:bg-[#6d1e29] transition-colors font-medium"
              >
                Order More
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded hover:bg-gray-300 transition-colors font-medium"
              >
                Print Receipt
              </button>
            </div>
          </div>

          <div className="text-center text-gray-600">
            <p>
              Need help? Contact us at{' '}
              <a href="tel:1234567890" className="text-[#8B2635] hover:underline">
                123-456-7890
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
