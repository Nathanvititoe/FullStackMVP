// const url = 'https://mvpwebservice.onrender.com';
const url = "http://localhost:3001";

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

//  compare login info to stored user data and set currentUser
const readLoginData = async () => {
  const username = document.getElementById("username-login").value;
  const password = document.getElementById("password-login").value;
  try {
    const response = await fetch(`${url}/users/${username}`);
    const JSONdata = await response.json();
    if (username === JSONdata.username && password === JSONdata.passwords) {
      console.log("Login successful");
      const currentUser = JSONdata.username;
      let currentUserJSON = JSON.stringify(currentUser);
      localStorage.setItem("currentUser", currentUserJSON);
    } else {
      console.log("incorrect login information");
    }
  } catch (err) {
    console.error(err);
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

//adds event listener to saveBtn and calls saveCurrentCard()
const formSubmitBtn = () => {
  const form = document.querySelector("#form-form");
  const submitBtn = document.querySelector("#form-submit-btn");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveCurrentCard();
  });
};
formSubmitBtn();

//saves form to db with post request
const saveCurrentCard = async () => {
  const name = document.querySelector("#name-input").value;
  let phone = document.querySelector("#phone-input").value;
  const occupation = document.querySelector("#occupation-input").value;
  const email = document.querySelector("#email-input").value;
  const backgroundColor = document.querySelector("#background-selector").value;
  const textColor = document.querySelector("#text-selector").value;
  try {
    //parse local storage for current user
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    if (!currentUser) {
      alert("must be logged in");
      return;
    }
    const data = {
      name: name,
      phone_number: phone,
      occupation: occupation,
      email: email,
      backgroundColor: backgroundColor,
      textColor: textColor,
      username: currentUser,
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
    console.error(err);
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

//create functionality for myCards btn
const myCardsBtn = () => {
  try {
    const myCardsBtn = document.querySelector("#myCards-btn");
    myCardsBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      let currentUser = localStorage.getItem("currentUser");
      currentUser = JSON.parse(currentUser);
      const response = await fetch(`${url}/cards/${currentUser}`);
      const data = await response.json();
      displaySearchResults(data);
    });
  } catch (err) {
    console.error(err);
  }
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

//add new card btn (Resets values to default and resets page html)
const newCardBtn = () => {
  //add event listener to btn
  const addCardBtn = document.querySelector("#addCard-btn");
  addCardBtn.addEventListener("click", () => {
    const cardList = document.querySelector(".cardsList");
    cardList.style.display = "none";

    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "flex";

    const exampleContainer = document.querySelector(".example-container");
    exampleContainer.style.display = "flex";

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

//display search results (READ)
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
      let value = data[i];
      const cardList = document.createElement("div");
      cardList.setAttribute("class", "allPersonCards");
      cardList.dataset.name = value.card_id;
      ul.appendChild(cardList);

      const titleDiv = document.createElement("div");
      titleDiv.setAttribute("class", "title-header");
      cardList.appendChild(titleDiv);

      const nameh2 = document.createElement("h2");
      nameh2.innerHTML = value.name;
      nameh2.dataset.name = value.card_id;
      titleDiv.appendChild(nameh2);

      const occupationh4 = document.createElement("h4");
      occupationh4.innerHTML = value.occupation;
      occupationh4.dataset.occupation = value.occupation;
      titleDiv.appendChild(occupationh4);

      const contactInfo = document.createElement("div");
      contactInfo.setAttribute("class", "contact-info");
      cardList.appendChild(contactInfo);

      const phonenumber = document.createElement("p");
      phonenumber.setAttribute("id", "clickphone");
      phonenumber.innerHTML = value.phone_number;
      phonenumber.dataset.phonenumber = value.phone_number;
      contactInfo.appendChild(phonenumber);

      const email = document.createElement("p");
      email.setAttribute("id", "clickemail");
      email.innerHTML = value.email;
      email.dataset.email = value.email;
      contactInfo.appendChild(email);

      cardList.style.backgroundColor = value.background_color;
      cardList.style.color = value.text_color;

      // const deleteBtn = document.createElement("div");
      // deleteBtn.setAttribute("class", "delete-card");
      // deleteBtn.innerHTML = "&times;";
      // deleteBtn.dataset.deleteBtn = value.card_id;
      // cardList.prepend(deleteBtn);

      // const deleteBtns = document.querySelectorAll(".delete-card");
      // deleteBtns.forEach((deleteBtn) => {
      //   deleteBtn.addEventListener("click", (e) => {
      //     e.stopPropagation();
      //     const cardID = e.target.dataset.deleteBtn;
      //     e.target.parentNode.classList.add("toBeDeleted");
      //     deleteCard(cardID);
      //   });
      // });
      cardList.addEventListener("click", (e) => {
        // const selectedCard = {
        //   name: e.currentTarget.querySelector("h2"),
        //   occupation: e.currentTarget.querySelector("h4"),
        //   phone: e.currentTarget.querySelector("#clickphone"),
        //   email: e.currentTarget.querySelector("#clickemail")
        // };

        const cardId = e.currentTarget.dataset.name;
        openSavedCard(cardId);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

//open saved Card (learned about datasets)
const openSavedCard = async (cardId) => {
  const cardList = document.querySelector(".cardsList");
  cardList.style.display = "none";

  const formContainer = document.querySelector(".form-container");
  formContainer.style.display = "flex";

  const exampleContainer = document.querySelector(".example-container");
  exampleContainer.style.display = "flex";

  const nameh2 = document.querySelector("#name-title");
  const jobh4 = document.querySelector("#job-title");
  const phone = document.querySelector("#phone-title");
  const email = document.querySelector("#email-title");

  let user = localStorage.getItem("currentUser");
  user = JSON.parse(user);
  const response = await fetch(`${url}/cards/${user}/${cardId}`);
  const data = await response.json();
  console.log(data);

  nameh2.innerHTML = data[0].name;
  jobh4.innerHTML = data[0].occupation;
  phone.innerHTML = data[0].phone_number;
  email.innerHTML = data[0].email;
  exampleContainer.style.backgroundColor = data[0].background_color;
  exampleContainer.style.color = data[0].text_color;
  editCard(cardId);
};

// //add delete option to each card
// const deleteCard = async (cardID) => {
//   try {
//     //set deleted card inner html to ''
//     const toDelete = document.querySelector(".toBeDeleted");
//     toDelete.style.display = "none";
//     toDelete.innerHTML = "";
//     //async delete route for that card id
//     const response = await fetch(`${url}/cards/${cardID}`, {
//       method: "DELETE",
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

//edit card btn
const editCard = (cardId) => {
  const editBtn = document.querySelector("#edit");
  editBtn.addEventListener("click", async () => {
    let name = document.querySelector("#name-input").value;
    let job = document.querySelector("#occupation-input").value;
    let phone = document.querySelector("#phone-input").value;
    let email = document.querySelector("#email-input").value;
    let background = document.querySelector('#background-selector').value;
    let textColor = document.querySelector('#text-selector').value;

    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);

    const JsonObj = {
      name : name,
      occupation : job,
      phone_number: phone,
      email : email,
      background_color : background,
      text_color : textColor,
      username : user
    }
    try {
      const response = await fetch(`${url}/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonObj),
      });
    } catch (err) {
      console.error(err);
    }
  });
};
