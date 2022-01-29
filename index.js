// ! Main variables

let myLinks = [];

// ! Transistion from HTML to JS

// Store text
// Store button
// Store render a text
// Store delete button
// Store save button

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// ! localStorage create for save links

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

if (leadsFromLocalStorage) {
  myLinks = leadsFromLocalStorage;
  render(myLinks);
}

// ! Save tab button responsive

// Call a function
tabBtn.addEventListener("click", function () {
  // Grabing URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  });
});

// ! Show rendered links

function render(links) {
  let listItems = "";
  // Log out the item to render a text
  for (let i = 0; i < links.length; i++) {
    // Convert to list items into links and open in other tab
    listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `;
  }
  // Render the list items
  ulEl.innerHTML = listItems;
}

// ! Button Input responsive

// Call a function
inputBtn.addEventListener("click", function () {
  // Get value from input field
  myLinks.push(inputEl.value);
  // Clearing input field
  inputEl.value = "";
  // Save data to localStorage
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  // Call function
  render(myLinks);
});

// ! Button Delete responsive

// Call a function
deleteBtn.addEventListener("click", function () {
  // Clearing data
  localStorage.clear();
  myLinks = [];
  // Call function
  render(myLinks);
});
