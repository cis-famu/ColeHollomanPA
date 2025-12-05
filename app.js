// Setup & Console Logging
console.log("Welcome to PA03 JavaScript Interactivity Demo");
console.log("Repo URL: https://github.com/cis-famu/ColeHollomanPA");

// Variables, Types, Operators
let myString = "CNT4504E";
let myNumber = 42;
let myBoolean = true;
let myArray = ["alpha", "beta", "gamma"];
let myObject = { name: "Cole", course: "CNT4504E" };
let myNothing = null;

let sum = myNumber + 8;                  // arithmetic
let isCourseCorrect = (myString === "CNT4504E");  // strict comparison
let logicTest = myBoolean && isCourseCorrect;     // logical

// DOM Elements
const statusDiv = document.getElementById("status");
const validateBtn = document.getElementById("validateBtn");
const userInput = document.getElementById("userInput");
const loopList = document.getElementById("loopList");
const fetchBtn = document.getElementById("fetchBtn");
const sortBtn = document.getElementById("sortBtn");
const resultsDiv = document.getElementById("results");

// Loop Example
function renderLoopItems() {
  const items = ["One", "Two", "Three", "Four", "Five"];
  loopList.innerHTML = "";
  for (let item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    loopList.appendChild(li);
  }
}
renderLoopItems();

// Control Flow Validation
function validateInput() {
  const value = userInput.value.trim();
  if (value === "") {
    statusDiv.textContent = "Please enter a value.";
    return;
  }
  const num = Number(value);
  if (isNaN(num)) {
    statusDiv.textContent = "Input must be a number.";
  } else if (num >= 1 && num <= 10) {
    statusDiv.textContent = "Valid! Number is in range 1–10.";
  } else {
    statusDiv.textContent = "Invalid! Enter a number between 1–10.";
  }
}

// Fetch Data Section
let apiData = [];

async function loadData() {
  resultsDiv.textContent = "Loading…";
  try {
    const res = await fetch("https://dummyjson.com/products?limit=20");
    const data = await res.json();
    apiData = data.products;
    renderList(apiData);
  } catch (err) {
    handleError(err);
  }
}

function renderList(list) {
  if (!list || list.length === 0) {
    resultsDiv.textContent = "No results found.";
    return;
  }
  resultsDiv.innerHTML = "";
  const ul = document.createElement("ul");
  list.slice(0, 10).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} — $${item.price}`;
    ul.appendChild(li);
  });
  resultsDiv.appendChild(ul);
}

function sortAZ() {
  if (!apiData.length) {
    resultsDiv.textContent = "Load data first.";
    return;
  }
  const sorted = [...apiData].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  renderList(sorted);
}

function handleError(error) {
  console.error(error);
  resultsDiv.textContent = "Error loading data. Try again.";
}

// Event Listeners
validateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateInput();
});

fetchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loadData();
});

sortBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sortAZ();
});
