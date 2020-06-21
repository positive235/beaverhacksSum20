const baseURL = 'http://localhost:3000/business/login';

function sendLoginForm() {
  var req = new XMLHttpRequest();

  var email = document.getElementById('inputEmail');
  var password = document.getElementById('inputPassword');

  const payload = {
    email: email.value,
    password: password.value,
  };

  req.open('POST', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    var response = JSON.parse(req.response);
    if (response.isLogin == 'true') {
      window.location = 'http://localhost:3000/manager/' + response.business_id;
    } else if (response.isEmail == 'false') {
      console.log('Email is wrong');
    } else if (response.isPwd == 'false') {
      console.log('Password is wrong');
    }
  });
  event.preventDefault();
}
