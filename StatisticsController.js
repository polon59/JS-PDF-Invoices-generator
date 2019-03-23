const StatisticsDAO = require('./DAO/StatisticsDAO');

class StatisticsController{
    
    constructor(app, connection){
        this.app = app;
        this.statisticsDAO = new StatisticsDAO(connection);
    }

    setRoutes(){
        this.setRouteGetStatisticsForGivenYear();
        this.setRouteGetAvailableStatisticsYears();
    }

    setRouteGetAvailableStatisticsYears(){
        this.app.get('/myAccount/statistics/years', (req,res) =>{
            this.statisticsDAO.getAvailableStatisticsYears()
            .then( result=>{
                res.send(JSON.stringify(result));
            })
            .catch(error => {res.send(`ERROR`)});
        });
    }

    setRouteGetStatisticsForGivenYear(){
        this.app.get('/myAccount/statistics/getFor/:year', (req,res) =>{
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