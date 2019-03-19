const StatisticsDAO = require('./DAO/StatisticsDAO');

class StatisticsController{
    
    constructor(app, connection){
        this.app = app;
        this.statisticsDAO = new StatisticsDAO(connection);
    }

    setRoutes(){
        this.setRouteGetStatisticsForGivenYear();
    }

    setRouteGetStatisticsForGivenYear(){
        this.app.get('/myAccount/statistics/:year', (req,res) =>{
            const year = req.params.year;
            this.statisticsDAO.getAllStatistics(year)
            .then((result)=>{
                res.send(result);
            })
            .catch(error => {res.send("ERROR");console.log(error.message)});
        });
    }
}

module.exports = StatisticsController;