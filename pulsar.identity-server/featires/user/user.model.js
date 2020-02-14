class User {

    /**
     * 
     * @param {String} email 
     * @param {String} password 
     * @param {String} token 
     */
    constructor(email, password, emailToken)
    {
        this.email = email;
        this.password = password;
        this.emailToken = token;
        this.IsConfirmed = false;
    }
}

module.exports = User;