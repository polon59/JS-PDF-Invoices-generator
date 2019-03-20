class StatisticsDataParser{
    // converts JSON recieved from fetch to array of objects readable for AreaChart component

    parseDataForStatistics = (data)=>{
        let parsedData = [];
        data.forEach((dataElement) => {
            let currentStatsName = Object.keys(dataElement)[0];
            let formattedDataElement =  {} ;
            formattedDataElement[currentStatsName] = [];
            for (let monthNo = 1; monthNo < 13; monthNo++) {
                let dataElements = dataElement[Object.keys(dataElement)[0]]
                let formattedRecord = {};
                formattedRecord['month'] = monthNo;
                formattedRecord[currentStatsName] = 0;
                dataElements.forEach(record => {
                    if (record.month === monthNo) {
                        formattedRecord[currentStatsName] = record[Object.keys(record)[1]];
                    }
                });
                formattedDataElement[currentStatsName].push(formattedRecord);
                
            }
            parsedData.push(formattedDataElement);
        });
        return parsedData;
    }
}

export default StatisticsDataParser;