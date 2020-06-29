
//this function hides or shows the required div on the index page , the login , register and forgot divs

function show(name) {
    var register = document.getElementById('registerdiv');
    var forgot = document.getElementById('forgotdiv');
    var login = document.getElementById('logindiv');
    var loginbtn = document.getElementById('loginbtn');
    var registerbtn = document.getElementById('registerbtn');
    var forgotbtn = document.getElementById('forgotbtn');

    if (name == 'login') {
        //show/hide div
        register.style.display = "none";
        forgot.style.display = "none";
        login.style.display = "flex";

        //change button colors
        loginbtn.classList.add('button-active');
        registerbtn.classList.remove('button-active');
        forgotbtn.classList.remove('button-active');

    }
    else if (name == 'register') {
        //show/hide div
        register.style.display = "flex";
        forgot.style.display = "none";
        login.style.display = "none";

        //change button colors
        loginbtn.classList.remove('button-active');
        registerbtn.classList.add('button-active');
        forgotbtn.classList.remove('button-active');
    }
    else {
        //show/hide div
        register.style.display = "none";
        forgot.style.display = "flex";
        login.style.display = "none";

        //change button colors
        loginbtn.classList.remove('button-active');
        registerbtn.classList.remove('button-active');
        forgotbtn.classList.add('button-active');
    }
}


//this function displays whatever message is needed to be displyed on the screen like noty
function displayInfoDiv(message) {
    const div = document.getElementById('messageDiv');
    div.innerText = message;
    let opac = 0;
    const inter = setInterval(function () {
        div.style.opacity = opac;
        opac += 0.1
        if (opac > 1) clearInterval(inter);
    }, 70);

}


//this function checks for recaptcha and then makes an ajax call to the server
async function register(siteKey) {
    const name = document.getElementById('register_name').value;
    const email = document.getElementById('register_email').value;
    const pass = document.getElementById('register_pass').value;

    //Google Recaptcha Function!
    grecaptcha.ready(async function () {
        grecaptcha.execute(siteKey, { action: 'submit' }).then(async function (token) {

            const captcha = token;
            const verifyCaptcha = await fetch('/verifyCaptcha', {
                method: 'POST',
                body: JSON.stringify({ captcha: captcha }),
                headers: {
                    'Accept': 'application/json , text/plaintext , */*',
                    'Content-type': 'application/json'
                }
            });
            const verifyCaptchaJson = await verifyCaptcha.json();
            //if the user is not a bot then continue
            console.log(verifyCaptchaJson);

            if (verifyCaptchaJson.status == "success") {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        if (this.response == "AR") {
                            console.log("Already registered!");
                            displayInfoDiv("There's an account with this email already, Sign in!");
                        }
                        else if (this.response == "ERR") {
                            console.log("Error!");
                            displayInfoDiv("Error creating account, try again");
                        }
                        else {
                            console.log("New User Registered!");
                            displayInfoDiv("Signed up, Please verify account by visiting mail");
                        }
                    }
                }
                xmlhttp.open("GET", "/users/register?name=" + name + "&&email=" + email + "&&password=" + pass);
                xmlhttp.send();
            }
            else {
                displayInfoDiv("you feel like a robot, Try again if not!");
            }
        });
    });
}


// async function login() {
//     var email = document.getElementById('login_email').value;
//     var pass = document.getElementById('login_password').value;
//     console.log(email + " " + pass);

//     var data = new FormData();
//     data.append('email', email);
//     data.append('password', pass);
//     console.log(data);

//     var user = await fetch('/users/signin', {
//         method: 'POST',
//         body: data
//     });

// }



//this function destroys the session and redirects the user to the homepage
function logout() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function (req, res) {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = "/";
        }
    };
    xmlhttp.open('POST', '/users/logout');
    xmlhttp.send();
}



//display any kind of notification just pass the type and messge
function viewNotification(type, message) {
    new Noty({
        theme: 'sunset',
        layout: 'bottomLeft',
        text: message,
        type: type,
        timeout: 1500
    }).show();
}



//this div takes the email and sends a forgot email link to the email
async function forgotPass() {
    var email = document.getElementById("forgot_email").value;

    var userFromEmail = await fetch('/users/forgotpass', {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
            "Content-type": "application/json"
        }
    });
    var userFromEmailStatus = await userFromEmail.json();
    console.log(userFromEmailStatus);
    if (userFromEmailStatus.status == "success") {
        viewNotification('success', 'Password reset mail sent!');
    }
    else {
        viewNotification('error', 'Error in sending main , Try again.');
    }
}



//this function displays the div that resets password if the user is logged in 
function forgotAfterLogin() {
    document.getElementById('forgotAfterLogin').style.display = "flex";
}


//this function hides the forgotAfterLogin div
function hidefal() {
    document.getElementById('forgotAfterLogin').style.display = "none";
}



//this function takes the current username , new password and new password confirm, and sends it to server to reset
async function resetPass(user_id) {
    let current_pass = document.getElementById('current_pass').value;
    let new_pass = document.getElementById('new_pass_1').value;
    let new_pass_2 = document.getElementById('new_pass_2').value;

    if (new_pass != new_pass_2) {
        viewNotification('error', 'Passwords Do not match!')
    }
    else {
        const user = await fetch('/users/loggedinpasschange', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user_id: user_id, current_pass: current_pass, new_pass: new_pass })
        });

        const userJson = await user.json();
        if (userJson.status == "success") {
            viewNotification('success', 'Password Changed!');
        }
        else if (userJson.status == "unauthorized") {
            viewNotification('error', 'Current password invalid');
        }
        else viewNotification('error', 'Error in changing password , Try again');
    }
}