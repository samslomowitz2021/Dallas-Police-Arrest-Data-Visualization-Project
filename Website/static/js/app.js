$(document).ready(function() {
    console.log("Page Loaded");
    doWork();
});


var url = "static/data/out2.json"

function doWork() {
    // Problem 1: Can I read in the data and then print?
    // var url = "static/data/samples.json";
    requestD3(url);
}


function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data);

        createDropdown(data);
        createMetadata(data);
        // createBarChart(data);
    });
}

function createDropdown(data) {
    var years = data.arrestYear;
    for (let i = 0; i < 5; i++) {
        let year = years[i];
        let html = `<option>${year}</option>`;
        $("#sample-metadata").empty();
        $("#selDataset").append(html);
    }
}

function createMetadata(data) {
    let id = $("#selDataset").val();
    let info = data.arrestYear[0];
    console.log(info);
    Object.entries(info).map(function(x) {
        let html = `<h6>${x[0]}: ${x[1]}</h6>`;
        $("#sample-metadata").append(html);
    });
}


function Year(number) {
    console.log(number)
    d3.json(url).then(function(data) {
        console.log(data);

        createDropdown(data);
        createMetadata(data);
        // createBarChart(data);

})}