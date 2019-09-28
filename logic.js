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

function joinGame() {
  db.ref(`${game}`).once("value", function (snapshot) {

    if (snapshot.exists()) {
      let data = snapshot.val()
      console.log(data)
      if (data.gameData.players === 1) {
        player = 2
        db.ref(`${game}/gameData`).update({
          players: 2        
        })
        startGame()
      } else if (data.gameData.players > 1) {
        alert("nope, it dun broked")
      } else {
        player = 1
        db.ref(`${game}/gameData`).update({
          players: 1        
        })
        alert("waiting for player 2")
      }
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

  //db.ref().on("")

  rock.click(function () {
    db.ref(`${game}/${playerName}`).update({
      name: name,
      choice: "rock"
    })
    alert("You pressed rock, suckah")

  })
  paper.click(function () {
    db.ref(`${game}/${playerName}`).update({
      name: name,
      choice: "paper"
    })
    alert("You pressed paper, suckah")
  })
  scissors.click(function () {
    db.ref(`${game}/${playerName}`).update({
      name: name,
      choice: "scissors"
    })
    alert("You pressed scissors, suckah")
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



  window.addEventListener("unload", function (e) {
    db.ref().set({
      unloaded: "yes"
    })
  })

  $("#asd").click(function () {
    db.ref("/newGame/meero").set({
      name: "meero"
    })

    db.ref("newGame/gameData").set({
      players: 1
    })
  })

  $("#dsa").click(function () {
    db.ref(`${game}/${playerName}`).once("value", function (snapshot) {
      if (snapshot.exists()) {
        alert("record exists")
      } else {
        alert("record does not exist")
      }
    })
  })


  $("#name-div").prop("disabled", true)
})