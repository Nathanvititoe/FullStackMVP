const url = 'https://mvpwebservice.onrender.com';
const route = 'nathanvititoe';

async function JSONdata() {
  try {
    const response = await fetch(`${url}/${route}`);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
JSONdata();