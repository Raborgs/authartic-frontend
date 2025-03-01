// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import { useVerifyPaymentMutation } from "@/slices/stripeApiSlice"; 

// export default function Success() {
//   const router = useRouter();
//   const { session_id } = router.query; 

//   const [paymentStatus, setPaymentStatus] = useState(null);

//   const [verifyPayment, { isLoading, error }] = useVerifyPaymentMutation();

//   useEffect(() => {
//     if (!session_id) return;

//     async function checkPayment() {
//       try {
//         const data = await verifyPayment(session_id).unwrap(); 
//         if (data.success) {
//           toast.success("Payment Verified! Subscription Activated.");
//           setPaymentStatus("success");
//         } else {
//           toast.error("Payment verification failed.");
//           setPaymentStatus("failed");
//         }
//       } catch (error) {
//         console.error("Error verifying payment:", error);
//         toast.error("Error verifying payment.");
//         setPaymentStatus("failed");
//       }
//     }

//     checkPayment();
//   }, [session_id, verifyPayment]);

//   if (isLoading) return <p>Verifying payment...</p>;

//   return (
//     <div>
//       <h1>Payment {paymentStatus === "success" ? "Successful" : "Failed"}</h1>
//       {paymentStatus === "success" ? (
//         <p>Thank you for your payment! Your subscription is now active.</p>
//       ) : (
//         <p>Something went wrong. Please contact support.</p>
//       )}
//       <button onClick={() => router.push("/home")}>Go to Dashboard</button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useVerifyPaymentMutation } from "@/slices/stripeApiSlice"; 
import { CircularProgress } from "@mui/material";

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query; 

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();

  useEffect(() => {
    if (!session_id) return;

    async function checkPayment() {
      try {
        const data = await verifyPayment(session_id).unwrap(); 
        if (data.success) {
          toast.success("Payment Verified! Subscription Activated.");
          setPaymentStatus("success");
        } else {
          toast.error("Payment verification failed.");
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Error verifying payment.");
        setPaymentStatus("failed");
      }
    }

    checkPayment();
  }, [session_id, verifyPayment]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <CircularProgress className="text-blue-500" size={50} />
            <p className="mt-3 text-gray-600">Verifying payment...</p>
          </div>
        ) : (
          <>
            {paymentStatus === "success" ? (
              <div className="bg-green-100 text-green-600 rounded-full p-3 inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9a1 1 0 00-1.414-1.414L9 10.172 7.414 8.586A1 1 0 106 10l3 3a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              <div className="bg-red-100 text-red-600 rounded-full p-3 inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 012 0v2a1 1 0 01-2 0v-2zm1-10a1 1 0 00-.707 1.707l.707.707.707-.707A1 1 0 1010 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl font-semibold text-gray-800 mt-4">
              Payment {paymentStatus === "success" ? "Successful" : "Failed"}
            </h1>

            {/* Message */}
            <p className="text-gray-600 mt-2">
              {paymentStatus === "success"
                ? "Thank you for your payment! Your subscription is now active."
                : "Something went wrong. Please contact support."}
            </p>

            {/* Button */}
            <button
              onClick={() => router.push("/home")}
              className="mt-5 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
