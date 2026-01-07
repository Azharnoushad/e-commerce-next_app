"use client";

import { useEffect } from "react";

interface ErrorType {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold">
        {error.message}Something went wrong 😢
      </h2>
      <p className="mt-2 text-gray-500">
        An unexpected error occurred. Please try again.
      </p>
    </div>
  );
}
