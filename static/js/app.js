const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
let l1 = [];
let l2 = [];
let l5 = [];
let l6 = [];
let a = [];
for (let i = 0; i < 153; i++){
  a.push(i);

}


d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  
  
  d3.json(url).then(function(data) {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var datasetbp = dropdownMenu.property("value");
    a = data['samples'].map((e1) => e1.id).indexOf(datasetbp)
    
    console.log(data['metadata'][a])

   
    d3.select('.id').text(`id = ${data['metadata'][a]['id']}`);
    d3.select('.ethnicity').text(`ethnicity = ${data['metadata'][a]['ethnicity']}`);
    d3.select('.gender').text(`gender = ${data['metadata'][a]['gender']}`);
    d3.select('.age').text(`age = ${data['metadata'][a]['age']}`);
    d3.select('.location').text(`location = ${data['metadata'][a]['location']}`);
    d3.select('.bbtype').text(`bbytype = ${data['metadata'][a]['bbtype']}`);
    d3.select('.wfreq').text(`wfreq = ${data['metadata'][a]['wfreq']}`);



    x= []
    y= []
    ht= []
    x = data['samples'][a]['sample_values'].slice(0,10).reverse().map(function(item) {
      return item
    });;
    y = data['samples'][a]['otu_ids'].slice(0,10).map(function(item) {
      return `OTU ${item}`;
    });
    ht = data['samples'][a]['otu_labels'].slice(0,10).map(function(item) {
      return item;
    });

    Plotly.restyle("bar", "x", [x])
    Plotly.restyle("bar", "y", [y])
    Plotly.restyle("bar", "hovertext", [ht])
    //bubbles
    x = data['samples'][a]['otu_ids'].reverse().map(function(item) {
      return item;
    });;
    y = data['samples'][a]['sample_values'].reverse().map(function(item) {
      return item
    });;
    z = data['samples'][a]['otu_ids'].reverse().map(function(item){
      return item

    });;
    Plotly.restyle("bubble", "x", [x])
    Plotly.restyle("bubble", "y", [y])
    marker = {color:z, size:y}
    Plotly.restyle("bubble", "marker", [marker])

  })
};



function init() {
  

  d3.json(url).then(function(data) {
    let dropdownMenu = d3.select("#selDataset");
    let datasetbp = dropdownMenu.property("value");
    l1.push(data['samples'][0]['otu_labels'].slice(0,10).reverse());
    l2.push(data['samples'][0]['sample_values'].slice(0,10).reverse());
    let l3 = data['samples'][0]['otu_ids'].slice(0,10).reverse().map(function(item) {
      return `OTU ${item}`;
    });
    let l4 = data['samples'][0]['otu_ids'].reverse().map(function(item) {
      return item;
    });
    l5.push(data['samples'][0]['sample_values'].reverse());
    l6.push(data['samples'][0]['otu_labels'].reverse());

    a = data['samples'].map((e1) => e1.id).indexOf(datasetbp)
    d3.select('.id').text(`id = ${data['metadata'][a]['id']}`);
    d3.select('.ethnicity').text(`ethnicity = ${data['metadata'][a]['ethnicity']}`);
    d3.select('.gender').text(`gender = ${data['metadata'][a]['gender']}`);
    d3.select('.age').text(`age = ${data['metadata'][a]['age']}`);
    d3.select('.location').text(`location = ${data['metadata'][a]['location']}`);
    d3.select('.bbtype').text(`bbytype = ${data['metadata'][a]['bbtype']}`);
    d3.select('.wfreq').text(`wfreq = ${data['metadata'][a]['wfreq']}`);

    let trace1 = {
      type : 'bar',
      x : l2[0],
      y : l3,
      orientation: 'h',
      order:'ascending',
      hovertext: l1[0]
    };
    console.log(l6)
    var trace2 = {
      x : l4,
      y : l5[0],
      mode: 'markers',
      marker: {color:l4,size:l5[0]},
      text: l6[0]
    }
    
    let data1 = [trace1];
    let data2 = [trace2];
    
    let layout1 = {
      height: 600,
      width: 800
    };
    let layout2 = {
      height: 500,
      width: 900
    };
    Plotly.newPlot("bar", data1, layout1);
    Plotly.newPlot("bubble", data2, layout2);
  }); 
}

init();
