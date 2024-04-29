import styles from "./Gameboard.module.css";

const Gameboard = ({ cards }) => {
  return (
    <main className={styles.gameboard}>
      {cards.map((card) => {
        return <Card key={card.id} text={card.text} />;
      })}
    </main>
  );
};

const Card = ({ text }) => {
  return <div className={styles.card}>{text}</div>;
};

export default Gameboard;
