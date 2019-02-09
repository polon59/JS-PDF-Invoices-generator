class User{
    
        constructor(login, password){
            this.login = login;
            this.password = password;
            this.displayUsersInfoInConsole();
        }
    
        displayUsersInfoInConsole(){
            console.log(`[INFO] logged user: (password:${this.password} , login: ${this.login})`);
        }
    }
    
    module.exports = User;