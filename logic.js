//TODOS:
//Check if another player is joined in game, or when a player does join
//check if player made a move and compare moves

let rock = $("#submit-rock"),
  paper = $("#submit-paper"),
  scissors = $("#submit-scissors")

let playerName,
  nameInput = $("#name-input"),
  nameSubmit = $("#submit-name")

let game,
  gameInput = $("#game-input"),
  gameSubmit = $("#submit-game")

let player

let player1Choice = "!",
  player2Choice = "!"

function nameValidation(name) {
  if (name === "" || name === null) {
    alert("please fill out a name and try again")
  } else {
    playerName = name;
    nameSubmit.prop("disabled", true)
    nameInput.prop("disabled", true)
    gameInput.prop("disabled", false)
    gameSubmit.prop("disabled", false)
    rock.prop("disabled", false)
    paper.prop("disabled", false)
    scissors.prop("disabled", false)
  }
}

function startGame() {
  player1Choice = "!"
  player2Choice = "!"

  db.ref().set({
    
  })
}

function whoWon() {
  if (player1Choice === "rock" && player2Choice === "rock") {
    return "tie"
  }
  if (player1Choice === "rock" && player2Choice === "paper") {
    return "player2"
  }
  if (player1Choice === "rock" && player2Choice === "scissors") {
    return "player1"
  }

  if (player1Choice === "paper" && player2Choice === "rock") {
    return "player1"
  }
  if (player1Choice === "paper" && player2Choice === "paper") {
    return "tie" 
  }
  if (player1Choice === "paper" && player2Choice === "scissors") {
    return "player2"
  }

  if (player1Choice === "scissors" && player2Choice === "rock") {
    return "player2"
  }
  if (player1Choice === "scissors" && player2Choice === "paper") {
    return "player1"    
  }
  if (player1Choice === "scissors" && player2Choice === "scissors") {
    return "tie"
    
  }
}

function joinGame() {
  db.ref().once("value", function (snapshot) {

    if (snapshot.exists()) {
      let data = snapshot.val()
      console.log(data)
      if (data.gameData.players === 1) {
        player = 2
        db.ref(`/gameData`).set({
          players: 2
        })
      } else if (data.gameData.players >= 2) {
        alert("nope, it dun broked")
      } else {

      }
    } else {
      console.log("PLAYER 1")
      player = 1
      db.ref(`/gameData`).set({
        players: 1
      })
      alert("waiting for player 2")
    }

  })
}

rock.prop("disabled", true)
paper.prop("disabled", true)
scissors.prop("disabled", true)
gameSubmit.prop("disabled", true)
gameInput.prop("disabled", true)

var firebaseConfig = {
  apiKey: "AIzaSyAe5LFUQ4xcX82zYTlVqrHtkV9SBF2Lw0Q",
  authDomain: "rawcpayperskiz0rz.firebaseapp.com",
  databaseURL: "https://rawcpayperskiz0rz.firebaseio.com",
  projectId: "rawcpayperskiz0rz",
  storageBucket: "",
  messagingSenderId: "856845378208",
  appId: "1:856845378208:web:605d334a505f25bd839fc5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.database()

$(function () {

  db.ref("/player1Choice").on("value", function (snapshot) {
    let data = snapshot.val()
    console.log(`player1Choice Response: ${data}`)
    if (data === null) {
      //alert(`player1 has not chosen`)
    } else {
      alert(`player1 has chosen: ${data}`)
      player1Choice = data
      console.log("p1 choice: " + player1Choice)
      console.log("p1c:" + player1Choice + " && p2c: " + player2Choice)

      if (player1Choice !== "!" && player2Choice !== "!") {
        alert("both players have chosen!")
        alert(whoWon())
      }
    }
  })
  db.ref("/player2Choice").on("value", function (snapshot) {
    let data = snapshot.val()
    console.log(`player2Choice Response: ${data}`)

    if (data === null) {
      //alert(`player2 has not chosen`)
    } else {
      alert(`player2 has chosen: ${data}`)
      player2Choice = data
      console.log("p2 choice: " + player2Choice)
      console.log("p1c:" + player1Choice + " && p2c: " + player2Choice)
      if (player1Choice !== "!" && player2Choice !== "!") {
        alert("both players have chosen!")
        alert(whoWon())
      }
    }
  })




  rock.click(function () {
    if (player === 1) {
      db.ref().update({
        player1Choice: "rock"
      })
    } else {
      db.ref().update({
        player2Choice: "rock"
      })
    }

  })
  paper.click(function () {
    if (player === 1) {
      db.ref().update({
        player1Choice: "paper"
      })
    } else {
      db.ref().update({
        player2Choice: "paper"
      })
    }

  })
  scissors.click(function () {
    if (player === 1) {
      db.ref().update({
        player1Choice: "scissors"
      })
    } else {
      db.ref().update({
        player2Choice: "scissors"
      })
    }

  })

  nameSubmit.click(function () {
    name = nameInput.val()
    nameValidation(name)
  })

  gameSubmit.click(function () {
    game = $("#game-input").val()
    $(this).prop("disabled", true)
    $("#game-input").prop("disabled", true)
    joinGame()
  })


  //This code block triggers when the page closes, or changes
  window.addEventListener("unload", function (e) {
    //db.ref().set({
    //  unloaded: "yes"
    //})
  })

  $("#name-div").prop("disabled", true)
})