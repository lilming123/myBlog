// app/loading.tsx

import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Loader/>
        </div>
        <p className="text-lg font-medium dark:text-amber-50 animate-pulse">
          稍安勿躁，坐和放宽
        </p>
      </div>
    </div>
  );
}