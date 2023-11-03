const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
let dropdown = d3.select('#selDataset')
let metaDataContainer = d3.select('#sample-metadata')

// Making data variables
d3.json(url).then(function(data){
    names = data.names;
    metaData = data.metadata;
    samples = data.samples;
    sortedSamples = samples.sort((a,b) => b.sample_values - a.sample_values)
    populateDropdown(names)
    createBarGraph(sortedSamples[0])
    createBubbleChart(sortedSamples[0])
    createDemographicInfo(sortedSamples[0].id)
});

function populateDropdown (names) {
    names.forEach((id) => {
        dropdown.append("option").text(id).property("value",id);
    });
}

function createBarGraph (sample) {
    let yticks = sample.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let xticks = sample.sample_values.slice(0,10).reverse();
    let labels = sample.otu_labels.slice(0,10).reverse();
    
    let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h"
    };

    Plotly.newPlot("bar", [trace])
    
}

function createBubbleChart(sample) {
    let otuIds = sample.otu_ids
    let sampleValues = sample.sample_values
    let otuLabels = sample.otu_labels
    
    let trace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: "Earth"
        }
    };


    Plotly.newPlot("bubble", [trace], {xaxis:{title:"OTU ID"}})
}

function createDemographicInfo (id) {
    let sampleMetaData = metaData.filter((data)=>data.id == id)[0]
    d3.select("#sample-metadata").html("")
    Object.entries(sampleMetaData).map(([k,v])=>{
        console.log(k,v)
        d3.select("#sample-metadata").append("h5").text(`${k}: ${v}`);
    })
}

function optionChanged (id) {
    const subject = sortedSamples.filter((sample)=>sample.id === id)[0]
    createBarGraph(subject)
    createBubbleChart(subject)
    createDemographicInfo(id)
}

// //Horizontal Bar Graph
// d3.json(url).then((data) => {

//       let samples = data.samples;
//       let sample_values = valueData.sample_values;
//       let result = sampleInfo.filter(result => result.id == bar);
//       let value = value[0];
//       let otu_ids = valueData.otu_ids;
//       let otu_labels = valueData.otu_labels;

//       console.log(otu_ids,otu_labels,sample_values);

//       let xticks = sample_values.slice(0,10).reverse();
//       let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
//       let labels = otu_labels.slice(0,10).reverse();
      
//       let trace = {
//           x: xticks,
//           y: yticks,
//           text: labels,
//           type: "bar",
//           orientation: "h"
//       };

//       Plotly.newPlot("bar", [trace])
//   });
