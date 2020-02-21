class UserAccount {

    /**
     * 
     * @param {String} email 
     * @param {String} password 
     * @param {String} token 
     */
    constructor(email, login, password, emailToken)
    {
        this.email = email;
        this.login = login
        this.password = password;
        this.emailToken = emailToken;
        this.IsConfirmed = false;
    }
}

module.exports = UserAccount;