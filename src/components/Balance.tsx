import getUserBalance from "@/actions/getUserBalance";
import { addComas } from "@/lib/utils";

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${addComas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </>
  );
};

export default Balance;
