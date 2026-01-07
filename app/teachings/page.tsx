import { Suspense } from "react";
import { TeachingsContent } from "./_components/TeachingsContent";

export default function TeachingsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Suspense fallback={null}>
        <TeachingsContent />
      </Suspense>
    </div>
  );
}
