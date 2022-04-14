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
    var url = "static/data/genderYear5.json";
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
    // createBubbleChart(id);
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
        // createBubbleChart(data);
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
    // var sub= global_data.filter(x=>x.race===race_filter);

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
// function bubbleChart() {
//     var trace1 = {
//         x: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,2022],
//         y: [5472, 7956, 7781, 5852,9243,8343,7755,7585,870],
//         mode: 'markers',
//         marker: {
//           color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//           opacity: [1, 0.8, 0.6, 0.4],
//           size: [40, 60, 80, 100]
//         }
//       };
      
//       var data = [trace1];
      
//       var layout = {
//         title: 'Year and Arrest Count',
//         showlegend: false,
//         height: 600,
//         width: 600
//       };
      
//       Plotly.newPlot('myDiv2', data, layout);}