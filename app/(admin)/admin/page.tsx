import { ListenersChart } from "./analytics/_components/ListenersChart";
import { RegionDistributionChart } from "./analytics/_components/RegionDistributionChart";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <ListenersChart />
        <RegionDistributionChart />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Welcome, Admin!</h2>
        <p className="text-muted-foreground">
          Use the sidebar to manage your application's content. You can edit the daily program schedule, add new events, and interact with listeners in the live chat.
        </p>
      </div>
    </div>
  );
}
