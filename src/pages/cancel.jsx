import { useRouter } from "next/router";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">

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

        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment was not completed. If this was a mistake, you can try
          again.
        </p>

        <button
          onClick={() => router.push("/package-plans")}
          className="mt-5 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
