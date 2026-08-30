import React, { useState } from 'react';
import { useCravioStore } from '../store/useCravioStore';
import { User as UserIcon, Package, MapPin, Settings, Heart, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const user = useCravioStore(s => s.user);
  const orders = useCravioStore(s => s.orders);
  const openOrderTracker = useCravioStore(s => s.openOrderTracker);

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'preferences' | 'settings'>('orders');

  return (
    <div className="pt-28 pb-24 bg-cravio-bg text-cravio-charcoal min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Card Banner */}
        <div className="bg-cravio-darkBg text-white rounded-3xl p-6 sm:p-8 border border-cravio-borderDark shadow-2xl mb-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-cravio-accent/40 shadow-lg"
          />

          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Gourmet Member</span>
            <h1 className="font-serif text-3xl font-bold">{user.name}</h1>
            <p className="text-xs text-cravio-mutedLight">{user.email} • {user.phone}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-cravio-border pb-4 mb-8 overflow-x-auto no-scrollbar text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-cravio-accent text-white shadow-md' : 'bg-cravio-card text-cravio-charcoal hover:bg-cravio-cream'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'addresses' ? 'bg-cravio-accent text-white shadow-md' : 'bg-cravio-card text-cravio-charcoal hover:bg-cravio-cream'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Addresses ({user.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'preferences' ? 'bg-cravio-accent text-white shadow-md' : 'bg-cravio-card text-cravio-charcoal hover:bg-cravio-cream'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Food Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-cravio-accent text-white shadow-md' : 'bg-cravio-card text-cravio-charcoal hover:bg-cravio-cream'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-6 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-cravio-border">
                  <div>
                    <span className="font-mono text-xs font-bold text-cravio-accent">{order.id}</span>
                    <h3 className="font-serif font-bold text-xl text-cravio-charcoal">{order.restaurantName}</h3>
                    <span className="text-[11px] text-cravio-muted">{order.createdAt}</span>
                  </div>

                  <button
                    onClick={() => openOrderTracker(order)}
                    className="px-4 py-2 rounded-full bg-cravio-darkBg text-amber-300 text-xs font-bold flex items-center gap-2 shadow hover:bg-black transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Track Live Status ({order.status})</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.dishId} className="flex justify-between items-center text-xs">
                      <span className="text-cravio-charcoal font-medium">{item.quantity}x {item.dishName}</span>
                      <span className="font-serif font-bold">₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-cravio-border flex items-center justify-between text-xs">
                  <span className="text-cravio-muted">Paid via {order.paymentMethod}</span>
                  <span className="font-serif font-bold text-lg text-cravio-accent">Total: ₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className="p-6 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-2">
                <span className="font-bold text-xs uppercase text-cravio-accent">{addr.label}</span>
                <p className="font-medium text-sm text-cravio-charcoal">{addr.street}</p>
                <p className="text-xs text-cravio-muted">{addr.city}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Food Preferences */}
        {activeTab === 'preferences' && (
          <div className="p-8 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-6">
            <h3 className="font-serif text-2xl font-bold">Personalized Taste Profile</h3>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-cravio-muted font-bold block mb-2">Dietary Tags</span>
                <div className="flex gap-2">
                  {user.preferences.dietary.map(d => (
                    <span key={d} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">{d}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-cravio-muted font-bold block mb-2">Favorite Cuisines</span>
                <div className="flex gap-2">
                  {user.preferences.favoriteCuisines.map(c => (
                    <span key={c} className="px-3 py-1 rounded-full bg-cravio-cream text-cravio-charcoal font-semibold border border-cravio-border">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Settings */}
        {activeTab === 'settings' && (
          <div className="p-8 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-4">
            <h3 className="font-serif text-2xl font-bold">Account Settings</h3>
            <p className="text-xs text-cravio-muted">Manage notifications, security settings, and saved payment profiles.</p>
          </div>
        )}

      </div>
    </div>
  );
};
