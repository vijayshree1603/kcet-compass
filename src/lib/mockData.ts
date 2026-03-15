export interface College {
  id: string;
  name: string;
  shortName: string;
  branch: string;
  region: string;
  fees: number;
  placementAvg: number;
  placementHighest: number;
  roiScore: number;
  cutoffs: { year: number; rank: number }[];
  highlights: string[];
}

export const REGIONS = ["Bengaluru", "Mysuru", "North Karnataka", "Coastal Karnataka"] as const;
export const CATEGORIES = ["General", "OBC", "SC", "ST", "GM"] as const;
export const BRANCHES = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication",
  "Electrical & Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "AI & Machine Learning",
  "Data Science",
] as const;

export const BUDGET_RANGES = [
  { label: "Under ₹1 Lakh/year", min: 0, max: 100000 },
  { label: "₹1-3 Lakhs/year", min: 100000, max: 300000 },
  { label: "₹3-5 Lakhs/year", min: 300000, max: 500000 },
  { label: "Above ₹5 Lakhs/year", min: 500000, max: 10000000 },
] as const;

export const colleges: College[] = [
  {
    id: "rvce",
    name: "RV College of Engineering",
    shortName: "RVCE",
    branch: "Computer Science & Engineering",
    region: "Bengaluru",
    fees: 295000,
    placementAvg: 1200000,
    placementHighest: 4500000,
    roiScore: 92,
    cutoffs: [
      { year: 2019, rank: 1200 },
      { year: 2020, rank: 1050 },
      { year: 2021, rank: 980 },
      { year: 2022, rank: 850 },
      { year: 2023, rank: 780 },
    ],
    highlights: ["NAAC A+", "NBA Accredited", "Strong Industry Ties"],
  },
  {
    id: "bmsce",
    name: "BMS College of Engineering",
    shortName: "BMSCE",
    branch: "Computer Science & Engineering",
    region: "Bengaluru",
    fees: 280000,
    placementAvg: 1100000,
    placementHighest: 4200000,
    roiScore: 90,
    cutoffs: [
      { year: 2019, rank: 1500 },
      { year: 2020, rank: 1350 },
      { year: 2021, rank: 1200 },
      { year: 2022, rank: 1100 },
      { year: 2023, rank: 1000 },
    ],
    highlights: ["Autonomous", "Excellent Infrastructure", "Top Recruiters"],
  },
  {
    id: "msrit",
    name: "M S Ramaiah Institute of Technology",
    shortName: "MSRIT",
    branch: "Information Science & Engineering",
    region: "Bengaluru",
    fees: 265000,
    placementAvg: 950000,
    placementHighest: 3800000,
    roiScore: 87,
    cutoffs: [
      { year: 2019, rank: 2800 },
      { year: 2020, rank: 2500 },
      { year: 2021, rank: 2200 },
      { year: 2022, rank: 2000 },
      { year: 2023, rank: 1850 },
    ],
    highlights: ["NAAC A", "Research Focus", "Good Campus"],
  },
  {
    id: "pes",
    name: "PES University",
    shortName: "PESU",
    branch: "Computer Science & Engineering",
    region: "Bengaluru",
    fees: 450000,
    placementAvg: 1400000,
    placementHighest: 5000000,
    roiScore: 88,
    cutoffs: [
      { year: 2019, rank: 800 },
      { year: 2020, rank: 700 },
      { year: 2021, rank: 650 },
      { year: 2022, rank: 580 },
      { year: 2023, rank: 520 },
    ],
    highlights: ["Top Placements", "Research University", "Industry Partners"],
  },
  {
    id: "nie",
    name: "NIE Mysuru",
    shortName: "NIE",
    branch: "Electronics & Communication",
    region: "Mysuru",
    fees: 180000,
    placementAvg: 650000,
    placementHighest: 2200000,
    roiScore: 82,
    cutoffs: [
      { year: 2019, rank: 5500 },
      { year: 2020, rank: 5200 },
      { year: 2021, rank: 4800 },
      { year: 2022, rank: 4500 },
      { year: 2023, rank: 4200 },
    ],
    highlights: ["Heritage Institution", "Strong Alumni", "Affordable"],
  },
  {
    id: "sjce",
    name: "SJCE Mysuru",
    shortName: "SJCE",
    branch: "Computer Science & Engineering",
    region: "Mysuru",
    fees: 195000,
    placementAvg: 800000,
    placementHighest: 2800000,
    roiScore: 85,
    cutoffs: [
      { year: 2019, rank: 3200 },
      { year: 2020, rank: 3000 },
      { year: 2021, rank: 2800 },
      { year: 2022, rank: 2500 },
      { year: 2023, rank: 2300 },
    ],
    highlights: ["JSS University", "Good Research", "Well Maintained"],
  },
  {
    id: "sdmcet",
    name: "SDM College of Engineering",
    shortName: "SDMCET",
    branch: "AI & Machine Learning",
    region: "North Karnataka",
    fees: 150000,
    placementAvg: 550000,
    placementHighest: 1800000,
    roiScore: 78,
    cutoffs: [
      { year: 2019, rank: 12000 },
      { year: 2020, rank: 10500 },
      { year: 2021, rank: 9000 },
      { year: 2022, rank: 8000 },
      { year: 2023, rank: 7200 },
    ],
    highlights: ["Dharwad Location", "New AI Lab", "Growing Placements"],
  },
  {
    id: "nmamit",
    name: "NMAM Institute of Technology",
    shortName: "NMAMIT",
    branch: "Data Science",
    region: "Coastal Karnataka",
    fees: 170000,
    placementAvg: 600000,
    placementHighest: 2000000,
    roiScore: 80,
    cutoffs: [
      { year: 2019, rank: 9000 },
      { year: 2020, rank: 8500 },
      { year: 2021, rank: 7800 },
      { year: 2022, rank: 7200 },
      { year: 2023, rank: 6800 },
    ],
    highlights: ["Nitte University", "Beautiful Campus", "Industry Connect"],
  },
  {
    id: "dsce",
    name: "Dayananda Sagar College of Engineering",
    shortName: "DSCE",
    branch: "Mechanical Engineering",
    region: "Bengaluru",
    fees: 220000,
    placementAvg: 500000,
    placementHighest: 1500000,
    roiScore: 72,
    cutoffs: [
      { year: 2019, rank: 18000 },
      { year: 2020, rank: 17000 },
      { year: 2021, rank: 16500 },
      { year: 2022, rank: 16000 },
      { year: 2023, rank: 15500 },
    ],
    highlights: ["Bengaluru Location", "Good Labs", "Sports Facilities"],
  },
  {
    id: "bit",
    name: "Bangalore Institute of Technology",
    shortName: "BIT",
    branch: "Electrical & Electronics",
    region: "Bengaluru",
    fees: 160000,
    placementAvg: 580000,
    placementHighest: 1600000,
    roiScore: 76,
    cutoffs: [
      { year: 2019, rank: 8500 },
      { year: 2020, rank: 8000 },
      { year: 2021, rank: 7500 },
      { year: 2022, rank: 7000 },
      { year: 2023, rank: 6500 },
    ],
    highlights: ["Government Aided", "Low Fees", "Central Location"],
  },
];

export function calculateProbability(rank: number, cutoff: number): number {
  if (rank <= cutoff) return Math.min(95, 85 + Math.random() * 10);
  const ratio = (rank - cutoff) / cutoff;
  if (ratio <= 0.1) return Math.floor(50 + Math.random() * 20);
  if (ratio <= 0.25) return Math.floor(20 + Math.random() * 20);
  return Math.floor(5 + Math.random() * 15);
}

export function getCategory(probability: number): "safe" | "target" | "dream" {
  if (probability >= 70) return "safe";
  if (probability >= 35) return "target";
  return "dream";
}

export function getTrendDirection(cutoffs: { year: number; rank: number }[]): {
  label: string;
  direction: "up" | "down" | "stable";
} {
  if (cutoffs.length < 2) return { label: "Insufficient data", direction: "stable" };
  const sorted = [...cutoffs].sort((a, b) => a.year - b.year);
  const first = sorted[0].rank;
  const last = sorted[sorted.length - 1].rank;
  const change = ((first - last) / first) * 100;
  if (change > 10) return { label: "Getting more competitive", direction: "up" };
  if (change < -10) return { label: "Getting easier", direction: "down" };
  return { label: "Stable", direction: "stable" };
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}
