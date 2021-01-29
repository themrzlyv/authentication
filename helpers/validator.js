export const validator = (email,password) => {
    if(!email || !password)
        return "Please fill all inputs"

    if(password.length < 6) 
        return "Password must be min 6 character"

    if(!validateEmail(email))
        return "Please write correct email"
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}