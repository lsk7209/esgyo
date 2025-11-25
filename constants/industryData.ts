/**
 * 업종별 벤치마크 데이터
 * 
 * Disclaimer:
 * - Derived from 2023 SME Stats, approximate value.
 * - NOT an official MOE factor. Used for relative scoring only.
 */

export interface IndustryBenchmark {
  category: string;
  avgEmission: number; // tCO2eq/year
  warning: string;
}

export const IndustryBenchmarks: IndustryBenchmark[] = [
  {
    category: "manufacturing",
    avgEmission: 300,
    warning: "High Energy Intensive"
  },
  {
    category: "service",
    avgEmission: 50,
    warning: "Low Carbon Footprint"
  },
  {
    category: "retail",
    avgEmission: 80,
    warning: "Moderate Carbon Footprint"
  },
  {
    category: "construction",
    avgEmission: 400,
    warning: "Very High Energy Intensive"
  },
  {
    category: "transportation",
    avgEmission: 250,
    warning: "High Energy Intensive"
  },
  {
    category: "office",
    avgEmission: 60,
    warning: "Low Carbon Footprint"
  }
];

/**
 * 업종별 평균 배출량 조회
 */
export function getIndustryBenchmark(category: string): IndustryBenchmark | undefined {
  return IndustryBenchmarks.find(b => b.category === category);
}

