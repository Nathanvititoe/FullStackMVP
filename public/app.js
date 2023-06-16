const url = 'https://mvpwebservice.onrender.com';
let route = 'cards';
let user = 'nathanvititoe';

async function JSONdata() {
  try {
    const response = await fetch(`${url}/${route}/${user}`);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
JSONdata();