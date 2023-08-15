window.onload = () => {
  const keyboard = document.querySelector(`.keyboard`);
  const header = document.querySelector(`.wrapper header`);
  const headerBtn = document.querySelectorAll(`.wrapper header button`);
  const hintBox = document.querySelector(`.word-box p b`);
  const incorrectBox = document.querySelector(`.word-box .incorrect b`);
  const wordDisplay = document.querySelector(`.word-display`);
  const hangmanImg = document.querySelector(`.hangman-image img`);
  const gameModal = document.querySelector(`.game-modal`);
  const gameModalImg = document.querySelector(`.game-modal img`);
  const gameModalH4 = document.querySelector(`.game-modal h4`);
  const gameModalP = document.querySelector(`.game-modal p`);
  const playAgain = document.querySelector(`#play-again`);

  let audioCorrect = new Audio();

  audioCorrect.src = `https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=correct-2-46134.mp3`;

  let audioIncorrect = new Audio();

  audioIncorrect.src = `https://cdn.pixabay.com/download/audio/2022/11/21/audio_136661e554.mp3?filename=decidemp3-14575.mp3`;

  let currentWord,
    numberOfWrongGuesses = 0,
    maxGuesses = 6,
    hangManImageCount = 4,
    correctLetters = [],
    listVariable,
    arrVoice = [
      "Awesome",
      "Bull'seye",
      "incredible",
      "great",
      "nice",
      "you rock",
      "amazing",
      "fantastic",
      "You're on fire",
      "unstoppable",
    ];

  // Array of objects of all questions
  const generalList = [
    {
      word: `guitar`,
      hint: `A musical instrument with strings.`,
    },

    {
      word: `oxygen`,
      hint: `A colorless and odourless gas essential for life.`,
    },

    {
      word: `mountain`,
      hint: `A large natural elevation of the earth surface.`,
    },

    {
      word: `painting`,
      hint: `An art form usimg colors on a surface to create images or expressions. `,
    },

    {
      word: `astronomy`,
      hint: `The scientific stidy of celestials objects and phenomena.`,
    },

    {
      word: `football`,
      hint: `A popular sport played with a spherical ball.`,
    },

    {
      word: `chocolate`,
      hint: `A sweet treat made from coco beans.`,
    },

    {
      word: `butterfly`,
      hint: `An insect with colorful wings and slender body.`,
    },

    {
      word: `history`,
      hint: `The study of past events and human civilization.`,
    },

    {
      word: `pizza`,
      hint: `A savory dish consisting of a round, flattened base with toppings.`,
    },

    {
      word: `jazz`,
      hint: `A genre of music characterized by improvisation and syncopation. `,
    },

    {
      word: `camera`,
      hint: `A device used to capture images or videos.`,
    },

    {
      word: `diamond`,
      hint: `A precious stone known for its brilliance and hardness.`,
    },

    {
      word: `adventure`,
      hint: `An exciting or daring experience.`,
    },

    {
      word: `science`,
      hint: `The systematic study of the structure and behaviour of the physical and natural world.`,
    },

    {
      word: `bicycle`,
      hint: `A human powered vehicle with two wheels.`,
    },

    {
      word: `sunset`,
      hint: `The daily disappearance of the sun below the horizon.`,
    },
  ];

  const animalsList = [
    {
      word: `purple`,
      hint: `Color of the tongue of a giraffe.`,
    },

    {
      word: `koalas`,
      hint: `An animal known to spend 90% of its day sleeping.`,
    },

    {
      word: `tiger`,
      hint: `An animal with stripes on their skin as well as their fur.`,
    },

    {
      word: `four`,
      hint: `Number of compartments in a cow’s stomach. `,
    },

    {
      word: `cheetah`,
      hint: `Name of the fastest land animal.`,
    },

    {
      word: `bat`,
      hint: `The only mammal that’s able to fly.`,
    },

    {
      word: `cat`,
      hint: `An animal said to have nine lives.`,
    },

    {
      word: `butterfly`,
      hint: `An insect with colorful wings and slender body.`,
    },

    {
      word: `elephant`,
      hint: `The only mammal that can’t jump.`,
    },

    {
      word: `kangaroo`,
      hint: `An animal that can stand on its tail.`,
    },

    {
      word: `giraffe`,
      hint: `tallest animal in the world.`,
    },

    {
      word: `four`,
      hint: `Total number of layers of skin owned by a chameleon.`,
    },

    {
      word: `tongue`,
      hint: `Part of the body a snake use in smelling.`,
    },

    {
      word: `anaconda`,
      hint: `largest snake in the world.`,
    },

    {
      word: `chameleon`,
      hint: `Reptile known for the ability to change its body color. `,
    },

    {
      word: `lizard`,
      hint: `A type of reptile that can detach its tail when in danger and then regrow it.`,
    },

    {
      word: `tadpole`,
      hint: `The larvae stage of a frog.`,
    },
  ];

  const fruitList = [
    {
      word: `cherry`,
      hint: `A type of berry toxic to dogs.`,
    },

    {
      word: `water`,
      hint: `watermelon contains 92% of...`,
    },

    {
      word: `vitaminc`,
      hint: `Richest vitamin in Lemon. `,
    },

    {
      word: `pottasium`,
      hint: `mineral got from Banana.`,
    },

    {
      word: `india`,
      hint: `Country with 50% of the world's mango production.`,
    },

    {
      word: `coconut`,
      hint: `A kind of fruit with milk on the inside.`,
    },

    {
      word: `banana`,
      hint: `A fruit with a very slippy peel.`,
    },

    {
      word: `apple`,
      hint: `A fruit the wicked witch tried to poison Snow White with.`,
    },

    {
      word: `melon`,
      hint: `Another named fruit that can be got from the fruit with name LEMON.`,
    },

    {
      word: `strawberry`,
      hint: `The only fruit to have its seeds on the outside.`,
    },

    {
      word: `cockroaches`,
      hint: `Insects Osage orange fruits are used to repel.`,
    },

    {
      word: `grape`,
      hint: `Fruit, often used to make wine, typically grows on vines.`,
    },

    {
      word: `pineapple`,
      hint: `An edible fruit containing a substance that eats your flesh on a small scale.`,
    },

    {
      word: `coconut`,
      hint: `A fruit with three "eyes".`,
    },

    {
      word: `guava`,
      hint: `Fruit with the most vitamin C.`,
    },

    {
      word: `pomology`,
      hint: `The science of fruit growing.`,
    },

    {
      word: `hand`,
      hint: `A cluster of bananas.`,
    },
  ];

  // End of Array of questions;

  listVariable = listVariable ? listVariable : generalList;

  // Adding buttons dynamically.

  for (let i = 97; i <= 122; i++) {
    let button = document.createElement(`button`);

    button.innerText = String.fromCharCode(i);

    keyboard.appendChild(button);

    button.addEventListener(`click`, (e) => {
      initGame(e.target, String.fromCharCode(i));
    });
  }

  function initGame(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
      [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
          // Push letter into correctLetters [] only if li[index] is empty.
          let li = wordDisplay.querySelectorAll(`li`);

          if (li[index].innerText !== "") {
          } else {
            correctLetters.push(letter);
          } // End of pushing letters.

          wordDisplay.querySelectorAll(`li`)[index].innerText = letter;

          wordDisplay.querySelectorAll(`li`)[index].classList.add(`guessed`);
        }
      });
    } else {
      numberOfWrongGuesses++;

      hangManImageCount++;

      incorrectBox.innerText = `${numberOfWrongGuesses}/${maxGuesses}`;

      hangmanImg.src = `https://www.oligalma.com/downloads/images/hangman/hangman/${hangManImageCount}.jpg `;

      audioIncorrect.play();

      //if user fails guess up to 3 times, automatically inputs a letter inside <li> randomly.

      if (numberOfWrongGuesses === 3) {
        [...currentWord].forEach((letter, index) => {
          let li = wordDisplay.querySelectorAll(`li`);

          let rnd = Math.floor(Math.random() * li.length);

          if (index === rnd && li[rnd].innerText === "") {
            li[rnd].innerText = letter;

            li[rnd].classList.add(`guessed`);

            li[rnd].style.color = `blue`;

            correctLetters.push(letter);
          }
        });
      } // End of Auto letter input on wrong guess === 3

      //if user fails guess up to 5 times, automatically inputs a letter randomly.

      if (numberOfWrongGuesses === 5) {
        [...currentWord].forEach((letter, index) => {
          let li = wordDisplay.querySelectorAll(`li`);

          if (index === 0 && li[index].innerText === "") {
            li[index].innerText = letter;

            li[index].classList.add(`guessed`);

            li[index].style.color = `blue`;

            correctLetters.push(letter);
          }
        });
      } // End of Auto letter input on wrong guess === 5
    } // End of If/else;

    button.disabled = true;

    if (correctLetters.length === currentWord.length) {
      gameOver(true);

      audioCorrect.play();

      let randomNumb = Math.floor(Math.random() * arrVoice.length);

      responsiveVoice.speak(arrVoice[randomNumb], `UK English Male`);
      wordDisplay.querySelectorAll(`li`).forEach((li) => {
        li.classList.add(`correctColor`);
      });
    }

    if (numberOfWrongGuesses === maxGuesses) {
      gameOver(false);

      keyboard
        .querySelectorAll(`button`)
        .forEach((btn) => (btn.disabled = true));
    }
  }

  // A () triggered when opens our game modal;

  function gameOver(isVictorous) {
    setTimeout(() => {
      gameModal.classList.add(`show`);

      gameModalImg.src = `${
        isVictorous
          ? "https://i.pinimg.com/originals/c4/0e/e7/c40ee7cd71f5d81a6321bec63489fd7f.gif"
          : "https://media.tenor.com/1ApT-pZWryIAAAAM/crying-emoji.gif"
      }`;

      gameModalH4.innerText = `${
        isVictorous ? "Congratulation!" : "Game Over"
      }`;

      let modalText = `${
        isVictorous ? " You Found The Right Word" : "The Right Word is"
      }`;

      gameModalP.innerHTML = `${modalText} : <b>${currentWord.toUpperCase()}</b>`;
    }, 2000);
  }

  header.addEventListener(`click`, (e) => {
    if (e.target.id === `general`) {
      listVariable = generalList;

      randomWord(generalList);

      loopButton("General");

      Swal.fire({
        icon: "success",
        title: "GENERAL",
        text: "This section is designated for general questions",
        confirmButtonColor: "#FE4A49",
      });
    }

    if (e.target.id === `animals`) {
      listVariable = animalsList;

      randomWord(animalsList);

      loopButton("Animals");

      Swal.fire({
        icon: "success",
        title: "ANIMALS",
        text: "This section is designated for Animal related questions",
        confirmButtonColor: "#FE4A49",
      });
    }

    if (e.target.id === `fruits`) {
      listVariable = fruitList;

      randomWord(fruitList);

      loopButton("Fruits");

      Swal.fire({
        icon: "success",
        title: "fruits",
        text: "This section is designated for Fruits related questions",
        confirmButtonColor: "#FE4A49",
      });
    }
  });

  // A () that loads questions to our screen, this () is triggered on start.

  function randomWord(getList) {
    const { word, hint } = getList[Math.floor(Math.random() * getList.length)];

    currentWord = word;

    hintBox.innerText = hint;

    wordDisplay.innerHTML = word
      .split("")
      .map(() => `<li class="letter"></li>`)
      .join("");

    resetGame();
  }

  playAgain.addEventListener(`click`, () => {
    randomWord(listVariable);
  });

  function resetGame() {
    gameModal.classList.remove(`show`);

    numberOfWrongGuesses = 0;

    hangManImageCount = 4;

    correctLetters = [];

    hangmanImg.src = `https://www.oligalma.com/downloads/images/hangman/hangman/${hangManImageCount}.jpg `;
    keyboard
      .querySelectorAll(`button`)
      .forEach((button) => (button.disabled = false));

    wordDisplay.innerHTML = currentWord
      .split("")
      .map(() => `<li class="letter"></li>`)
      .join("");

    incorrectBox.innerText = `${numberOfWrongGuesses}/${maxGuesses}`;
  }

  function loopButton(value) {
    headerBtn.forEach((button) => {
      if (button.innerText === value) {
        button.classList.add(`active`);
      } else {
        button.classList.remove(`active`);
      }
    });
  }

  // calls this () on window load;
  randomWord(generalList);

  loopButton("General");

  // Fires on start
  Swal.fire({
    title: "Hang Man",
    text: `Save MR JOHN from hanging by filling in columns with right answers.
              Use Hints for guidiance👍`,
    imageUrl:
      "https://www.oligalma.com/downloads/images/hangman/hangman/10.jpg",
    imageWidth: 250,
    imageHeight: 200,
    imageAlt: "Custom image",
    confirmButtonColor: "#FE4A49",
  });
}; //General ()✅;
