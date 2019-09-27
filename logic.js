let rock = $("#submit-rock"),
  paper = $("#submit-paper"),
  scissors = $("#submit-scissors")

let name,
  nameInput = $("#name-input"),
  nameSubmit = $("#submit-name")

let game,
  gameInput = $("#game-input"),
  gameSubmit = $("#submit-game")



function nameValidation(name) {
  if (name === "" || name === null) {
    alert("please fill out a name and try again")
  } else {
    nameSubmit.attr("disabled", "true")
    nameInput.attr("disabled", "true")
  }
}

function joingGame() {
  db.ref().once("value", function(snapshot) {
    let data = snapshot.val()
    if (data.players === 2) {
      startGame()
    } else if (data.players > 2) {
      alert("nope, it dun broked")
    } else {
      alert("waiting for player 2")
    }
  })
}

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

$(function() {

  //db.ref().on("")

  rock.click(function() {
    db.ref().push({
      name: name,
      choice: "rock"
    })
    alert("You pressed rock, suckah")

  })
  paper.click(function() {
    db.ref().push({
      name: name,
      choice: "paper"
    })
    alert("You pressed paper, suckah")
  })
  scissors.click(function() {
    db.ref().push({
      name: name,
      choice: "scissors"
    })
    alert("You pressed scissors, suckah")
  })

  nameSubmit.click(function() {
    name = nameInput.val()
    nameValidation(name)
  })

  gameSubmit.click(function() {
    name = $("#game-input").val()
    $(this).attr("disabled", "true")
    $("#game-input").attr("disabled", "true")
  })



  window.addEventListener("unload", function(e) {
    db.ref().set({
      unloaded: "yes"
    })
  })

  $("#name-div").attr("disabled", "true")
})