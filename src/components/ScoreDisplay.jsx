import styles from "./ScoreDisplay.module.css";

const ScoreDisplay = ({ currentScore, topScore }) => {
  return (
    <div className={styles.display}>
      <div>Current Score: {currentScore}</div>
      <div>Top Score: {topScore}</div>
    </div>
  );
};

export default ScoreDisplay;
