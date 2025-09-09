"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ItemCustomizationModal } from "@/components/ui/ItemCustomizationModal";
import { CartItemWithDetails } from "@/types/cart";

export default function CartPage() {
  const { state, updateCartItem, removeFromCart, applyCoupon, removeCoupon, clearCart } = useCart();
  const { data: session } = useSession();
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [customizationModal, setCustomizationModal] = useState<{
    isOpen: boolean;
    item: CartItemWithDetails | null;
  }>({ isOpen: false, item: null });

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (newQuantity === 0) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem(itemId, newQuantity, notes[itemId]);
    }
  };

  const handleNotesChange = async (itemId: string, newNotes: string) => {
    setNotes(prev => ({ ...prev, [itemId]: newNotes }));
    const item = state.cart?.items.find(i => i.itemId === itemId);
    if (item) {
      await updateCartItem(itemId, item.quantity, newNotes);
    }
  };

  const handleApplyCoupon = async () => {
    if (couponCode.trim()) {
      await applyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  const handleOpenCustomization = (item: CartItemWithDetails) => {
    setCustomizationModal({ isOpen: true, item });
  };

  const handleCloseCustomization = () => {
    setCustomizationModal({ isOpen: false, item: null });
  };

  const handleSaveCustomization = async (
    itemId: string,
    quantity: number,
    notes: string,
    selectedOptions: { optionId: string; groupId: string }[]
  ) => {
    await updateCartItem(itemId, quantity, notes, selectedOptions);
  };

  if (state.initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{state.error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!state.cart || state.cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({state.cart.itemCount})</h2>
                
                <div className="space-y-6">
                  {state.cart.items.map((item) => (
                    <div key={item.itemId} className="flex items-start space-x-4 border-b pb-6 last:border-b-0">
                      <Image
                        src={item.item.image || "/images/placeholder.jpg"}
                        alt={item.item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.item.category.name}</p>
                        
                        {/* Selected Options */}
                        {item.selectedOptions.length > 0 && (
                          <div className="mb-2">
                            <p className="text-sm font-medium text-gray-700">Customizations:</p>
                            <ul className="text-sm text-gray-600">
                              {item.selectedOptions.map((option, index) => (
                                <li key={index}>
                                  {option.option.name} {option.option.price > 0 && `(+${formatPrice(option.option.price)})`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Edit Button */}
                        <div className="mb-3">
                          <button
                            onClick={() => handleOpenCustomization(item)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Edit Customizations
                          </button>
                        </div>
                        
                        {/* Notes */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Special Instructions
                          </label>
                          <input
                            type="text"
                            value={notes[item.itemId] || item.notes || ""}
                            onChange={(e) => handleNotesChange(item.itemId, e.target.value)}
                            placeholder="e.g., No pickles, Extra spicy"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => handleQuantityChange(item.itemId, item.quantity - 1, e)}
                              disabled={state.loading}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {state.loading ? (
                                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                "-"
                              )}
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={(e) => handleQuantityChange(item.itemId, item.quantity + 1, e)}
                              disabled={state.loading}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {state.loading ? (
                                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                "+"
                              )}
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatPrice(item.totalPrice)}</p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(item.itemId);
                              }}
                              disabled={state.loading}
                              className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Coupon Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleApplyCoupon();
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  
                  {state.cart.appliedCoupon && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-800">
                          {state.cart.appliedCoupon.code} applied
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeCoupon();
                          }}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-green-600">
                        -{formatPrice(state.cart.appliedCoupon.discount)}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(state.cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(state.cart.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>{formatPrice(state.cart.serviceFee)}</span>
                  </div>
                  {state.cart.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(state.cart.discount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(state.cart.total)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  {session?.user ? (
                    <Link
                      href="/checkout"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span className="text-sm font-medium text-yellow-800">Sign In Required</span>
                        </div>
                        <p className="text-sm text-yellow-700 mb-3">
                          You need to sign in or create an account to proceed with checkout.
                        </p>
                        <div className="space-y-2">
                          <Link
                            href="/auth/signin?callbackUrl=/checkout"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block text-sm"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/auth/signup?callbackUrl=/checkout"
                            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center block text-sm"
                          >
                            Create Account
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      clearCart();
                    }}
                    className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                  
                  <Link
                    href="/menu"
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {customizationModal.item && (
        <ItemCustomizationModal
          isOpen={customizationModal.isOpen}
          onClose={handleCloseCustomization}
          item={customizationModal.item}
          onSave={handleSaveCustomization}
        />
      )}
    </div>
  );
}
