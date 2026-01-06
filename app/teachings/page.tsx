import { Suspense } from "react";
import { TeachingsContent } from "./_components/TeachingsContent";

export default function TeachingsPage() {
  return (
    <div className="container py-8 md:py-12">
      <Suspense fallback={null}>
        <TeachingsContent />
      </Suspense>
    </div>
  );
}
