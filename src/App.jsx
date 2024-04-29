import { useState, useEffect } from "react";

import Gameboard from "./components/Gameboard.jsx";
import ScoreDisplay from "./components/ScoreDisplay.jsx";
import Header from "./components/Header.jsx";

function App() {
  // for now set up a constant array

  const [cardArray, setCardArray] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const updateSelectedCard = (id) => {
    const cardIndex = cardArray.findIndex((card) => card.id === id);
    let copyArray = cardArray;
    copyArray[cardIndex].selected = true;
    setCardArray(copyArray);
  };

  const resetCards = () => {
    // reset all selected cards to not selected
    let arrayCopy = cardArray;
    arrayCopy.forEach((element) => (element.selected = false));
  };

  const cbfn_continueGame = (cardId) => {
    // update card to selected, iterate score and randomise cards
    setCurrentScore(currentScore + 1);
    updateSelectedCard(cardId);
    // RANDOMISE CARDS!
  };

  const cbfn_endGame = (cardId) => {
    // update top score if appropriate, reset score, reset card selections
    currentScore > topScore ? setTopScore(currentScore) : null;
    setCurrentScore(0);
    resetCards();
    // RANDOMISE CARDS!
  };

  useEffect(() => {
    console.log("Useeffect");

    // pretend collecting array details from an API
    setCardArray([
      {
        id: 1,
        imgUrl: "",
        text: "Card1",
        selected: false,
      },
      {
        id: 2,
        imgUrl: "",
        text: "Card2",
        selected: false,
      },
      {
        id: 3,
        imgUrl: "",
        text: "Card3",
        selected: false,
      },
      {
        id: 4,
        imgUrl: "",
        text: "Card4",
        selected: false,
      },
      {
        id: 5,
        imgUrl: "",
        text: "Card5",
        selected: false,
      },
    ]);

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

/*

Game:
  - start, generate X number of cards with information (image and text) collected from an API
  - game is to select a card and score a point
  - if player has already clicked on that card, game over and score reset to zero
  - if player has not already clicked on that card, score increases by 1

Keep track of current score and best score
No need for a reset or anything.


Design:

  1. Game loop
    Initial setup on page load
      - through an API collect a set number of card info - images, text, etc.
      - initialise game - set score to zero, reset chosenCards to empty array

    Click on card:
      - Check card against previous chosen
      - if not chosen:
        - score + 1
      - if chosen:
        - game over, update high score if highest, reset current score to zero
      - either way, randomise cards on screen

  1b. Data design
    cardArray : [
      {
        id,
        imgUrl,
        text,
        selected
      }
    ]

  2. Component design
    Top App Component:
      useeffect - get the card info from an API, load into state array, use uuid for card ids, possible random num for sorting?
      state - cardArray
      state - currentScore
      state - topScore
      
      local function, randomise cards:
        - updating card random numbers, let react order them auto
        - may have to be a separate array for random numbers?
        - or some kind of algorithm THINK ABOUT THIS

      cbfn_updateCurrentScore:
        - iterate current score by 1
        - randomise cards
      cbfn endGame:
        - if score > topScore, update topScore
        - reset currentScore to zero
        - randomise cards

      children - Gameboard, ScoreDisplay

    Gameboard:
      props - cardArray
      content - map the card array to an array of Card components, sorted by array random numbers

    Card:
      props - card id, card image, card name
      state - selected
      content - image and text
      onClick (logic above)
        if not selected:
          - update state to selected
          - invoke cbfn_updateCurrentScore
        if selected
          - 
    

  3. Page structure
    Design stage:
      Title
      Scores
      Gameboard -> Cards




*/
