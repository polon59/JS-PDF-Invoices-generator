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
                const login = req.body.login;
            
                console.log(`[INFO] logged user: (password:${req.body.password} , login: ${login})`);
            
                res.render("myAccount", {
                    login
                });
            });
        }

    }
    
    module.exports = AccountController;