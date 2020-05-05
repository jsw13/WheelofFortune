///Array of pokemon
const pokemonArray = {
    "PIKACHU": {"number": "025", "type": "Electric", "hint": "It is the electric mouse Pokemon."},
    "BULBASAUR": {"number": "001", "type": "Grass, Poison", "hint": "There is a seed on its back."},
    "IVYSAUR": {"number": "002", "type": "Grass, Poison", "hint": "There is a bud on its back."},
    "VENUSAUR": {"number": "003", "type": "Grass, Poison", "hint": "There is a large flower on its back."},
    "CHARMANDER": {"number": "004", "type": "Fire", "hint": "There is flame on its tail."},
    "CHARMELEON": {"number": "005", "type": "Fire", "hint": "It has sharp claws and a flame on its tail."},
    "CHARIZARD": {"number": "006", "type": "Fire, Flying", "hint": "It flies and breathes fire."},
    "SQUIRTLE": {"number": "007", "type": "Water", "hint": "It has a round shell and swims fast."},
    "WARTORTLE": {"number": "008", "type": "Water", "hint": "It has a shell and a large furry tail."},
    "BLASTOISE":{"number": "009", "type": "Water", "hint": "It shoots water from water cannons from its shell."}
}
// name = Object.keys(pokemonArray)[randomNumber]
// number = (Object.values(pokemonArray)[randomNumber]["number"]
// type = Object.values(pokemonArray)[randomNumber]["type"]
// hint = Object.values(pokemonArray)[randomNumber]["hint"]

// Possible Points Per Letter
const pointArray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 500, 600, 700, 2000, 200, -1000]
// const pointArray = [500, -1000]

var puzzle = ""
var score = 0
var points = 0

//Generates a random number in the range [0 - number-1]
function random(number) {
    return Math.floor(Math.random()*number);
}

// Display Message
function displayMessage(message) {
    let messageDiv = document.getElementById("message")
    if (message === points) {
        setTimeout(() => {messageDiv.innerHTML = `<p>${message}</p>`}, 5000)
    }
    else {
        messageDiv.innerHTML = `<p>${message}</p>`;
    }
}

//Display Picture on Left
function displayPictureLeft(title) {
    const left = document.querySelector(".left")
    const image = "img/" + title + ".png"
    left.innerHTML = `<img src="${image}" width="100px"></img>`
}

// Clear Picture on Left
function clearPictureRight() {
    const left = document.querySelector(".left")
    left.innerHTML = ""
}

//Display Picture on Right
function displayPictureRight(title) {
    const right = document.querySelector(".right")
    const image = "img/" + title + ".png"
    right.innerHTML = `<img src="${image}" width="100px"></img>`
}

// Clear Picture on Right
function clearPictureRight() {
    const right = document.querySelector(".right")
    right.innerHTML = ""
}

// Generate the alphabet buttons
function createAlphabet() {
    const alphabetDiv = document.getElementById("alphabet")
    alphabetDiv.innerHTML = null
    for (i = 65; i < 91; i++) {
        let alphabetBtn = document.createElement("button")
        alphabetBtn.innerHTML = String.fromCharCode(i);
        alphabetBtn.className = "abc"
        alphabetBtn.id = "abc"
        alphabetDiv.appendChild(alphabetBtn)
    }
}

//Disable Alphabet
function disableAlphabet() {
    let childNodes = document.getElementById("alphabet").getElementsByTagName('*');
    for (let node of childNodes) {
        node.disabled = true;
    }
}

//Enable Alphabet
function enableAlphabet() {
    var childNodes = document.getElementById("alphabet").getElementsByTagName('*');
    for (var node of childNodes) {
        if (node.innerHTML !== "-") {
            node.disabled = false;
        }
    }
}

// Create Spin Button
function createSpinButton() {
    const spinDiv = document.getElementById("spin")
    spinDiv.innerHTML = null
    const spinBtn = document.createElement("button")
    spinBtn.innerHTML = "Spin"
    spinBtn.id = "spinBtn"
    spinDiv.appendChild(spinBtn)
}

// Disable Spin Button
function disableSpinButton() {
    const spinBtn = document.getElementById("spinBtn")
    spinBtn.style.backgroundColor = "gray"
    spinBtn.disabled = true
}

// Enable Spin Button
function enableSpinButton() {
    const spinBtn = document.getElementById("spinBtn")
    spinBtn.style.backgroundColor = "orange"
    spinBtn.disabled = false
}


// Create Wheel
function createWheel() {
    const wheelDiv = document.getElementById("wheelDiv")
    wheelDiv.innerHTML = `<img id="wheel" src="img/wheel.png">`
    const pointerDiv = document.getElementById("pointerDiv")
    pointerDiv.innerHTML = '<img id="pointer" src="img/pointer.png">'
}

// Create Total Score Counter
function displayScore(score) {
    const scoreboard = document.getElementById("score")
    scoreboard.innerHTML = `${score}`
}

