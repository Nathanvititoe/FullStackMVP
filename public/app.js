// const url = 'https://mvpwebservice.onrender.com';
const url = "http://localhost:3001";
let route = "cards";
let user = "nathanvititoe";
let currentUser = {
  username: ''
}

//fetch request for data
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

//  send the login data to the server
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
}

createLoginModal();

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

const readSignUpdata = async () => {
  const username = document.getElementById("username-signup").value;
  const password = document.getElementById("password-signup").value;
  if(password.length < 5) {
    console.log('password must be atleast 5 character');
    return;
  }
  try {
    const data = {
      username : username,
      passwords : password
    }
    const response = await fetch(`${url}/users/`, {
      method: 'POST',
      headers : {
        'Content-Type': 'Application/json'
      },
      body : JSON.stringify(data)
    });
  } catch (err) {
    console.error(err.message);
  }
};
