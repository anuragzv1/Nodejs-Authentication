//Function to resend the mail form the verify.ejs
async function resendEmail(user_id){
    let emailstatus = await fetch('/users/resendverification',{
        method:'POST',
        body:JSON.stringify({
            id:user_id
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    let jsonres = await emailstatus.json();
    if(jsonres.status=='success'){
        new Noty({
            theme: 'sunset',
            layout: 'bottomLeft',
            text: jsonres.message,
            type: "success",
            timeout: 2500
        }).show();   
    }
    else{
        new Noty({
            theme: 'sunset',
            layout: 'bottomLeft',
            text: jsonres.message,
            type: "error",
            timeout: 2500
        }).show();
    }
    console.log(jsonres);
}