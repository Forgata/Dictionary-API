console.log("here we go!");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let currentAudio = null;

async function getDefinitions() {
  const inputValue = document.querySelector("input").value;
  const loadingScreen = document.querySelector(".loading-screen");
  const defs = document.querySelector("li");
  try {
    const response = await fetch(`${url}${inputValue}`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const meanings = {
        word: data[0].word,
        phonetics: data[0].phonetic,
        speech: data[0].meanings[0].partOfSpeech,
        audio:
          data[0].phonetics[0]?.audio ||
          data[0].phonetics[1]?.audio ||
          "Audio not available",
        definition1:
          data[0].meanings[0].definitions[0]?.definition ||
          "Definition not found",
        definition2:
          data[0].meanings[0].definitions[1]?.definition ||
          "Definition not found",
        definition3:
          data[0].meanings[0].definitions[2]?.definition ||
          "Definition not found",
        definition4:
          data[0].meanings[0].definitions[3]?.definition ||
          "Definition not found",
      };
      return meanings;
    }
    throw new Error("Request failed");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function handleSubmit() {
  console.log("submited");
  const audioBtn = document.querySelector(".audio-btn");
  audioBtn.removeEventListener("click", handleAudioBtnClick);

  getDefinitions()
    .then((response) => {
      if (response) {
        console.log(response);
        const meaning1 = response.definition1;
        const meaning2 = response.definition2;
        const meaning3 = response.definition3;
        const meaning4 = response.definition4;

        // outputing the audio button
        audioBtn.style.display = "block";

        // adding new event listener
        audioBtn.addEventListener(
          "click",
          handleAudioBtnClick.bind(null, response.audio)
        );

        document.querySelector(".typed-word").textContent = response.word;
        document.querySelector(".phonetic").textContent = response.phonetics;
        document.querySelector(".part-speech").textContent = response.speech;

        //   selecting the divs for the definitions

        const def1Div = document.querySelector(".def1");
        const def2Div = document.querySelector(".def2");
        const def3Div = document.querySelector(".def3");
        const def4Div = document.querySelector(".def4");

        //   check and display definitions
        if (meaning1 !== "Definition not found") {
          def1Div.innerHTML = meaning1;
          def1Div.style.display = "block"; // Show the div
        } else {
          def1Div.style.display = "none"; // Hide the div
        }

        if (meaning2 !== "Definition not found") {
          def2Div.innerHTML = meaning2;
          def2Div.style.display = "block"; // Show the div
        } else {
          def2Div.style.display = "none"; // Hide the div
        }

        if (meaning3 !== "Definition not found") {
          def3Div.innerHTML = meaning3;
          def3Div.style.display = "block"; // Show the div
        } else {
          def3Div.style.display = "none"; // Hide the div
        }

        if (meaning4 !== "Definition not found") {
          def4Div.innerHTML = meaning4;
          def4Div.style.display = "block"; // Show the div
        } else {
          def4Div.style.display = "none"; // Hide the div
        }
        // done checking
      }
    })
    .then(resetInputField)
    .catch((error) => console.log(`${error}`));
}

function handleAudioBtnClick(audioUrl) {
  // stop if currently playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  // checking for audio
  if (audioUrl) {
    currentAudio = new Audio(audioUrl);
    currentAudio.play();
  } else {
    console.log("Audio URL not found");
  }
}

const resetInputField = () => {
  document.querySelector("input").value = "";
};
