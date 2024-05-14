import styles from "./ScoreDisplay.module.css";

const ScoreDisplay = ({ currentScore, topScore }) => {
  return (
    <div className={styles.display}>
      <div>
        Get points by clicking on an image but don't click on any more than
        once!
      </div>
      <p style={{ fontSize: "10px" }}></p>
      <div>Current Score: {currentScore}</div>
      <div>Top Score: {topScore}</div>
    </div>
  );
};

export default ScoreDisplay;
