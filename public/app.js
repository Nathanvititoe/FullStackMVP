// const url = 'https://mvpwebservice.onrender.com';
const url = "http://localhost:3001";
let route = "cards";
let currentUser = {
  username: "johndoe",
  name: "John Doe",
  job: "Farmer",
  phone: "1234567890",
  email: "johndoe420@gmail.com",
};

//create login modal
const createLoginModal = () => {
  const modal = document.getElementById("login-modal");
  const loginBtn = document.getElementById("login-btn");
  const closeBtn = document.getElementsByClassName("close-login")[0];

  loginBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    readLoginData();
    // Close the modal after login submission
    modal.style.display = "none";
  });
};

createLoginModal();
//  compare login info to stored user data
const readLoginData = async () => {
  const username = document.getElementById("username-login").value;
  const password = document.getElementById("password-login").value;
  try {
    const response = await fetch(`${url}/users/${username}`);
    const JSONdata = await response.json();
    if (username === JSONdata.username && password === JSONdata.passwords) {
      console.log("Login successful");
      currentUser.username = username;
      saveCurrentUser(username);
    } else {
      console.log("incorrect login information");
    }
  } catch (err) {
    console.log(err.message);
  }
};

//sets logged in user as current user
const saveCurrentUser = async (user) => {
  try {
    const response = await fetch(`${url}/cards/${user}`);
    const data = await response.json();
    currentUser.name = data.name;
    currentUser.phone = data.phone_number;
    currentUser.job = data.occupation;
    currentUser.email = data.email;
  } catch (err) {
    console.log(err.message);
  }
};
//create signup modal
const createSignUpModal = () => {
  const modal = document.getElementById("signup-modal");
  const signupBtn = document.getElementById("signup-btn");
  const closeBtn = document.getElementsByClassName("close-signup")[0];

  signupBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    readSignUpdata();

    // Close the modal after login submission
    modal.style.display = "none";
  });
};
createSignUpModal();

//post sign up data as new user in database
const readSignUpdata = async () => {
  const username = document.getElementById("username-signup").value;
  const password = document.getElementById("password-signup").value;
  if (password.length < 5) {
    console.log("password must be atleast 5 character");
    return;
  }
  try {
    const data = {
      username: username,
      passwords: password,
    };
    const response = await fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err.message);
  }
};

const formSubmitBtn = () => {
  const form = document.querySelector("#form-form");
  const submitBtn = document.querySelector("#form-submit-btn");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveCurrentCard();
  });
};
formSubmitBtn();

