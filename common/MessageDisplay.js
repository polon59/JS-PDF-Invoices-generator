
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
}

module.exports = MessageDisplay;