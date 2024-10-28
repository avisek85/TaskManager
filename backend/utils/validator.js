 const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 const isStrongPassword = (password)=>{
    return password.length>=8;
}

module.exports = {isValidEmail,isStrongPassword}