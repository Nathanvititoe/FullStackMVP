const url = 'https://mvpwebservice.onrender.com';
let route = 'cards';
let user = 'nathanvititoe';

//fetch request for data
async function getHomePage() {
  try {
    const response = await fetch(`${url}/${route}/${user}`);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
getHomePage();

//create login modal
const createLoginModal = () => {

  const modal = document.getElementById("login-modal");
  const loginBtn = document.getElementById("login-btn");
  const closeBtn = document.getElementsByClassName("close-login")[0];
  
  loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username-login").value;
    const password = document.getElementById("password-login").value;
    
    //  send the login data to the server
    async function sendLoginData() {
      try {
        route = 'users';
        user = username;
        const response = await fetch(`${url}/${route}/${user}`);
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    JSONdata();
    // You can add your own logic here
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    // Close the modal after login submission
    modal.style.display = "none";
  });
};
createLoginModal();

//create signup modal
const createSignUpModal = () => {

  const modal = document.getElementById("signup-modal");
  const signupBtn = document.getElementById("signup-btn");
  const closeBtn = document.getElementsByClassName("close-signup")[0];
  
  signupBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  
  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username-signup").value;
    const password = document.getElementById("password-signup").value;
    
    //  send the login data to the server
    // You can add your own logic here
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    // Close the modal after login submission
    modal.style.display = "none";
  });
};
createSignUpModal();