// Display Points Per Letter
// function displayPoints(points) {
//     const pointsDiv = document.getElementById("points")
//     pointsDiv.innerHTML = `${points}`
// }

// Add Points to Score
function addPoints(score, points) {
    console.log("score", score, "points", points)
    score += points
    return score
}

// Subtract Points from Score
function subtractPoints(score, points) {
    console.log("score", score, "points", points)
    score -= points
    return score
}

// Display Points for the Round
function getPoints() {
    const randomNumber = random(16);
    const points = pointArray[randomNumber]
    return points
}

// Gets puzzle word from bank
function getPuzzle() {
    const number = random(10)
    const puzzle = Object.entries(pokemonArray)[number]
    return puzzle
}

// Creates puzzle 
function createPuzzle() {
    const name = puzzle[0]
    const puzzleDiv = document.getElementById("puzzleDiv")
    puzzleDiv.innerHTML = ""
    for (i=0; i<name.length; i++) {
        const boxDiv = document.createElement("div")
        boxDiv.className = "box"
        boxDiv.id = `box${i}`
        boxDiv.innerHTML = "?"
        puzzleDiv.appendChild(boxDiv)
    }
}

// Guess letter of puzzle
function guessLetter(event, puzzle) {
    const guess = event.target.innerHTML
    const answer = puzzle[0]
    let count = 0
    for (i=0; i<answer.length; i++) {
        const boxId = `box${i}`
        if (guess == answer.charAt(i)) {
            const box = document.getElementById(boxId)
            box.innerHTML = guess
            box.style.backgroundColor = "yellow"
            count += 1
        }
    }
    event.target.innerHTML = "-"
    event.target.disabled = "disabled"
    event.target.style.backgroundColor = "rgb(187, 176, 116)"
    return count
}

// Check if puzzle is solved
function checkPuzzle(puzzle) {
    const complete = puzzle[0].length
    let check = 0
    for (i=0; i<complete; i++) {
        element = `#box${i}`
        const contents = document.querySelector(element).innerHTML 
        if (contents !== "?") {
            check += 1
        }
    }
    if (check == complete) {
        displayMessage("Congratulations!!")
        displayPictureLeft(puzzle[1]["number"])
        disableSpinButton()
        disableAlphabet()
    }
}

// Click the play button
document.getElementById("playBtn").addEventListener("click", function() {
    createAlphabet()
    disableAlphabet()
    createSpinButton()
    enableSpinButton()
    // displayPoints("")
    displayScore(score)
    displayMessage("")
    displayPictureLeft("000")
    displayPictureRight("red")
    createWheel()
    puzzle = getPuzzle()
    createPuzzle(puzzle)
})

// Click the spin button
document.addEventListener('click',function(e) {
    if(e.target && e.target.id == 'spinBtn') {
        displayMessage("")

        const wheel = document.getElementById('wheel');
        e.target.style.pointerEvents = 'auto';
        deg = Math.floor(2500 + Math.random() * 2500);
        console.log("deg", deg)
        wheel.style.transition = 'all 5s ease-out';
        wheel.style.transform = `rotate(${deg}deg)`;
        wheel.classList.add('blur');
        console.log("actualdeg", deg % 360);
        console.log(Math.floor((360 - (deg % 360)) / 15))
        console.log(wheelvalue[Math.floor((360 - (deg % 360)) / 15)])

        wheel.addEventListener('transitionend', () => {
            console.log("transition ended")
            wheel.classList.remove('blur');
            // e.target.style.pointerEvents = 'none';
            wheel.style.transition = 'none';
            const absDeg = deg % 360;
            wheel.style.transform = `rotate(${absDeg}deg)`;
        })
        
        points = wheelvalue[Math.floor((360 - (deg % 360)) / 15)]
        disableSpinButton()
        enableAlphabet()
        displayMessage(points)
        if (points < 0) {
            score = addPoints(score, points)
            displayMessage(`${points}!!`)
            enableSpinButton()
            disableAlphabet()
        }
        displayScore(score)
     }
 })


 // Click an alphabet button
document.addEventListener('click',function(e){
    if(e.target && e.target.id == 'abc'){
        const guess = e.target.innerHTML
        const count = guessLetter(e, puzzle)
        const roundPoints = points * count
        if (count == 0) {
            score = subtractPoints(score, 500)
            displayMessage(`No ${guess} ... -500 :(`)
        }
        else {
            score = addPoints(score, roundPoints)
            if (count == 1) {
                displayMessage(`${guess} ... +${roundPoints} !!`)
            }
            else {
                displayMessage(`${count} ${guess}'s ... +${roundPoints} !!`)
            }
        }
        displayScore(score)
        disableAlphabet()
        enableSpinButton()
        checkPuzzle(puzzle)
     }
 })
 

 const wheelvalue = [500,400,900,0,600,700,800,-1,300,450,600,750,500,0,3000,
    600,700,350,500,800,300,400,650,1000]
    let deg = 0;
