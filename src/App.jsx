import { useState, useEffect } from "react";

import Gameboard from "./components/Gameboard.jsx";
import ScoreDisplay from "./components/ScoreDisplay.jsx";
import Header from "./components/Header.jsx";

import getFxhashProjectData from "./utility/apiQuery.js";

const internetWorking = true;

function App() {
  const numberOfCards = 12;

  const [cardArray, setCardArray] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const updateSelectedCard = (id) => {
    const cardIndex = cardArray.findIndex((card) => card.id === id);
    let arrayCopy = cardArray;
    arrayCopy[cardIndex].selected = true;
    setCardArray(arrayCopy);
  };

  const randomiseCards = () => {
    let arrayCopy = cardArray;
    arrayCopy.forEach((element) => (element.rand = Math.random()));
    setCardArray(arrayCopy);
  };

  const resetCards = () => {
    // reset all selected cards to not selected
    let arrayCopy = cardArray;
    arrayCopy.forEach((element) => (element.selected = false));
    setCardArray(arrayCopy);
  };

  const cbfn_continueGame = (cardId) => {
    // update card to selected, iterate score and randomise cards
    setCurrentScore(currentScore + 1);
    updateSelectedCard(cardId);
    randomiseCards();
  };

  const cbfn_endGame = () => {
    // update top score if appropriate, reset score, reset card selections
    currentScore > topScore ? setTopScore(currentScore) : null;
    setCurrentScore(0);
    resetCards();
    randomiseCards();
  };

  useEffect(() => {
    console.log("Useeffect");

    async function getImageData() {
      let constructedArray = [];

      if (internetWorking) {
        // collect image data from fxhash API
        for (let i = 0; i < numberOfCards; i++) {
          const imageData = await getFxhashProjectData();
          const card = {
            id: i,
            rand: Math.random(),
            imgUrl: imageData.thumbnailUrl,
            text: imageData.projectName + " by " + imageData.artistName,
            selected: false,
          };
          constructedArray.push(card);
        }
        setCardArray(constructedArray);
      } else {
        // pretend collecting array details from an API
        let constructedArray = [];
        for (let i = 0; i < numberOfCards; i++) {
          const card = {
            id: i,
            rand: Math.random(),
            imgUrl: "",
            text: Math.round(500 * Math.random()).toString(),
            selected: false,
          };
          constructedArray.push(card);
        }
        setCardArray(constructedArray);
      }
    }
    getImageData();

    return () => {
      console.log("Clean up");
    };
  }, []);

  return (
    <>
      <Header />
      <ScoreDisplay currentScore={currentScore} topScore={topScore} />
      <Gameboard
        cards={cardArray}
        continueGameFn={cbfn_continueGame}
        endGameFn={cbfn_endGame}
      />
    </>
  );
}

export default App;
