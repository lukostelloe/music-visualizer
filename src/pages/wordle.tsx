import React from "react";
import words from "../components/wordleArray";
import { useEffect, useState } from "react";
import "../app/globals.css";

//import the words to the file
//useEffect, select random word as the RandomWord
//create a 5x6 square playing board
//create a keyboard, either with input or mouse click?
//input the letter to the square on input
//create instances of checking the input with the RandomWord
//if selectedLetter[0] matches RandomWord[0] display as green
//if RandomWord.includes(selectedLetter[a]) display as yellow
// if RandomWord does not include selectedLetter[a] display as grey

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function Wordle() {
  const [randomWord, setRandomWord] = useState("");
  const [guesses, setguesses] = useState([]);
  const [boxColor, setBoxColor] = useState("");

  const boxStyling = `w-10 h-10 border-2 border-gray-500 p-5 m-1 flex items-center justify-center ${boxColor}`;

  useEffect(() => {
    setRandomWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const submitLetter = (e: { target: { innerText: string } }) => {
    const chosenLetter = e.target.innerText.toUpperCase();
    // @ts-ignore- the description is type never or something
    setguesses([...guesses, chosenLetter]);
    console.log(chosenLetter);
    console.log(guesses);
    if (randomWord.includes(chosenLetter)) {
      console.log("its a match");
      setBoxColor("bg-green-500");
    }
    if (!randomWord.includes(chosenLetter)) {
      console.log("no match there");
      setBoxColor("bg-red-500");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center ">
      <div className="border-b border-gray-500 w-screen flex justify-between items-align text-4xl mb-2 p-4">
        <div
          className="flex flex-col cursor-pointer item-center justify-center"
          onClick={() => console.log("hi")}
        >
          <div className="w-6 h-px bg-white m-1"></div>
          <div className="w-6 h-px bg-white m-1"></div>
          <div className="w-6 h-px bg-white m-1"></div>
        </div>
        <div className="font-sans hover:font-serif">Wordle</div>
        <div>x</div>
      </div>
      <div className="self-start">
        <div className="border border-white-500">menu</div>
      </div>

      <div className="grid-cols-5 mb-2">
        <div className="flex">
          <div className={boxStyling}>{guesses[0]}</div>
          <div className={boxStyling}>{guesses[1]}</div>
          <div className={boxStyling}>{guesses[2]}</div>
          <div className={boxStyling}>{guesses[3]}</div>
          <div className={boxStyling}>{guesses[4]}</div>
        </div>
        <div className="flex">
          <div className={boxStyling}>{guesses[5]}</div>
          <div className={boxStyling}>{guesses[6]}</div>
          <div className={boxStyling}>{guesses[7]}</div>
          <div className={boxStyling}>{guesses[8]}</div>
          <div className={boxStyling}>{guesses[9]}</div>
        </div>
        <div className="flex">
          <div className={boxStyling}>{guesses[10]}</div>
          <div className={boxStyling}>{guesses[11]}</div>
          <div className={boxStyling}>{guesses[12]}</div>
          <div className={boxStyling}>{guesses[13]}</div>
          <div className={boxStyling}>{guesses[14]}</div>
        </div>
        <div className="flex">
          <div className={boxStyling}>{guesses[15]}</div>
          <div className={boxStyling}>{guesses[16]}</div>
          <div className={boxStyling}>{guesses[17]}</div>
          <div className={boxStyling}>{guesses[18]}</div>
          <div className={boxStyling}>{guesses[19]}</div>
        </div>
        <div className="flex">
          <div className={boxStyling}>{guesses[20]}</div>
          <div className={boxStyling}>{guesses[21]}</div>
          <div className={boxStyling}>{guesses[22]}</div>
          <div className={boxStyling}>{guesses[23]}</div>
          <div className={boxStyling}>{guesses[24]}</div>
        </div>
        <div className="flex">
          <div className={boxStyling}>{guesses[25]}</div>
          <div className={boxStyling}>{guesses[26]}</div>
          <div className={boxStyling}>{guesses[27]}</div>
          <div className={boxStyling}>{guesses[28]}</div>
          <div className={boxStyling}>{guesses[29]}</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {alphabet.map((letter) => (
          <button
            key={Math.floor(Math.random() * 100000000) + 1}
            className="bg-gray-500 rounded text-white py-3"
            // @ts-ignore
            onClick={submitLetter}
          >
            {letter.toUpperCase()}
          </button>
        ))}
        <button className="bg-gray-500 rounded text-white px-2 py-3">
          Enter
        </button>
        <button className="bg-gray-500 rounded text-white px-2 py-3">
          Back
        </button>
      </div>
      <div>{randomWord}</div>
    </div>
  );
}

export default Wordle;
