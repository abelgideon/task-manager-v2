import { FeatureCard } from "./_components/FeatureCard";

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-muted-foreground">
          Discover how Tido can help you manage your tasks more efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Task Tracking"
          description="Create, assign, and track tasks with ease. Set priorities and statuses to keep you on track."
        />
        <FeatureCard
          title="Intuitive UI"
          description="A clean, modern interface that makes task management a breeze. No clutter, just what you need to get work done."
        />
        <FeatureCard
          title="Real-time Updates"
          description="See changes as they happen. No need to refresh or wait for updates."
        />
      </div>
    </div>
  );
}
