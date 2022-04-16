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
    // let info = global_data.metadata.filter(x => x.id == id)[0];
    // console.log(info);
    // Object.entries(info).map(function(x) {
    //     let html = `<h6>${x[0]}: ${x[1]}</h6>`;
    //     $("#sample-metadata").append(html);

    // createMetadata(id);
    createBarChart();
    createPieChart();
    createHistogram() 
    // createGaugeChart(id);
}

// function requestAjax(url) {
//     $.ajax({
//         type: "GET",
//         url: url,
//         contentType: "application/json; charset=utf-8",
//         success: function(data) {
//             console.log(data);
//             global_data = data;
//             // createDropdown();
//             makeDashboard();
//         },
//         error: function(textStatus, errorThrown) {
//             console.log("FAILED to get data");
//             console.log(textStatus);
//             console.log(errorThrown);
//         }
//     });
// }

function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data);
        global_data = data;
        createDropdown();
        // createMetadata(data);
        createBarChart();
        createPieChart();
        createHistogram() 
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
            color: 'seagreen'
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
    
    var females = sub.filter(d=> d.gender==="Female");
    var weapons2 = females.map(d => d.weapon);
    var ages2 = females.map(d => d.avgAge);

    var data = [{
        values: ages,
        labels: weapons,
        domain: {column: 0},
        name: 'Males',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      
      },
      {
        values: ages2,
        labels: weapons2,
        text: 'Females',
        textposition: 'inside',
        domain: {column: 1},
        name: 'Females',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }];
      
      var layout = {
        title: 'Gender and Weapon Type',
        annotations: [
          {
            font: {
              size: 20
            },
            showarrow: false,
            text: 'M',
            x: 0.17,
            y: 0.5
          },
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
        height: 400,
        width: 600,
        showlegend: false,
        grid: {rows: 1, columns: 2}
      };
      
      Plotly.newPlot('myDiv2', data, layout);}


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
    };

    var trace2 = {
        x: ages2,
        type: 'histogram',
    };
    var data = [trace];
    var data2 = [trace2];
    Plotly.newPlot('myDiv3', data);
    Plotly.newPlot('myDiv4', data2);
}

// $(document).ready(function() {
//     doWork();


//     // EVENT LISTENERS
//     $("#filter").on("click", function() {
//         //DO WORK
//         doWork();
//     })


// });

// var url = "static/data/genderYear3.json";

// function doWork() {

//     requestD3(url);
// }


// function requestD3(url) {
//     d3.json(url).then(function(data) {


//         getPlot(data);
//     });
// }

// function getPlot(data){
    
//     let filter_value = $("#searches").val();
//     console.log(filter_value)
//     let slices_value = $("#slices").val();
//     let sorting_value = $("#sorting").val();
//     let sorting_value2 = $("#sorting2").val();

//     // let sub = data.filter(row => row.race == sorting_value);
//     let sub = data.filter(row => row.genderCount > filter_value);
//     console.log(sub)

//     // APPLY SORTING
//     if (sorting_value2 === "Male_Desc") {
        
//         sub = sub.sort(function(first_row, second_row) {
//             console.log(sub)
//             return second_row.genderCount - first_row.genderCount
        
//         });
  
//     } 
//     else if (sorting_value2 === "Male_Ascend") {
//         sub = sub.sort(function(first_row, second_row) {
//             return second_row.genderCount - first_row.genderCount
//         });

//     } 
//     else if (sorting_value2 === "Female_Desc") {
//         sub = sub.sort(function(first_row, second_row) {
//             return second_row.genderCount - first_row.genderCount
//         });

//     } else {
//         sub = sub.sort(function(first_row, second_row) {
//             return first_row.genderCount - second_row.genderCount
//         });
//     }
    

//     // sub = sub.slice(0, slices_value);

//     var males = data.filter(d=> d.gender==="Male");
//     var years = males.map(d => d.year);
//     var genders = males.map(d => d.genderCount);

//     // var males2 = sub.slice(0, slices_value);
//     // var years = males2.map(d => d.year);
//     // var genders = males2.map(d => d.genderCount);

//     // console.log(years)
//     var trace1 = {
//         // 
//         x: years,
//         y: genders,
//         name: 'Males',
//         type: 'bar',
//         marker: {
//              color: 'seagreen'
//                     }
//     };
    
//     var females = data.filter(d=> d.gender==="Female");
//     var years = females.map(d => d.year);
//     var genders = females.map(d => d.genderCount);

//     // var females2 = sub.slice(0, slices_value);
//     // var years = females2.map(d => d.year);
//     // var genders = females2.map(d => d.genderCount);
    
//     var trace2 = {
//         x: years,
//         y: genders,
//         name: 'Females',
//         type: 'bar',
//         marker: {
//             color: 'firebrick'
//                    }
//     };

  
//     var data = [trace1, trace2];

//     var layout = {barmode: 'stack'};

//     Plotly.newPlot('myDiv', data, layout);
//     }
