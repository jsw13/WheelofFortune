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
const pointArray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 500, 600, 700, 2000, 200, "Bankrupt!"]

//Generates a random number in the range [0 - number-1]
function random(number) {
    return Math.floor(Math.random()*number);
}

// Display Message
function displayMessage(message) {
    let messageDiv = document.getElementById("message")
    messageDiv.innerHTML = `<p>${message}</p>`;
}

// Create Spin Wheel
function createWheel() {
    const wheelDiv = document.getElementById("wheel")
    wheelDiv.innerHTML = null
    const spinBtn = document.createElement("button")
    spinBtn.innerHTML = "Spin"
    spinBtn.id = "spinBtn"
    wheelDiv.appendChild(spinBtn)
}

// Disable Spin Wheel Button
function disableWheel() {
    document.querySelector("#spinBtn").style.backgroundColor = "gray"
    document.querySelector("#spinBtn").disabled = true
}

// Enable Spin Wheel Button
function enableWheel() {
    document.querySelector("#spinBtn").style.backgroundColor = "orange"
    document.querySelector("#spinBtn").disabled = false
}

// Create Total Score Counter
function createScore(score) {
    const scoreboard = document.querySelector("#score")
    scoreboard.innerHTML = `${score}`
}

// Display Points Per Letter
function displayPoints(points) {
    const pointsDiv = document.getElementById("points")
    pointsDiv.innerHTML = `${points}`
}

// Add Points to Score
function addScore() {
    disableWheel()
    enableAlphabet()
    const randomNumber = random(16);
    randomPoints = pointArray[randomNumber]
    if (randomPoints == "Bankrupt!") {
        randomPoints = 0;
        score = 0;
        displayMessage("Bankrupt!")
        createScore(score)
        enableWheel()
        disableAlphabet()
    }
    displayPoints(randomPoints)
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

// Creates puzzle
function createPuzzle() {
    let number = random(10)
    let puzzle = Object.entries(pokemonArray)[number]
    let name = puzzle[0]
    const puzzleDiv = document.getElementById("puzzleDiv")
    puzzleDiv.innerHTML = ""
    for (i=0; i<name.length; i++) {
        let boxDiv = document.createElement("div")
        boxDiv.className = "box"
        boxDiv.id = `box${i}`
        boxDiv.innerHTML = "?"
        puzzleDiv.appendChild(boxDiv)
    }
    return puzzle
}

// Guess letter
function solvePuzzle(event, puzzle, points) {
    const guess = event.target.innerHTML
    const answer = puzzle[0]
    for (i=0; i<answer.length; i++) {
        let boxId = `box${i}`
        if (guess == answer.charAt(i)) {
            let box = document.getElementById(boxId)
            box.innerHTML = guess
            box.style.backgroundColor = "yellow"
            score += points
        }
    }
    if (answer.includes(guess) == false) {
        score -= 100
    }
    event.target.innerHTML = "-"
    event.target.disabled = "disabled"
    event.target.style.backgroundColor = "rgb(187, 176, 116)"
    disableAlphabet()
    enableWheel()
    createScore(score)
    checkPuzzle(puzzle)
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
        disableWheel()
        disableAlphabet()
    }
}

var randomPoints = 0
var score = 0
var puzzle = ""

function start() {
    createAlphabet()
    disableAlphabet()
    createWheel()
    enableWheel()
    displayPoints("")
    createScore(score)
    displayMessage("")
    displayPictureLeft("000")
    displayPictureRight("red")
    puzzle = createPuzzle();
}

document.getElementById("playBtn").addEventListener("click", start)

document.addEventListener('click',function(e){
    if(e.target && e.target.id == 'spinBtn'){
        displayMessage("")
        addScore()
     }
 })

document.addEventListener('click',function(e){
    if(e.target && e.target.id == 'abc'){
        solvePuzzle(e, puzzle, randomPoints)
     }
 })



