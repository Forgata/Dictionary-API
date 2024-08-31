// const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// async function getDefinition() {
//   const inputValue = document.querySelector("input").value;
//   console.log(inputValue);

//   try {
//     const response = await fetch(`${url}${inputValue}`);
//     if (response.ok) {
//       const data = await response.json();
//       const meanings = {
//         def1:
//           data[0].meanings[0].definitions[0]?.definition ||
//           "Definition not found",
//         def2:
//           data[0].meanings[0].definitions[1]?.definition ||
//           "Definition not found",
//         def3:
//           data[0].meanings[0].definitions[2]?.definition ||
//           "Definition not found",
//         def4:
//           data[0].meanings[0].definitions[3]?.definition ||
//           "Definition not found",
//       };
//       return meanings;
//     }
//     throw new Error("Request failed");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// document.querySelector("button").addEventListener("click", () => {
//   getDefinition()
//     .then((response) => {
//       if (response) {
//         document.querySelector(".res1").innerHTML = response.def1;
//         document.querySelector(".res2").innerHTML = response.def2;
//         document.querySelector(".res3").innerHTML = response.def3;
//         document.querySelector(".res4").innerHTML = response.def4;
//       }
//     })
//     .catch((error) => console.log(error));
// });

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function getDefinition() {
  const inputValue = document.querySelector("#searchInput").value; // Use the new id
  try {
    const response = await fetch(`${url}${inputValue}`);
    if (response.ok) {
      const data = await response.json();
      const meanings = {
        def1:
          data[0].meanings[0].definitions[0]?.definition ||
          "Definition not found",
        def2:
          data[0].meanings[0].definitions[1]?.definition ||
          "Definition not found",
        def3:
          data[0].meanings[0].definitions[2]?.definition ||
          "Definition not found",
        def4:
          data[0].meanings[0].definitions[3]?.definition ||
          "Definition not found",
      };
      return meanings;
    }
    throw new Error("Request failed");
  } catch (error) {
    console.error("Error:", error);
  }
}

document.querySelector("#searchButton").addEventListener("click", () => {
  getDefinition()
    .then((response) => {
      if (response) {
        console.log(response.def1, response.def2, response.def3, response.def4);
        document.querySelector(
          ".res1"
        ).innerHTML = `<li style='font-family: calibri; font-weight: 100; font-size: large; list-style-type: disc;'>${response.def1}</li>`;
        document.querySelector(
          ".res2"
        ).innerHTML = `<li style='font-family: calibri; font-weight: 100; font-size: large; list-style-type: disc;'>${response.def2}</li>`;
        document.querySelector(
          ".res3"
        ).innerHTML = `<li style='font-family: calibri; font-weight: 100; font-size: large; list-style-type: disc;'>${response.def3}</li>`;
        document.querySelector(
          ".res4"
        ).innerHTML = `<li style='font-family: calibri; font-weight: 100; font-size: large; list-style-type: disc;'>${response.def4}</li>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
