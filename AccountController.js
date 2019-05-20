const User = require('./model/User.js');

class AccountController{
    
        constructor(app){
            this.app = app;
            this.currentUser = undefined;
        }

        setRoutes(){
            this.setPostMyAccount();
            this.setGetMyAccount();
        }

        setPostMyAccount(){            
            this.app.post('/myAccount', (req, res) =>{
                const reqBody = req.body;
                this.currentUser = new User(reqBody.login, reqBody.password);
                const login = this.currentUser.login;
            
                res.render("myAccount", {
                    login
                });
            });
        }

        setGetMyAccount(){            
            this.app.get('/myAccount', (req, res) =>{
                const login = this.currentUser.login;
            
                res.render("myAccount", {
                    login
                });
            });
        }
    }
    
    module.exports = AccountController;