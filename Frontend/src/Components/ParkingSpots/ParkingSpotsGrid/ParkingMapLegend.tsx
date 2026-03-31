const legendItems = [
  { label: "Available", dot: "bg-success" },
  { label: "Occupied", dot: "bg-error" },
  { label: "My Vehicle", dot: "bg-primary" },
];

const ParkingMapLegend = () => (
  <div className="flex gap-6 mb-3 pb-4 border-b border-border">
    <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wide">Legend</span>
    {legendItems.map(({ label, dot }) => (
      <div key={label} className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${dot}`} />
        <span className="text-xs text-text-secondary">{label}</span>
      </div>
    ))}
  </div>
);

export default ParkingMapLegend;
