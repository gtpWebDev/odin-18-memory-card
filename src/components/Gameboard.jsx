import styles from "./Gameboard.module.css";
import Card from "./Card.jsx";

const Gameboard = (props) => {
  return (
    <main className={styles.gameboard}>
      {/* Index key ok as will be a static array on setup */}
      {props.cards.map((card) => {
        return (
          <div key={card.id}>
            <Card
              card={card}
              endGameFn={props.endGameFn}
              continueGameFn={props.continueGameFn}
            />
          </div>
        );
      })}
    </main>
  );
};

export default Gameboard;
