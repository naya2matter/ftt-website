import { QuickLinks } from "./components/quick-links";

export default function Page() {
  // Dashboard index content — show quick access links for better UX
  // Nested routes (e.g. /dashboard/blank) will render inside the dashboard layout (`layout.tsx`).
  return (
    <div style={{ padding: 12 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your FTT dashboard. Select a section to get started.</p>
      </div>
      
      <div className="mt-8">
        <QuickLinks />
      </div>
    </div>
  );
}
