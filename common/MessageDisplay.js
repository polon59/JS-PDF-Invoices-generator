class MessageDisplay{
    constructor(){
        this.reset = "\x1b[0m";
        this.underscore = "\x1b[4m";
        this.colors = {
            red : "\x1b[31m",
            green : "\x1b[32m",
            yellow : "\x1b[33m",
            blue : "\x1b[34m"
        }
        this.backgrounds = {
            red : "\x1b[41m",
            green : "\x1b[42m",
            yellow : "\x1b[43m",
            blue : "\x1b[44m",
            white : "\x1b[47m"
        }
    }

    displayDBConnInfo(status){
        if (status === 'success') {
            console.log(`[DB Connection]: Database connection check ${this.backgrounds.green}SUCCESS${this.reset}.
            Successfuly established connection with MySQL database`);
            return;
        }
        console.log(`[DB Connection]: Database connection check ${this.backgrounds.red} ERROR ${this.reset}. 
            Authentication failed or database does not exist.
            Check host, user, password and DB data in ${this.underscore} ./DAO/DBConn.js ${this.reset} file.
            System message: ${this.colors.red} ${status.message} ${this.reset}`);
    }

    logInvoicesInfo(status,action,invoiceID){
        if (status == 'ok') {
            console.log(`${this.colors.green}[SQL INFO]${this.reset} succesful action : ${action} on invoice with (ID:${invoiceID})`);
            return;
        }
    }


    displayServerListeningInfo(port){
        console.log(`\n ${this.colors.blue}*** Server successfuly started listening on port ${port} *** ${this.reset} \n`)
    }



}

module.exports = MessageDisplay;