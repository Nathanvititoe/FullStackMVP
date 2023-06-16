const url = 'https://mvpwebservice.onrender.com'

async function JSONdata() {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
JSONdata();