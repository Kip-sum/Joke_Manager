const jokeDisplay = document.getElementById("jokeDisplay");
const savedJokesList = document.getElementById("savedJokes");
const getJokeBtn = document.getElementById("getJokeBtn");
const saveJokeBtn = document.getElementById("saveJokeBtn");

let currentJoke = "";

//  GET - Fetch joke from API
async function getJoke() {
  jokeDisplay.textContent = "Loading...";

  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any");
    const data = await res.json();

    currentJoke =
      data.type === "single"
        ? data.joke
        : `${data.setup} - ${data.delivery}`;

    jokeDisplay.textContent = currentJoke;

  } catch (error) {
    jokeDisplay.textContent = "Failed to load joke! ";
  }
}

//  POST - Save joke
function saveJoke() {
  if (!currentJoke) return;

  let jokes = JSON.parse(localStorage.getItem("jokes")) || [];
  jokes.push(currentJoke);

  localStorage.setItem("jokes", JSON.stringify(jokes));
  displaySavedJokes();
}

//DELETE
function deleteJoke(index) {
  let jokes = JSON.parse(localStorage.getItem("jokes")) || [];
  jokes.splice(index, 1);

  localStorage.setItem("jokes", JSON.stringify(jokes));
  displaySavedJokes();
}

// PATCH
function editJoke(index) {
  let jokes = JSON.parse(localStorage.getItem("jokes")) || [];
  let updated = prompt("Edit joke:", jokes[index]);

  if (updated) {
    jokes[index] = updated;
    localStorage.setItem("jokes", JSON.stringify(jokes));
    displaySavedJokes();
  }
}


function displaySavedJokes() {
  savedJokesList.innerHTML = "";

  let jokes = JSON.parse(localStorage.getItem("jokes")) || [];

  jokes.forEach((joke) => {
    const li = document.createElement("li");
    li.textContent = joke;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    savedJokesList.appendChild(li);
  });

  
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const editButtons = document.querySelectorAll(".edit-btn");

  
  deleteButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => deleteJoke(index));
  });

  editButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => editJoke(index));
  });
}


getJokeBtn.addEventListener("click", getJoke);
saveJokeBtn.addEventListener("click", saveJoke);

// Load saved jokes on start
displaySavedJokes();