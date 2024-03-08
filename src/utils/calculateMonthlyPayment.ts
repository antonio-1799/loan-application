interface IMonthlyPayment {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export function calculateMonthlyPayment({
  loanAmount,
  interestRate,
  loanTerm,
}: IMonthlyPayment): number {
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly and percentage to dec
  const numberOfPayments = loanTerm * 12; // Convert term in years to number of monthly payments
  // Calculate monthly payment using the formula
  return (
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
  );
}
