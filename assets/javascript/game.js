var game = {
    words: ["color", "animals", "person", "beautifull", "javascript", "document", "index","welcome","goodbye","valentine"],
//     secondWord: "animals",
//     theredWord: "persone",
    dashes: [],
    chance: 12,
    firstTimePressKey: 0,
    pressedKey: [],
    getNextWord: 0,

    //display insert place (dashes) based on the number of letters 
    displayInsertPlace: function (word) {
        this.pressedKey = [];
        this.dashes = [];
        for (var i = 0; i < word.length; i++) {
            this.dashes[i] = "_";
        }
        document.getElementById("input").innerHTML = this.dashes.join(" ");
        document.getElementById("chance").innerHTML = this.chance.toString();
    },
    
    //display pressed key , it checks if the letter is exist and skip if it exist 
    dispalayAllPressedKey: function (inputKey) {
        var keyExist = false;
        if (this.chance > 0) {
            if (this.pressedKey.length === 0) {
                this.pressedKey.push(inputKey);
                document.getElementById("displayinput").innerHTML = this.pressedKey.join(" ");
            }
            else {
                for (var i = 0; i < this.pressedKey.length; i++) {
                    if (this.pressedKey[i] === inputKey) {
                        keyExist = true;
                    }
                }

                if (!keyExist) {
                    this.pressedKey.push(inputKey);
                    keyExist = false;
                }
                document.getElementById("displayinput").innerHTML = this.pressedKey.join(" ");
            }
        }
    },
    
    changeImage: function (x) {
        var img = document.getElementById('hangman');
        img.src = "assets/images/man" + x + ".png";
    },
    
    gussedWords: function (inputKey, word, dashes) {
        var gussedWords = false;
        if (this.chance > 0) {
            for (var j = 0; j < word.length; j++) {
                if (this.pressedKey.length === 0) {
                    this.pressedKey.push(inputKey);
                    document.getElementById("displayinput").innerHTML = this.pressedKey.join(" , ");
                }
                if (word.charAt(j) === inputKey) {
                    gussedWords = true;
//                     debugger;
                    this.dashes[j] = inputKey;
                    document.getElementById("input").innerHTML = this.dashes.join(" ");
                    this.dispalayAllPressedKey(inputKey);
                    document.getElementById("displayinput").innerHTML = this.pressedKey.join(" ");
                    if (word === this.dashes.join('')) {
                        //debugger;
                        game.changeImage(0);
                        document.getElementById("gameover").innerHTML = "you won";
                        this.firstTimePressKey = 0;
                    }
                }
                else {
                    this.dispalayAllPressedKey(inputKey);
                }
            }
            if (gussedWords === false) {
                //debugger;
                this.chance = this.chance - 1;
                document.getElementById("chance").innerHTML = this.chance.toString();
                 var audio = new Audio('assets/audio/Error-tone.mp3');
                  audio.play();
                switch(this.chance){
                case 0:
                    game.changeImage(7);
                    document.getElementById("gameover").innerHTML = "Game Over";
                    this.firstTimePressKey = 0;
                break
                case 11:
                    game.changeImage(2);
                break
                case 9:
                game.changeImage(3);
  
                break

                case 7:
                game.changeImage(3);
                break

                case 5:
                game.changeImage(4);
                break
                case 3:
                game.changeImage(5);
                break
                case 1:
                game.changeImage(6);
                break

                }
            }
        }
    },
    
    stsrtGame: function (e) {
        if (this.firstTimePressKey === 0) {
            game.changeImage(1);
            var randomNum = Math.floor((Math.random() * 9))
            randomWord = this.words[randomNum];
            game.displayInsertPlace(randomWord)
            document.getElementById("pressAnyKey").innerHTML = "Guess the word ";

            document.getElementById("gameover").innerHTML = " ";

            document.getElementById("displayinput").innerHTML = " ";
            document.getElementById("your-chance").innerHTML = "Your chance ";

            this.chance = 12;
            document.getElementById("chance").innerHTML = this.chance;
            document.getElementById("pressed-key").innerHTML = "Letters already guessed ";

            this.firstTimePressKey++;
        }

        else {

            this.gussedWords(e, randomWord, this.dashes)
        }

    },
}
document.onkeyup = function (e) {
    //debugger;
    game.stsrtGame(e.key);
     
}
function playAudio(){
    var audio = new Audio('assets/audio/Drum-loops-and-synth-loops.mp3');
      audio.loop=true;  
//       audio.volume = 0.2;
      audio.play();
}
