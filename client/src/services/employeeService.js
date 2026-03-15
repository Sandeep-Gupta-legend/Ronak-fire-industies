import api from "./api";

export const fetchEmployeeProfile = async () => {
  const response = await api.get("/employee/profile");
  return response.data;
};

export const fetchEmployeeKYC = async () => {
  const response = await api.get("/employee/kyc");
  return response.data;
};

export const fetchEmployeeSalary = async () => {
  const response = await api.get("/employee/salary");
  return response.data;
};

export const fetchEmployeePayslip = async () => {
  const response = await api.get("/employee/payslip");
  return response.data;
};
