'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Pizza,
  Package,
  DollarSign,
  Clock,
  LogOut,
  Bell,
  Check,
  X,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState('today');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });
  const [otpVerification, setOtpVerification] = useState<{ orderId: string; otp: string } | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastOrderCount, setLastOrderCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/bell.mp3');
    }

    fetchOrders();
    const interval = setInterval(() => {
      checkNewOrders();
    }, 15000);

    return () => clearInterval(interval);
  }, [filter, router]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/admin/orders?filter=${filter}`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
        calculateStats(data.orders || []);
        setLastOrderCount((data.orders || []).filter((o: any) => !o.is_acknowledged).length);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkNewOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders?new=true', {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        const newOrders = data.orders || [];

        if (newOrders.length > lastOrderCount) {
          playNotificationSound();
          showBrowserNotification();
          toast.success('New order received!', { duration: 5000 });
        }

        setLastOrderCount(newOrders.length);
      }
    } catch (error) {
      console.error('Failed to check new orders:', error);
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error('Failed to play sound:', err));
    }
  };

  const showBrowserNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Order Received!', {
        body: 'A new pizza order has been placed.',
        icon: '/favicon.ico',
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showBrowserNotification();
        }
      });
    }
  };

  const calculateStats = (ordersList: any[]) => {
    const todayOrders = ordersList.filter((o) => {
      const orderDate = new Date(o.created_at);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    });

    setStats({
      total: todayOrders.length,
      pending: ordersList.filter((o) => o.status === 'pending').length,
      revenue: todayOrders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0),
    });
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Order status updated');
        fetchOrders();
      } else {
        toast.error('Failed to update order');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const acknowledgeOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ is_acknowledged: true }),
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to acknowledge order:', error);
    }
  };

  const verifyOtp = async () => {
    if (!otpVerification) return;

    try {
      const response = await fetch('/api/admin/orders/verify-otp', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          order_id: otpVerification.orderId,
          otp: otpVerification.otp,
        }),
      });

      if (response.ok) {
        toast.success('OTP verified! Order marked as picked up');
        setOtpVerification(null);
        fetchOrders();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('Failed to verify OTP');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'badge-pending',
      accepted: 'badge-accepted',
      ready: 'badge-ready',
      picked_up: 'badge-picked-up',
      cancelled: 'badge-cancelled',
    };
    return badges[status] || 'badge-status';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Pizza className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">Admin Dashboard</span>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Package className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.revenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Orders</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600 py-12">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`border rounded-lg p-4 ${
                    !order.is_acknowledged && order.status === 'pending'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-lg">{order.order_number}</h3>
                        {!order.is_acknowledged && order.status === 'pending' && (
                          <Bell className="h-5 w-5 text-red-600 animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{order.customer_name}</p>
                      <p className="text-sm text-gray-600">{order.customer_phone}</p>
                    </div>
                    <span className={getStatusBadge(order.status)}>{order.status}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Pickup: </span>
                      <span className="font-medium">
                        {new Date(order.pickup_time).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total: </span>
                      <span className="font-bold text-red-600">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!order.is_acknowledged && order.status === 'pending' && (
                      <button
                        onClick={() => acknowledgeOrder(order.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        <Check className="h-4 w-4 inline mr-1" />
                        Acknowledge
                      </button>
                    )}

                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'accepted')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Accept
                      </button>
                    )}

                    {order.status === 'accepted' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Mark Ready
                      </button>
                    )}

                    {order.status === 'ready' && (
                      <button
                        onClick={() => setOtpVerification({ orderId: order.id, otp: '' })}
                        className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                      >
                        Verify OTP
                      </button>
                    )}

                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        <X className="h-4 w-4 inline mr-1" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {otpVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Verify OTP</h3>
            <p className="text-gray-600 mb-4">Enter the 4-digit OTP from the customer</p>
            <input
              type="text"
              maxLength={4}
              value={otpVerification.otp}
              onChange={(e) =>
                setOtpVerification({ ...otpVerification, otp: e.target.value })
              }
              className="input-custom mb-4 text-center text-2xl tracking-widest"
              placeholder="0000"
            />
            <div className="flex space-x-3">
              <button onClick={verifyOtp} className="btn-primary flex-1">
                <CheckCircle className="h-5 w-5 inline mr-2" />
                Verify
              </button>
              <button
                onClick={() => setOtpVerification(null)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
