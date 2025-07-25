// app/loading.tsx
import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Spinner className="h-16 w-16 text-blue-600" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping"></div>
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          加载中，请稍候...
        </p>
      </div>
    </div>
  );
}