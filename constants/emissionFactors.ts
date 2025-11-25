/**
 * 배출 계수 (환경부 기준)
 * 단위: kg CO2eq / 단위
 */

export const EmissionFactors = {
  electricity: 0.4781, // kg CO2eq / kWh
  gas: 0.056,           // kg CO2eq / MJ
  fuel: 2.097           // kg CO2eq / Liter
} as const;

/**
 * 총 배출량 계산 (tCO2eq)
 * Edge case 처리 포함
 */
export function calculateTotalEmission(
  electricity: number, // kWh
  gas: number,         // MJ
  fuel: number         // Liter
): number {
  // Edge case: NaN, 무한대, 음수 처리
  const safeElec = isFinite(electricity) && electricity >= 0 ? electricity : 0;
  const safeGas = isFinite(gas) && gas >= 0 ? gas : 0;
  const safeFuel = isFinite(fuel) && fuel >= 0 ? fuel : 0;
  
  const totalKgCO2eq =
    safeElec * EmissionFactors.electricity +
    safeGas * EmissionFactors.gas +
    safeFuel * EmissionFactors.fuel;
  
  // Edge case: 결과가 유효한지 확인
  if (!isFinite(totalKgCO2eq) || totalKgCO2eq < 0) {
    return 0;
  }
  
  return totalKgCO2eq / 1000; // kg → t
}

