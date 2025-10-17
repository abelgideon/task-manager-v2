export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border p-6 shadow-sm rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