//add new card button functionality
const saveCurrentCard = async () => {
  const name = document.querySelector("#name-input").value;
  let phone = document.querySelector("#phone-input").value;
  const occupation = document.querySelector("#occupation-input").value;
  const email = document.querySelector("#email-input").value;
  const backgroundColor = document.querySelector("#background-selector").value;
  const textColor = document.querySelector("#text-selector").value;
  try {
    if (currentUser.username === undefined || currentUser.username === null) {
      alert("must be logged in");
    }
    const data = {
      name: name,
      phone_number: phone,
      occupation: occupation,
      email: email,
      backgroundColor: backgroundColor,
      textColor: textColor,
      username: currentUser.username,
    };
    const response = await fetch(`${url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err.message);
  }
};

//get request to change card info
const workingSearchBar = () => {
  try {
    const searchBtn = document.querySelector("#search-btn");
    searchBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const searchBar = document.querySelector("#searchBar-field").value;
      let user = searchBar;
      const response = await fetch(`${url}/cards/${user}`);
      const data = await response.json();
      displaySearchResults(data);
    });
  } catch (err) {
    console.log(err.message);
  }
};
workingSearchBar();

//gets elements from form to fill html
const fillCard = () => {
  //add listener and change to name field
  let name = document.querySelector("#name-input");
  name.addEventListener("input", () => {
    let nameCard = document.querySelector("#name-title");
    nameCard.textContent = name.value;
  });
  //add listener and change to job field
  let job = document.querySelector("#occupation-input");
  job.addEventListener("input", () => {
    let jobCard = document.querySelector("#job-title");
    jobCard.textContent = job.value;
  });
  //add listener and change to phone field
  let phone = document.querySelector("#phone-input");
  phone.addEventListener("input", () => {
    let phoneCard = document.querySelector("#phone-title");
    phoneCard.textContent = phone.value;
  });
  //add listener and change to email field
  let email = document.querySelector("#email-input");
  email.addEventListener("input", () => {
    let emailCard = document.querySelector("#email-title");
    emailCard.textContent = email.value;
  });
};
fillCard();

//create functionality for myCards btn FIX MEEE
const myCardsBtn = () => {
  const myCardsBtn = document.querySelector("#myCards-btn");
  myCardsBtn.addEventListener("click", async () => {
    const user = currentUser.username;
    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";

    const exampleContainer = document.querySelector(".example-container");
    exampleContainer.style.display = "none";

    //get all request based on username
    try {
      if (user === undefined || user === null) {
        alert('must be logged in to view "My Cards"');
      }
      const response = await fetch(`${url}/cards/${user}`);
      const data = await response.json();
      //for of loop
      console.log(data);
      for (let item of data) {
        const ul = document.querySelector(".myCards");
        const span = document.createElement("span");
        span.setAttribute("class", "mycards-list");
        const li = document.createElement("li");
        li.textContent = data[item];
        span.appendChild(li);
        ul.appendChild(span);
      }
    } catch (err) {
      console.log(err.message);
    }
  });
  //add event listeners to list items
  //if clicked, display back on, info filled from that card
};
myCardsBtn();

//set default values of home page
const setDefaults = () => {
  let nameInput = document.querySelector("#name-input");
  let nameCard = document.querySelector("#name-title");
  let phoneInput = document.querySelector("#phone-input");
  let phoneCard = document.querySelector("#phone-title");
  let jobInput = document.querySelector("#occupation-input");
  let jobCard = document.querySelector("#job-title");
  let emailInput = document.querySelector("#email-input");
  let emailCard = document.querySelector("#email-title");

  nameInput.value = "";
  nameCard.textContent = "John Doe";
  phoneInput.value = "";
  phoneCard.textContent = "1234567890";
  jobInput.value = "";
  jobCard.textContent = "Farmer";
  emailInput.value = "";
  emailCard.textContent = "johndoe@gmail.com";
};
setDefaults();

//add new card btn (Resets values to default)
const newCardBtn = () => {
  //add event listener to btn
  const addCardBtn = document.querySelector("#addCard-btn");
  addCardBtn.addEventListener("click", () => {
    setDefaults();
  });
};
newCardBtn();

//colorPicker functionality
const colorPicker = () => {
  const backgroundSelector = document.querySelector("#background-selector");
  const textSelector = document.querySelector("#text-selector");
  //add event listener to color selector
  backgroundSelector.addEventListener("input", (e) => {
    const exampleCard = document.querySelector(".example-container");
    const color = e.target.value;
    exampleCard.style.backgroundColor = color;
  });
  //when color changed , change text
  textSelector.addEventListener("input", (e) => {
    const exampleCard = document.querySelector(".example-container");
    const color = e.target.value;
    exampleCard.style.color = color;
  });
};
colorPicker();

//display search results
const displaySearchResults = (data) => {
  const formContainer = document.querySelector(".form-container");
  formContainer.style.display = "none";

  const exampleContainer = document.querySelector(".example-container");
  exampleContainer.style.display = "none";

  const ul = document.querySelector(".myCards");
  const generalContainer = document.querySelector(".cardsList");
  const divContainer = document.createElement("div");
  generalContainer.appendChild(divContainer);
  divContainer.setAttribute("class", "divContainer");
  divContainer.appendChild(ul);
  ul.innerHTML = "";
  try {
    //iterate through data array
    for (let i = 0; i < data.length; i++) {
      const cardList = document.createElement("div");
      cardList.setAttribute("class", "allPersonCards");
      ul.appendChild(cardList);
      let value = data[i];

      const titleDiv = document.createElement("div");
      titleDiv.setAttribute("class", "title-header");
      cardList.appendChild(titleDiv);

      const nameh2 = document.createElement("h2");
      nameh2.innerHTML = value.name;
      titleDiv.appendChild(nameh2);

      const occupationh4 = document.createElement("h4");
      occupationh4.innerHTML = value.occupation;
      titleDiv.appendChild(occupationh4);

      const contactInfo = document.createElement("div");
      contactInfo.setAttribute("class", "contact-info");
      cardList.appendChild(contactInfo);

      const phonenumber = document.createElement("p");
      phonenumber.innerHTML = value.phone_number;
      contactInfo.appendChild(phonenumber);

      const email = document.createElement("p");
      email.innerHTML = value.email;
      contactInfo.appendChild(email);

      cardList.style.backgroundColor = value.background_color;
      cardList.style.color = value.text_color;

      cardList.addEventListener("click", () => {
        openSavedCard(data);
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

//open saved Card
const openSavedCard = (data) => {
  console.log(data);
  const cardList = document.querySelector(".cardsList");
  cardList.style.display = "none";

  const formContainer = document.querySelector(".form-container");
  formContainer.style.display = "flex";

  const exampleContainer = document.querySelector(".example-container");
  exampleContainer.style.display = "flex";

  const nameh2 = document.querySelector('#name-title'); 
};
