import useGetParkingSpotStatistics from "../../../Hooks/ParkingSpots/useGetParkingSpotStatistics";

const ParkingSpotStatistics = () => {
  const stats = useGetParkingSpotStatistics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label as string}
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-text-secondary">{stat.label as string}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingSpotStatistics;
