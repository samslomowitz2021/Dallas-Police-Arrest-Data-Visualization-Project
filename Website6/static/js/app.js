$(document).ready(function() {
    console.log("Page Loaded");
    doWork();

    $("#selDataset").on("change", function() {
        makeDashboard()
    });
});

// global data because the RESPONSE is not changing
var global_data;

function doWork() {
    // Problem 1: Can I read in the data and then print?
    var url = "static/data/genderYear9.json";
    requestD3(url);
}

function makeDashboard() {
    let id = $("#selDataset").val();
    
    createBarChart();
    createPieChart();
    createPieChart2();
    createHistogram(); 
    createBoxPlot();
    // makeSunburst();
    
}



function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data);
        global_data = data;
        createDropdown();
        // createMetadata(data);
        createBarChart();
        createPieChart();
        createPieChart2();
        createHistogram(); 
        createBoxPlot();
        // makeSunburst();
    });
}

function createDropdown() {

    // let id = $("#selDataset").val();
    // let info = data.metadata.filter(x => x.id == id)[0];
    // console.log(info);

    let race = global_data.map(d => d.race);
    race = new Set(race);
    race = [...race]
    console.log(race)
    for (let i = 0; i <race.length; i++) {
        let races = race[i];
        let html = `<option>${races}</option>`;
        $("#selDataset").append(html);
    }
}

// function createMetadata(id) {
//     $("#sample-metadata").empty();
//     let info = global_data.metadata.filter(x => x.id == id)[0];
//     console.log(info);
//     Object.entries(info).map(function(x) {
//         let html = `<h6>${x[0]}: ${x[1]}</h6>`;
//         $("#sample-metadata").append(html);
//     });
// }

function createBarChart() {
    console.log(global_data)

    var race_filter = $("#selDataset").val();
    var sub = global_data;
    if(race_filter!="All"){
        sub= global_data.filter(x=>x.race===race_filter);

        }

    var males = sub.filter(d=> d.gender==="Male");
    var years = males.map(d => d.year);
    var genders = males.map(d => d.genderCount);

    var females = sub.filter(d=> d.gender==="Female");
    var years2 = females.map(d => d.year);
    var genders2 = females.map(d => d.genderCount);


    var trace1 = {
        type: 'bar',
        x: years,
        y: genders,
        name: 'Males',
        marker: {
            color: ' #374F6B'
        }
        
    }

    var trace2 = {
        type: 'bar',
        x: years2,
        y: genders2,
        name: 'Females',
        marker: {
            color: 'deeppink'
        }
        
    }

    var data1 = [trace1, trace2];
    var layout = {
        "title": "Gender Count vs. Year"
    }

    Plotly.newPlot('myDiv', data1, layout);
}

// function avg(arr) {
//     var sum = 0;
 
//     // Iterate the elements of the array
//     arr.forEach(function (item, idx) {
//       sum += item;
//     });
 
//     // Returning the average of the numbers
//     return sum / arr.length;
//   }
function createPieChart() {
    console.log(global_data)

    var race_filter = $("#selDataset").val();
    var sub = global_data;
   
    if(race_filter!="All"){
        sub= global_data.filter(x=>x.race===race_filter);

        }

    var males = sub.filter(d=> d.gender==="Male");
    console.log(males)
    var weapons = males.map(d => d.weapon);
    console.log(weapons)
    var ages = males.map(d => d.avgAge);
    

    var data = [{
        values: ages,
        labels: weapons,
        domain: {column: 0},
        name: 'Males',
        mode:'markers',
        marker: {
            color:ages,
            colorscale: "Blues"
          },
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      
      }];
      
      var layout = {
        title: 'Male Gender and Weapon Type',
        annotations: [
          {
            font: {
              size: 20
            },
            showarrow: false,
            text: 'M',
            x: 0.17,
            y: 0.5
          }],

        height: 500,
        width: 700,
        showlegend: false,
        grid: {rows: 1, columns: 2}
      };
      
      Plotly.newPlot('myDiv2', data, layout);}

