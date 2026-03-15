const tabs = [
  { id: "details", label: "Employee Details" },
  { id: "kyc", label: "KYC Details" },
  { id: "salary", label: "CTC / Payslip" },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="glass-card animate-fade-up w-full rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-panel md:w-72">
      <p className="text-xs uppercase tracking-widest text-amber-900/70">Navigation</p>
      <ul className="mt-3 space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${
                activeTab === tab.id
                  ? "bg-ember-600 text-white"
                  : "bg-amber-100/60 text-amber-900 hover:bg-amber-200/70"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
