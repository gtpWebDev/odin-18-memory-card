import styles from "./Card.module.css";

const Card = (props) => {
  function cardClick() {
    if (props.card.selected) {
      // card previously selected, end game
      props.endGameFn(props.card.id);
    } else {
      // card not previously selected, continue game
      props.continueGameFn(props.card.id);
    }
  }

  return (
    <div onClick={cardClick} className={styles.card}>
      {/* <p>{props.card.text}</p> */}
      <img src={props.card.imgUrl} alt="" />
      {/* <p>{props.card.selected ? "yes" : "no"}</p> */}
    </div>
  );
};

export default Card;
