// const url = 'https://mvpwebservice.onrender.com';
const url = "http://localhost:3001";
let route = "cards";
let currentUser = {
  username: "",
};

//fetch request for initial data
async function getHomePage() {
  try {
    const response = await fetch(`${url}/${route}/${user}`);
    const data = await response.json();
  } catch (err) {
    console.log(err.message);
  }
}

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
      console.log(currentUser);
    } else {
      console.log("incorrect login information");
    }
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
  const phone = document.querySelector("#phone-input").value;
  const occupation = document.querySelector("#occupation-input").value;
  const email = document.querySelector("#email-input").value;

  try {
    const data = {
      name: name,
      phone_number: phone,
      occupation: occupation,
      email: email,
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
const cardInfoChange = () => {
  try {
    const searchBtn = document.querySelector("#search-btn");
  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
      const searchBar = document.querySelector("#searchBar-field").value;
      let user = searchBar;
      console.log(user);
      const response = await fetch(`${url}/cards/${user}`);
      const data = await response.json();
      console.log(data);
    });
  } catch (err) {
    console.log(err.message);
  }
};
cardInfoChange();
