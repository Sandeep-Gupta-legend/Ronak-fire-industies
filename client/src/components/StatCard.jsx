const StatCard = ({ title, value }) => {
  return (
    <div className="glass-card animate-fade-up rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-panel">
      <p className="text-xs uppercase tracking-wide text-amber-900/70">{title}</p>
      <p className="mt-2 text-xl font-semibold text-amber-950">{value}</p>
    </div>
  );
};

export default StatCard;
