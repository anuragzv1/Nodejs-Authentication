

var passDiv = document.getElementById('new_pass')
var passConfirmDiv = document.getElementById('new_pass_confirm');
var reset_button = document.getElementById('reset_button');

//event lister to check if the new_password and the new_password_confirm are same or not 
passDiv.addEventListener('keyup', function () {
    if (passConfirmDiv.value.length == 0 || passDiv.value.length == 0) {
        reset_button.disabled = true;
        document.getElementById('messageDiv').innerText = "Passwords Cannot be Empty"
        document.getElementById('messageDiv').style.backgroundColor = "tomato";
        document.getElementById('messageDiv').style.opacity = 1;
    }
    else {
        if (passDiv.value != passConfirmDiv.value) {
            reset_button.disabled = true;
            document.getElementById('messageDiv').innerText = "Passwords do not match"
            document.getElementById('messageDiv').style.backgroundColor = "tomato";
            document.getElementById('messageDiv').style.opacity = 1;
        }
        else {
            reset_button.disabled = false;
            document.getElementById('messageDiv').innerText = "Passwords match"
            document.getElementById('messageDiv').style.backgroundColor = "green";
            document.getElementById('messageDiv').style.opacity = 1;
        }
    }
});
//does the same thing for the new_password_confirm
passConfirmDiv.addEventListener('keyup', function () {
    if (passConfirmDiv.value.length == 0 || passDiv.value.length == 0) {
        reset_button.disabled = true;
        document.getElementById('messageDiv').innerText = "Passwords Cannot be Empty"
        document.getElementById('messageDiv').style.backgroundColor = "tomato";
        document.getElementById('messageDiv').style.opacity = 1;
    }
    else {
        if (passDiv.value != passConfirmDiv.value) {
            reset_button.disabled = true;
            document.getElementById('messageDiv').innerText = "Passwords do not match"
            document.getElementById('messageDiv').style.backgroundColor = "tomato";
            document.getElementById('messageDiv').style.opacity = 1;
        }
        else {
            reset_button.disabled = false;
            document.getElementById('messageDiv').innerText = "Passwords match"
            document.getElementById('messageDiv').style.backgroundColor = "green";
            document.getElementById('messageDiv').style.opacity = 1;
        }
    }
});

//takes the code from the url and sends it to the backend to change the password! also checks for password and confirm password
async function change_pass() {
    var pass = document.getElementById('new_pass').value;
    var passConfirm = document.getElementById('new_pass_confirm').value;
    var url = window.location.href;
    var code = url.substring(url.lastIndexOf('/') + 1, url.length);
    console.log(code);
    var changedOrNot = await fetch('/users/changepassword', {
        method: 'POST',
        body: JSON.stringify({ "pass": pass, "passConfirm": passConfirm, "code": code }),
        headers: {
            "Content-type": "application/json"
        }
    });

    var changedOrNotJson = await changedOrNot.json();
    if (changedOrNotJson.status == "mismatch") {
        document.getElementById('messageDiv').innerText = "Passwords do not match"
        document.getElementById('messageDiv').style.backgroundColor = "tomato";
    }
    else if (changedOrNotJson.status == "changed") {
        document.getElementById('messageDiv').innerText = "Password changed!"
        document.getElementById('messageDiv').style.backgroundColor = "yellowgreen";
        setTimeout(function () {
            window.location.href = '/';
        }, 1000)
    }
}