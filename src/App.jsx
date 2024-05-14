import { useState, useEffect } from "react";

import Gameboard from "./components/Gameboard.jsx";
import ScoreDisplay from "./components/ScoreDisplay.jsx";
import Header from "./components/Header.jsx";

import getFxhashProjectData from "./utility/apiQuery.js";

function App() {
  const numberOfCards = 12;

  const [cardArray, setCardArray] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

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
    let arrayCopy = cardArray;
    arrayCopy.forEach((element) => (element.selected = false));
    setCardArray(arrayCopy);
  };

  const cbfn_continueGame = (cardId) => {
    setCurrentScore(currentScore + 1);
    updateSelectedCard(cardId);
    randomiseCards();
  };

  const cbfn_endGame = () => {
    currentScore > topScore ? setTopScore(currentScore) : null;
    setCurrentScore(0);
    resetCards();
    randomiseCards();
  };

  useEffect(() => {
    setIsLoading(true);
    async function getImageData() {
      // collect image data from fxhash API
      // trying out old style promise structure rather than handling error in async function
      getFxhashProjectData(numberOfCards)
        .then((res) => {
          setCardArray(res);
        })
        .catch(() => {
          setIsError(true);
          setErrorText("Sorry, the fxhash project data is unavailable");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getImageData();

    return () => {
      // Cancelling an async function is non trivial. no clean up required. once only load at app level
    };
  }, []);

  return (
    <>
      <Header />
      <ScoreDisplay currentScore={currentScore} topScore={topScore} />
      {isLoading ? <p>Loading pics</p> : null}
      {isError ? (
        <p>{errorText}</p>
      ) : (
        <Gameboard
          cards={cardArray}
          continueGameFn={cbfn_continueGame}
          endGameFn={cbfn_endGame}
        />
      )}
    </>
  );
}

export default App;
