const form = document.getElementById("form");
form.addEventListener("submit", registerUser);

async function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password})
  }).then(response=>response.json());
  if(result.status ==="ok"){
    localStorage.setItem('token', result.token)
    localStorage.setItem('loggedIn', true);
    console.log(result.token)
    alert("Success login")
    window.location.replace("app.html");
  } else {
    alert(result.error)
    localStorage.setItem('loggedIn', false);
  }
}

