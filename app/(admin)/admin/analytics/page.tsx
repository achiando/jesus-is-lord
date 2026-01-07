import { ListenersChart } from "./_components/ListenersChart";

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6">
        <ListenersChart />
        {/* More analytics components can be added here in the future */}
      </div>
    </div>
  );
}
