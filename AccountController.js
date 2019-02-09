const User = require('./model/User.js');

class AccountController{
    
        constructor(app){
            this.app = app;
            this.currentUser = undefined;
        }


        addNewUser(){
            
        }

        setRoutes(){
            this.setRouteMyAccount();
        }

        setRouteMyAccount(){
            this.app.post('/myAccount', (req, res) =>{
                const reqBody = req.body;
                const login = reqBody.login;
                this.currentUser = new User(reqBody.login, reqBody.password);
            
                res.render("myAccount", {
                    login
                });
            });
        }

    }
    
    module.exports = AccountController;