const signin = document.getElementById("signin")

const signinBtn = document.getElementById("signinBtn").addEventListener('click',()=>{
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password")

  const username = userInput.value
  const password = passInput.value
  if(username == 'admin' && password == 'admin123'){
    window.location.assign("../dashboard.html")
  }else{
    alert('Wrong username or password')
    return
  }
})