anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile("static/data/genderYear10.json",
      function (data) {
        console.log(data)
        // create a data tree from the dataset
        var dataTree = anychart.data.tree(data);
        console.log(dataTree)
        // create a sunburst chart
        var chart = anychart.sunburst(dataTree);
    
        // set the calculation mode
        chart.calculationMode('parent-independent');
    
        // set the ascending sort order
        chart.sort('asc');
    
        // set the chart title
        chart.title("COVID-19 Cases Across the World");
      
        // set the chart container element id
        chart.container('container');
    
        // initiate chart drawing
        chart.draw();
      
      });
    });