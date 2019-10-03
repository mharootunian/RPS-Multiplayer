$(function () {
  let rock = $("#submit-rock"),
    paper = $("#submit-paper"),
    scissors = $("#submit-scissors")

  let game,
    gameSubmit = $("#submit-game")

  let player

  let player1Choice = "!",
    player2Choice = "!"

  let player1Wins = 0,
    player1Losses = 0,
    ties = 0

  let player2Wins = 0,
    player2Losses = 0

  let inGame = false

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

  writeScores()

  rock.prop("disabled", true)
  paper.prop("disabled", true)
  scissors.prop("disabled", true)
  $("#msg-to-send").prop("disabled", true)
  $("#send-msg").prop("disabled", true)

  function joinGame() {
    db.ref("gameData").once("value", function (snapshot) {
      if (snapshot.exists()) { // if data exists...
        console.log("data exists")
        if (snapshot.val().players === 2) {
          console.log("game has enough players")
        } else if (snapshot.val().players === 1) {
          db.ref("/gameData").update({
            players: 2
          })
          player = 2
          inGame = true
          gameSubmit.prop("disabled", true)
          rock.prop("disabled", false)
          paper.prop("disabled", false)
          scissors.prop("disabled", false)
          $("#msg-to-send").prop("disabled", false)
          $("#send-msg").prop("disabled", false)
        }
      } else { // data does not exist
        db.ref("/gameData").set({
          players: 1
        })
        player = 1
        inGame = true
        gameSubmit.prop("disabled", true)
        rock.prop("disabled", false)
        paper.prop("disabled", false)
        scissors.prop("disabled", false)
        $("#msg-to-send").prop("disabled", false)
        $("#send-msg").prop("disabled", false)
      } // end if-block
    })// end db-ref
  }

  window.addEventListener("unload", function (e) {
    if (inGame) {
      db.ref().set({})
    }
  })

  rock.click(function () {
    if (player === 1) {
      db.ref().update({
        player1Choice: "rock"
      })
    } else if (player === 2) {
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
    } else if (player === 2) {
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
    } else if (player === 2) {
      db.ref().update({
        player2Choice: "scissors"
      })
    }
  })
  gameSubmit.click(function () {
    joinGame();
  })

  function endGame(player1Choice, player2Choice) {
    if (player1Choice === "rock" && player2Choice === "rock") {
      ties++
    }
    if (player1Choice === "rock" && player2Choice === "paper") {
      player2Wins++
      player1Losses++
    }
    if (player1Choice === "rock" && player2Choice === "scissors") {
      player1Wins++
      player2Losses++
    }

    if (player1Choice === "paper" && player2Choice === "rock") {
      player1Wins++
      player2Losses++
    }
    if (player1Choice === "paper" && player2Choice === "paper") {
      ties++
    }
    if (player1Choice === "paper" && player2Choice === "scissors") {
      player2Wins++
      player1Losses++
    }

    if (player1Choice === "scissors" && player2Choice === "rock") {
      player2Wins++
      player1Losses++
    }
    if (player1Choice === "scissors" && player2Choice === "paper") {
      player1Wins++
      player2Losses++
    }
    if (player1Choice === "scissors" && player2Choice === "scissors") {
      ties++
    }

    db.ref().update({
      player1Choice: "!",
      player2Choice: "!"
    })

    db.ref("gameData/scores").update({
      player1Wins: player1Wins,
      player1Losses: player1Losses,
      player2Wins: player2Wins,
      player2Losses: player2Losses,
      ties: ties
    })

    writeScores()
  }

  function writeScores() {
    $("#p1Wins").text(player1Wins)
    $("#p1Losses").text(player1Losses)
    $("#p2Wins").text(player2Wins)
    $("#p2Losses").text(player2Losses)
    $("#ties").text(ties)
    $("#p1Choice").text("Waiting")
    $("#p2Choice").text("Waiting")
  }

  function sendMessage() {
    let msg = $("#msg-to-send").val()
    db.ref("messages").push({
      name: player,
      msg: msg
    })
  }

  $("#send-msg").click(function () {
    sendMessage()
  })

  db.ref("messages").on("child_added", function (snapshot) {
    let data = snapshot.val()
    let newRow = $("<option>")
    newRow.text(`${data.name}: ${data.msg}`)
    $("#msgs").append(newRow)
  })

  db.ref().on("value", function (snapshot) {
    if (snapshot.exists()) { // if player1 choice exists...
      if (snapshot.val().player1Choice !== undefined && snapshot.val().player2Choice !== undefined) {
        if (snapshot.val().player1Choice !== "!" && snapshot.val().player2Choice !== "!") {
          alert("both players have chosen")
          endGame(snapshot.val().player1Choice, snapshot.val().player2Choice)
        }
      }

      if (snapshot.val().player1Choice !== undefined && snapshot.val().player1Choice !== "!") {
        $("#p1Choice").text("Chosen")
      } else {
        $("#p1Choice").text("Waiting...")
      }
      if (snapshot.val().player2Choice !== undefined && snapshot.val().player2Choice !== "!") {
        $("#p2Choice").text("Chosen")
      } else {
        $("#p2Choice").text("Waiting...")
      }
    } else {
      alert("player 1 choice doesnt exist")
    }
  })

})