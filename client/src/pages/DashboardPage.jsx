import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Sidebar from "../dashboard/Sidebar";
import TopHeader from "../dashboard/TopHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import {
  fetchEmployeeKYC,
  fetchEmployeePayslip,
  fetchEmployeeProfile,
  fetchEmployeeSalary,
} from "../services/employeeService";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    value
  );

const formatDate = (dateValue) => {
  if (!dateValue) return "-";
  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const maskValue = (value = "") => {
  if (value.length <= 4) return value;
  return `${"*".repeat(value.length - 4)}${value.slice(-4)}`;
};

const getFallbackAvatar = (name = "Employee") => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=fef3c7&color=7c2d12&size=256`;
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [kyc, setKyc] = useState(null);
  const [salary, setSalary] = useState(null);
  const [payslips, setPayslips] = useState([]);

  const { employee, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [profileRes, kycRes, salaryRes, payslipRes] = await Promise.all([
          fetchEmployeeProfile(),
          fetchEmployeeKYC(),
          fetchEmployeeSalary(),
          fetchEmployeePayslip(),
        ]);

        setProfile(profileRes);
        setKyc(kycRes);
        setSalary(salaryRes);
        setPayslips(payslipRes);
      } catch (err) {
        if (err?.response?.status === 401) {
          logout();
          navigate("/", { replace: true });
          return;
        }

        if (!err?.response) {
          setError("Unable to reach server. Please ensure backend is running on port 5000.");
        } else {
          setError(err?.response?.data?.message || "Failed to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = useMemo(() => {
    if (!salary || !profile) {
      return [];
    }

    return [
      { title: "Department", value: profile.department },
      { title: "Designation", value: profile.designation },
      { title: "Net Salary", value: formatCurrency(salary.netSalary) },
    ];
  }, [profile, salary]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const downloadPayslip = (payslip) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Ronak Fire Industries", 14, 20);
    doc.setFontSize(12);
    doc.text(`Payslip: ${payslip.month}`, 14, 30);
    doc.text(`Employee: ${profile?.name || employee?.name || ""}`, 14, 40);
    doc.text(`Gross Salary: ${formatCurrency(payslip.grossSalary)}`, 14, 55);
    doc.text(`Total Deduction: ${formatCurrency(payslip.deduction)}`, 14, 65);
    doc.text(`Net Pay: ${formatCurrency(payslip.netPay)}`, 14, 75);
    doc.save(`payslip-${payslip.month}.pdf`);
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-red-50 px-4 py-5 md:px-8 md:py-8">
      <TopHeader employeeName={profile?.name || employee?.name} onLogout={handleLogout} />

      {loading ? <p className="text-sm font-medium text-amber-900">Loading dashboard...</p> : null}
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-[280px,1fr]">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <section className="glass-card animate-fade-up rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-panel md:p-6">
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <StatCard key={stat.title} title={stat.title} value={stat.value} />
              ))}
            </div>

            {activeTab === "details" && profile ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-950">Employee Details</h3>
                <div className="grid gap-4 md:grid-cols-[160px,1fr]">
                  <img
                    src={profile.profileImage || getFallbackAvatar(profile.name)}
                    alt={profile.name}
                    onError={(e) => {
                      e.currentTarget.src = getFallbackAvatar(profile.name);
                    }}
                    className="h-40 w-40 rounded-2xl border border-amber-200 object-cover transition duration-300 hover:scale-[1.03]"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <p><span className="font-semibold">Employee ID:</span> {profile._id}</p>
                    <p><span className="font-semibold">Full Name:</span> {profile.name}</p>
                    <p><span className="font-semibold">DOB:</span> {formatDate(profile.dob)}</p>
                    <p><span className="font-semibold">Date of Joining:</span> {formatDate(profile.dateOfJoining)}</p>
                    <p><span className="font-semibold">Department:</span> {profile.department}</p>
                    <p><span className="font-semibold">Designation:</span> {profile.designation}</p>
                    <p><span className="font-semibold">Email:</span> {profile.email}</p>
                    <p><span className="font-semibold">Phone:</span> {profile.phone}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Address:</span> {profile.address}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "kyc" && kyc ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-950">KYC Details</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <p><span className="font-semibold">Aadhaar:</span> {maskValue(kyc.aadhaarNumber)}</p>
                  <p><span className="font-semibold">PAN:</span> {kyc.panNumber}</p>
                  <p><span className="font-semibold">Bank Account:</span> {maskValue(kyc.bankAccount)}</p>
                  <p><span className="font-semibold">IFSC:</span> {kyc.ifscCode}</p>
                  <p><span className="font-semibold">Bank Name:</span> {kyc.bankName}</p>
                  <p><span className="font-semibold">UAN:</span> {maskValue(kyc.uanNumber)}</p>
                  <p><span className="font-semibold">PF Number:</span> {kyc.pfNumber}</p>
                </div>
              </div>
            ) : null}

            {activeTab === "salary" && salary ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-950">CTC Structure</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <p><span className="font-semibold">Basic Salary:</span> {formatCurrency(salary.basicSalary)}</p>
                    <p><span className="font-semibold">HRA:</span> {formatCurrency(salary.hra)}</p>
                    <p><span className="font-semibold">Allowances:</span> {formatCurrency(salary.allowances)}</p>
                    <p><span className="font-semibold">Bonus:</span> {formatCurrency(salary.bonus)}</p>
                    <p><span className="font-semibold">Deductions:</span> {formatCurrency(salary.deductions)}</p>
                    <p><span className="font-semibold">PF Deduction:</span> {formatCurrency(salary.pf)}</p>
                    <p className="sm:col-span-2 lg:col-span-3 text-base font-semibold text-ember-700">
                      Net Salary: {formatCurrency(salary.netSalary)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-amber-950">Monthly Payslips</h4>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full rounded-xl border border-amber-200 text-sm">
                      <thead className="bg-amber-100/80 text-amber-950">
                        <tr>
                          <th className="px-3 py-2 text-left">Month</th>
                          <th className="px-3 py-2 text-left">Gross Salary</th>
                          <th className="px-3 py-2 text-left">Total Deduction</th>
                          <th className="px-3 py-2 text-left">Net Pay</th>
                          <th className="px-3 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payslips.map((payslip) => (
                          <tr key={payslip._id} className="border-t border-amber-100 transition-colors duration-200 hover:bg-amber-50/70">
                            <td className="px-3 py-2">{payslip.month}</td>
                            <td className="px-3 py-2">{formatCurrency(payslip.grossSalary)}</td>
                            <td className="px-3 py-2">{formatCurrency(payslip.deduction)}</td>
                            <td className="px-3 py-2">{formatCurrency(payslip.netPay)}</td>
                            <td className="px-3 py-2">
                              <button
                                type="button"
                                onClick={() => downloadPayslip(payslip)}
                                className="soft-button rounded-lg border border-ember-500 px-3 py-1.5 font-medium text-ember-700 hover:bg-ember-50"
                              >
                                Download PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardPage;
