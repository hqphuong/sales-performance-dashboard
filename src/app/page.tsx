import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { SalesChartCard } from "@/components/organisms/SalesChartCard";
import { Heading } from "@/components/atoms/Heading";

export default function Home() {
  return (
    <DashboardLayout>
      {/* Phần Header của Dashboard */}
      <header className="mb-10">
        <Heading level={1}>Sales Performance Dashboard</Heading>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">
          Welcome back! Here is the overview of global sales from 2022 to 2024.
        </p>
      </header>

      {/* Phần nội dung chính: Chứa biểu đồ */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          <SalesChartCard />
        </div>
      </div>
      
      {/* Bạn có thể thêm các phần khác như Stats, Recent Activities ở đây */}
    </DashboardLayout>
  );
}