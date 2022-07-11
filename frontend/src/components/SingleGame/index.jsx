import { useSingle } from "../../hooks/useSingleBattle";
import SelectionButtons from "../SelectionButtons";
import SingleBattle from "../SingleBattle";

const SingleGame = () => {
  const { isBattle } = useSingle();
  if (isBattle) {
    return <SingleBattle />;
  }
  return <SelectionButtons />;
};
export default SingleGame;
