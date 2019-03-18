const StatisticsDAO = require('./DAO/StatisticsDAO');

class StatisticsController{
    
    constructor(app, connection){
        this.app = app;
        this.statisticsDAO = new StatisticsDAO(connection);
    }
}

module.exports = StatisticsController;