import getIncomeExpense from "@/actions/getIncomeExpense";
import { addComas } from "@/lib/utils";
import React from "react";

const IncomeExpense = async () => {
  const { expense, income } = await getIncomeExpense();
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${addComas(Number(income?.toFixed(2)))}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${addComas(Number(expense?.toFixed(2)))}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
