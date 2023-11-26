$("document").ready(function () {
    $(window).on("keydown", function () {
      autoPlay();
    });
    $(".btn").click(function (event) {
      const activeBtn = event.target.id;
      clickHandler(activeBtn);
    });
  });
  
  const audioURLs = [
    "sounds/blue.mp3",
    "sounds/green.mp3",
    "sounds/red.mp3",
    "sounds/yellow.mp3",
  ];
  let clickTrackNo = 0;
  let currentAudio;
  let allowClick = false;
  let map = []; // a serie of btn player have to click
  
  function autoPlay() {
    if (allowClick) return;
    randomGenerator();
    playAudio();
    makeBtnActive();
  
    allowClick = true;
    switchLevel(map.length);
  }
  
  function randomGenerator() {
    const randomButtonIndex = Math.floor(Math.random() * 4);
  
    currentAudio = audioURLs[randomButtonIndex];
  
    const startChar = currentAudio.indexOf("/");
    const endChar = currentAudio.indexOf(".");
    const btnColor = currentAudio.slice(startChar + 1, endChar); // slice only color (red, green, blue, yellow) from url sounds/green.mp3
    map.push(btnColor);
    clickTrackNo = 0;
  }
  
  function playAudio() {
    const audio = new Audio(currentAudio);
    audio.play();
  }
  
  function makeBtnActive() {
    if (currentAudio.includes("red")) {
      $(".btn.red").addClass("pressed");
    } else if (currentAudio.includes("green")) {
      $(".btn.green").addClass("pressed");
    } else if (currentAudio.includes("blue")) {
      $(".btn.blue").addClass("pressed");
    } else if (currentAudio.includes("yellow")) {
      $(".btn.yellow").addClass("pressed");
    } else {
      return;
    }
  
    setTimeout(function () {
      $(".btn").removeClass("pressed");
    }, 100);
  }
  
  function clickHandler(activeBtn) {
    if (!allowClick) return;
  
    // check game over
    if (activeBtn !== map[clickTrackNo]) {
      switchLevel("gameover");
      return;
    }
  
    if (activeBtn === map[clickTrackNo]) {
      clickTrackNo += 1;
  
      for (let i = 0; i < audioURLs.length; i++) {
        // set the active btn audio
        if (audioURLs[i].includes(activeBtn)) currentAudio = audioURLs[i];
      }
    }
  
    playAudio();
    makeBtnActive();
    if (clickTrackNo >= map.length) {
      allowClick = false;
      setTimeout(() => autoPlay(), 1000);
    }
  }
  
  function switchLevel(level) {
    if (level === "gameover") {
      $("#level-title").text("GAME OVER!");
      map.length = 0;
      setTimeout(function () {
        $("#level-title").text("Press A Key to Start");
        allowClick = false;
      }, 1000);
    } else {
      $("#level-title").text("Level " + level);
    }
  }
  