'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle, Clock, Mail } from 'lucide-react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/menu');
      return;
    }

    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setOrder(data.order);
          setItems(data.items || []);
        } else {
          router.push('/menu');
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
        router.push('/menu');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <>
      <Navbar />

      <section className="py-12">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your order, {order.customer_name}
            </p>
          </div>

          <div className="card-custom p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-xl font-bold">{order.order_number}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Pickup Time</p>
                <p className="text-xl font-bold flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {new Date(order.pickup_time).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6 text-center mb-6">
              <p className="text-sm text-gray-700 mb-2">Your Pickup OTP</p>
              <p className="text-5xl font-bold text-red-600 tracking-wider">{order.otp}</p>
              <p className="text-sm text-gray-600 mt-2">
                Please share this OTP when collecting your order
              </p>
            </div>

            <div className="flex items-start space-x-2 text-gray-600 mb-6">
              <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
              <p className="text-sm">
                A confirmation email with your order details and OTP has been sent to{' '}
                <span className="font-semibold">{order.customer_email}</span>
              </p>
            </div>
          </div>

          <div className="card-custom p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>

            <div className="space-y-4">
              {items.map((item: any) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.pizzas.image_url}
                      alt={item.pizzas.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{item.pizzas.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    {item.customizations && item.customizations.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Toppings: {item.customizations.map((c: any) => c.topping_name).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  ${order.total_amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => router.push('/menu')} className="btn-primary">
              Order More Pizzas
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
