$(document).ready(function() {
    doWork();

    // EVENT LISTENERS
    $("#filter").on("click", function() {
        //DO WORK
        getDataAndPlot();
    })
});

var url = "static/data/genderYear3.json";

function doWork() {

    requestD3(url);
}


function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data)
        getPlot(data);
    });
}

function getPlot(data){
    var males = data.filter(d=> d.gender==="Male");
    var years = males.map(d => d.year);
    var genders = males.map(d => d.genderCount);
    // console.log(years)
    var trace1 = {
        // 
        x: years,
        y: genders,
        name: 'Males',
        type: 'bar'
    };
    
    var females = data.filter(d=> d.gender==="Female");
    var years = females.map(d => d.year);
    var genders = females.map(d => d.genderCount);
    
    var trace2 = {
        x: years,
        y: genders,
        name: 'Females',
        type: 'bar'
    };

  
    var data = [trace1, trace2];

    var layout = {barmode: 'stack'};

    Plotly.newPlot('myDiv', data, layout);
    }


// function getData() {
//     let filepath = "static/data/genderYear.csv";

//     d3.csv(filepath).then(function(data) {
//         console.log(data);

//         let breeds = data.map(x => x["Dog breed"]);
//         let score = data.map(x => +x["datadog score"]); // the + casts to number
//         makePlot(breeds, score);
//     });
// }


// function getDataAndPlot() {

// function makePlot(romanNames, romanSearch) {

//     var trace1 = {
//         x: romanNames,
//         y: romanSearch,
//         name: 'Roman Gods',
//         type: 'bar'
//             // mode: "markers"
//     };

//     var data = [trace1];

//     var layout = { title: "Roman Gods" };

//     Plotly.newPlot('plot', data, layout);
// }
    



// function getDataAndPlot(data) {
//     console.log(data);

//     // user input
//     let filter_value = $("#searches").val();
//     let slices_value = $("#slices").val();

//     let sub = data.filter(row => row.arrestDay > slices_value );

//     // APPLY SORTING
//     if (sorting_value === "Descending") {
//         sub = sub.sort(function(first_row, second_row) {
//             return second_row.age - first_row.age
//         });

//     } else {
//         sub = sub.sort(function(first_row, second_row) {
//             return first_row.age - second_row.age
//         });
//     }

//     // APPLY SLICING
//     sub = sub.slice(0, slices_value);

//     let races = sub.map(row => row.race);
//     let ages = sub.map(row => row.age);

//     //make plot
//     makePlot(races, ages);
// }

// function makePlot(races, ages) {

//     var trace1 = {
//         x: races,
//         y: ages,
//         name: 'Age',
//         type: 'bar'
//             // mode: "markers"
//     };

//     var data = [trace1];

//     var layout = { title: "Age vs. Race in Police Arrests in Dallas" };

//     Plotly.newPlot('plot', data, layout);
// }


// $(document).ready(function() {
//     doWork();

//     //  // EVENT LISTENERS
//     //  $("#filter").on("click", function() {
//     //     //DO WORK
//     //     getDataAndPlot();
//     // })
// });

// var url = "static/data/policeData.json";

// function doWork() {
    
//     // Problem 1: Can I read in the data and then print?
   

//     // // APPLY SLICING
//     // sub = sub.slice(0, slices_value);

//     // let x = sub.map(row => row.weapons3);
//     // let y = sub.map(row => row.arrestWeapon3);


//     requestD3(url);
// }


// function requestD3(url) {
//     d3.json(url).then(function(data) {
//     console.log(data)
//         // processData(data);
//     });
// }


// function processData(data) {

//     // let filter_value = $("#searches").val();

//     // let sub = data.filter(row => row.arrestYear > filter_value);


//     var races = data.race;
//     // var races2 = Object.values(races);
   

//     var gender2 = data.gender;
//     // var gender3 = Object.values(gender2);
    
//     makePlot2(races, gender2);
   

// }



// function makePlot2(races, gender2) {
//     // Initialized arrays
//     // Trace1 for the Greek Data

//     var trace1 = {
//         x: races,
//         y: gender2,
//         type: 'pie'
//             // mode: "markers"
//     };

//     var data = [trace1];

//     var layout = { title: "Races and Gender in Dallas Police Arrests" };

//     Plotly.newPlot('plot', data, layout);

// }


// $(document).ready(function() {
//     doWork();

//      // EVENT LISTENERS
//      $("#filter").on("click", function() {
//         //DO WORK
//         getDataAndPlot();
//     })
// });

// var url = "static/data/arrestWeapon.json";

// function doWork() {
    
//     // Problem 1: Can I read in the data and then print?
   

//     // // APPLY SLICING
//     // sub = sub.slice(0, slices_value);

//     // let x = sub.map(row => row.weapons3);
//     // let y = sub.map(row => row.arrestWeapon3);


//     requestD3(url);
// }


// function requestD3(url) {
//     d3.json(url).then(function(data) {

//         processData(data);
//     });
// }

// function processData(data) {

//     let filter_value = $("#searches").val();

//     let sub = data.filter(row => row.arrestYear > filter_value);


//     var weapons2 = data.index;
//     var weapons3 = Object.values(weapons2);
   

//     var arrestWeapon2 = data.arrestWeapon;
//     var arrestWeapon3 = Object.values(arrestWeapon2);
    
//     makePlot2(weapons3, arrestWeapon3);
   

// }





// function makePlot2(weapons3, arrestWeapon3) {
//     // Initialized arrays
//     // Trace1 for the Greek Data

//     var trace1 = {
//         x: weapons3,
//         y: arrestWeapon3,
//         type: 'bar'
//             // mode: "markers"
//     };

//     var data = [trace1];

//     var layout = { title: "Frequency of Weapons in Dallas Police Arrests" };

//     Plotly.newPlot('plot', data, layout);

// }

