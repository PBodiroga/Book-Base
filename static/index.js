const form = document.getElementById("form");
form.addEventListener("submit", registerUser);
localStorage.setItem('loggedIn', false);
async function registerUser(e) {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password})
  }).then(response=>response.json());
  if(result.status ==="ok"){
    alert("You have been successfully registered!")
    window.location.replace("login.html")
    
  } else {
    alert(result.error)
  }
}
