"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublishableKey) {
  console.error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
} else {
  console.log("Stripe key found:", stripePublishableKey.substring(0, 20) + "...");
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

interface StripePaymentFormProps {
  clientSecret: string;
  orderId: string;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

function PaymentForm({ clientSecret, onPaymentSuccess, onPaymentError }: Omit<StripePaymentFormProps, 'orderId'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message || "Payment failed");
        onPaymentError(error.message || "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        // Payment succeeded - confirm with our backend
        const response = await fetch("/api/payments/stripe/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          onPaymentSuccess();
        } else {
          setError(data.error || "Payment confirmation failed");
          onPaymentError(data.error || "Payment confirmation failed");
        }
      } else {
        setError("Payment was not completed");
        onPaymentError("Payment was not completed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed";
      setError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
        >
          {loading ? "Processing Payment..." : "Complete Payment"}
        </button>
      </div>
    </form>
  );
}

export default function StripePaymentForm({ clientSecret, onPaymentSuccess, onPaymentError }: Omit<StripePaymentFormProps, 'orderId'>) {
  if (!stripePromise) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Configuration Error</h3>
        <p className="text-red-600">
          Stripe is not properly configured. Please check your environment variables.
        </p>
        <p className="text-sm text-red-500 mt-2">
          NEXT_PUBLIC_STRIPE_PUBLIC_KEY is missing or invalid.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        clientSecret={clientSecret}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
}
