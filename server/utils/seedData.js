const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Employee = require("../models/Employee");
const KYC = require("../models/KYC");
const Salary = require("../models/Salary");
const Payslip = require("../models/Payslip");

dotenv.config();

const dummyEmployees = [
  {
    username: "emp101",
    password: "password123",
    name: "Sandeep Gupta",
    dob: "1992-03-15",
    dateOfJoining: "2020-06-01",
    department: "Operations",
    designation: "Fire Safety Officer",
    email: "emp101@ronakfire.com",
    phone: "9876543210",
    address: "101 Industrial Area, Surat",
    profileImage: "https://i.pravatar.cc/300?img=12",
  },
  {
    username: "emp102",
    password: "password123",
    name: "Neha Patel",
    dob: "1994-11-08",
    dateOfJoining: "2021-01-10",
    department: "Finance",
    designation: "Accounts Executive",
    email: "emp102@ronakfire.com",
    phone: "9876543211",
    address: "22 GIDC Road, Vapi",
    profileImage: "https://i.pravatar.cc/300?img=32",
  },
  {
    username: "emp103",
    password: "password123",
    name: "Rohan Mehta",
    dob: "1990-07-21",
    dateOfJoining: "2019-09-18",
    department: "Engineering",
    designation: "Design Engineer",
    email: "emp103@ronakfire.com",
    phone: "9876543212",
    address: "14 Tech Park, Ahmedabad",
    profileImage: "https://i.pravatar.cc/300?img=56",
  },
  {
    username: "emp104",
    password: "password123",
    name: "Priya Verma",
    dob: "1995-02-12",
    dateOfJoining: "2022-03-05",
    department: "HR",
    designation: "HR Specialist",
    email: "emp104@ronakfire.com",
    phone: "9876543213",
    address: "88 Ring Road, Vadodara",
    profileImage: "https://i.pravatar.cc/300?img=47",
  },
  {
    username: "emp105",
    password: "password123",
    name: "Kabir Singh",
    dob: "1991-12-03",
    dateOfJoining: "2018-11-20",
    department: "Maintenance",
    designation: "Maintenance Lead",
    email: "emp105@ronakfire.com",
    phone: "9876543214",
    address: "5 Safety Enclave, Mumbai",
    profileImage: "https://i.pravatar.cc/300?img=68",
  },
];

const createKYCData = (employeeId, i) => ({
  employeeId,
  aadhaarNumber: `99990000100${i + 1}`,
  panNumber: `ABCDE12${i + 1}F`,
  bankAccount: `1234567890${i + 1}`,
  ifscCode: `SBIN00010${i + 1}`,
  bankName: i % 2 === 0 ? "State Bank of India" : "HDFC Bank",
  uanNumber: `10020030040${i + 1}`,
  pfNumber: `PFRFI00${i + 1}`,
});

const createSalaryData = (employeeId, i) => {
  const basicSalary = 30000 + i * 4500;
  const hra = 12000 + i * 1500;
  const allowances = 6000 + i * 1000;
  const bonus = 2500 + i * 500;
  const deductions = 2800 + i * 350;
  const pf = 1800 + i * 250;
  const netSalary = basicSalary + hra + allowances + bonus - deductions - pf;

  return {
    employeeId,
    basicSalary,
    hra,
    allowances,
    bonus,
    deductions,
    pf,
    netSalary,
  };
};

const createPayslips = (employeeId, salaryData) => {
  const months = ["Jan-2026", "Feb-2026", "Mar-2026"];
  return months.map((month, index) => ({
    employeeId,
    month,
    grossSalary: salaryData.basicSalary + salaryData.hra + salaryData.allowances + salaryData.bonus,
    deduction: salaryData.deductions + salaryData.pf + index * 100,
    netPay: salaryData.netSalary - index * 100,
  }));
};

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      Employee.deleteMany({}),
      KYC.deleteMany({}),
      Salary.deleteMany({}),
      Payslip.deleteMany({}),
    ]);

    const createdEmployees = [];
    for (const employeeData of dummyEmployees) {
      const employee = new Employee(employeeData);
      // Save one by one so password hashing middleware runs reliably.
      // eslint-disable-next-line no-await-in-loop
      const savedEmployee = await employee.save();
      createdEmployees.push(savedEmployee);
    }

    const kycDocs = [];
    const salaryDocs = [];
    const payslipDocs = [];

    createdEmployees.forEach((employee, index) => {
      const kycData = createKYCData(employee._id, index);
      const salaryData = createSalaryData(employee._id, index);
      const payslips = createPayslips(employee._id, salaryData);

      kycDocs.push(kycData);
      salaryDocs.push(salaryData);
      payslipDocs.push(...payslips);
    });

    await Promise.all([
      KYC.insertMany(kycDocs),
      Salary.insertMany(salaryDocs),
      Payslip.insertMany(payslipDocs),
    ]);

    console.log("Dummy employee, KYC, salary, and payslip data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seed();