function createPieChart2() {
    console.log(global_data)

    var race_filter = $("#selDataset").val();
    var sub = global_data;
    
    if(race_filter!="All"){
        sub= global_data.filter(x=>x.race===race_filter);

        }
    
    var females = sub.filter(d=> d.gender==="Female");
    var weapons2 = females.map(d => d.weapon);
    var ages2 = females.map(d => d.avgAge);

    var data = [
        {
        values: ages2,
        labels: weapons2,
        text: 'Females',
        textposition: 'inside',
        domain: {column: 1},
        name: 'Females',
        mode:'markers',
        marker: {
            color:ages2,
            colorscale: "Magenta"
            },
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
        }];
        
        var layout = {
        title: 'Female Gender and Weapon Type',
        annotations: [
            
            {
            font: {
                size: 20
            },
            showarrow: false,
            text: 'F',
            x: 0.82,
            y: 0.5
            }
        ],
        height: 500,
        width: 700,
        showlegend: false,
        grid: {rows: 1, columns: 2}
        };
        
        Plotly.newPlot('myDiv2b', data, layout);}


function createHistogram() {
    console.log(global_data)

    var race_filter = $("#selDataset").val();
    var sub = global_data;
   
    if(race_filter!="All"){
        sub= global_data.filter(x=>x.race===race_filter);

        }

    var males = sub.filter(d=> d.gender==="Male");
    var ages = males.map(d => d.avgAge);
    
    var females = sub.filter(d=> d.gender==="Female");
    var ages2 = females.map(d => d.avgAge);

    var trace = {
        x: ages,
        type: 'histogram',
        marker: {
            color: '#374F6B'
        }
    };

    var trace2 = {
        x: ages2,
        type: 'histogram',
        marker: {
            color: 'deeppink'
        }
    };
    var data = [trace];
    var data2 = [trace2];
    Plotly.newPlot('myDiv3', data);
    Plotly.newPlot('myDiv4', data2);
}

function createBoxPlot() {
    var race_filter = $("#selDataset").val();
    var sub = global_data;
    if(race_filter!="All"){
        sub= global_data.filter(x=>x.race===race_filter);

        }

    var day = sub.map(d=> d.day);
    var ages = sub.map(d => d.avgAge);
    console.log(ages)

    // var day2 = sub.filter(d=> d.day==="Saturday");
    // var ages2 = day2.map(d => d.age);

    // var day3 = sub.filter(d=> d.day==="Sunday");
    // var ages3 = day3.map(d => d.age);
    
    var y0 = ages;
    // var y1 = ages2;
    // var y2 = ages3;
    

    var trace1 = {
    x: day,
    y: y0,
    type: 'box',
    marker: {
        color: ' #374F6B'
    }
    };

    // var trace2 = {
    // x: day2,
    // y: y1,
    // type: 'box'
    // };

    // var trace3 = {
    //     x: day3,
    //     y: y2,
    //     type: 'box'
    //     };

    var data = [trace1];

    Plotly.newPlot('myDiv5', data);}

// function makeSunburst() {
//     console.log(global_data)

//     var race_filter = $("#selDataset").val();
//     var sub = global_data;
   
//     if(race_filter!="All"){
//         sub= global_data.filter(x=>x.race===race_filter);

//         }

//     var males = sub.filter(d=> d.gender==="Male");
//     console.log(males)
//     var weapons = males.map(d => d.weapon);
//     console.log(weapons)
//     var days = males.map(d => d.day);

//     var females = sub.filter(d=> d.gender==="Female");
//     console.log(males)
//     var weapons2 = females.map(d => d.weapon);
//     console.log(weapons)
//     var days2 = females.map(d => d.day);
    

//     var data = [{
//         type: "sunburst",
//         // ids: [weapons, weapons2, days, days2],
//         labels: ["males", "females","weapons","weaponz"],
//         parents:[ "", "","males","females"],
//         values: [1,1,1,1],
//         outsidetextfont: {size: 20, color: "#377eb8"},
//         marker: {line: {width: 2}},
//     }];

//     var layout = {
//         margin: {l: 0, r: 0, b: 0, t: 0},
//         sunburstcolorway: "earth"
//     };

//     Plotly.newPlot("sunburst", data, layout)
// };
