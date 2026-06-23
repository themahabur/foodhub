"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProviderNotFound({ error }: { error?: string }) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="size-16 mx-auto rounded-2xl bg-foodhub-maroon/10 flex items-center justify-center mb-4">
          <PlusCircle className="text-foodhub-maroon size-8" />
        </div>

        <h1 className="text-gray-600 text-xl font-semibold">
          Provider not found
        </h1>

        {error && (
          <p className="text-gray-400 text-sm mt-2">
            {error}
          </p>
        )}

        <p className="text-gray-500 text-sm mt-2">
          You haven’t created a provider profile yet. Create one to start managing your business.
        </p>

        <button
          onClick={() => router.push("/dashboard/restaurant/edit")}
          className="mt-6 cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-foodhub-maroon/10 text-foodhub-maroon hover:bg-foodhub-maroon/20 transition-all duration-200"
        >
          <PlusCircle className="size-4" />
          Create Provider
        </button>
      </div>
    </div>
  );
}