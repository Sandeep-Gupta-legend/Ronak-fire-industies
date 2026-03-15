const TopHeader = ({ employeeName, onLogout }) => {
  return (
    <header className="glass-card animate-fade-up mb-4 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-panel sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-amber-950">Employee Dashboard</h2>
        <p className="text-sm text-amber-900/70">Welcome, {employeeName || "Employee"}</p>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="soft-button rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
      >
        Logout
      </button>
    </header>
  );
};

export default TopHeader;
