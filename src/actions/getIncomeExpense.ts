"use server";

import { db } from "@/lib/dt";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);
    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "Database error" };
  }
}
export default getIncomeExpense;

//  Si l'utilisateur n'est pas authentifié, une erreur "User not found" est retournée.
// La fonction récupère toutes les transactions associées à l'utilisateur dans la base de données.
// Elle extrait les montants des transactions pour les analyser.
// Les montants positifs sont additionnés pour calculer les revenus.
// Les montants négatifs sont additionnés, transformés en valeur absolue, pour calculer les dépenses.
// En cas de problème avec la base de données, une erreur "Database error" est retournée.
