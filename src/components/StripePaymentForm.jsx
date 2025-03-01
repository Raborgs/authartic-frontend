"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useCreatePaymentIntentMutation } from "@/slices/stripeApiSlice";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripePaymentForm({ planId, price }) {
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await createPaymentIntent({ amount: price * 100, currency: "usd" });
      setClientSecret(data.client_secret);
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Payment successful! Status: ${paymentIntent.status}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Subscribe to Plan</h2>
      {!clientSecret ? (
        <Button variant="contained" color="primary" onClick={handlePayment} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : `Pay $${price}`}
        </Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Confirm Payment"}
          </Button>
        </form>
      )}
    </div>
  );
}
