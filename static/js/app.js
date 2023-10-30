const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Making data variables
d3.json(url).then(function(data){
    names = data.names;
    metadata = data.metadata;
    sample = data.samples;
    orderedsamples = samples.sort((a,b) => b.sample_values - a.sample_values)
    init()
});

//Horizontal Bar Graph
d3.json(url).then((data) => {

      let samples = data.samples;
      let sample_values = valueData.sample_values;
      let result = sampleInfo.filter(result => result.id == bar);
      let value = value[0];
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;

      console.log(otu_ids,otu_labels,sample_values);

      let xticks = sample_values.slice(0,10).reverse();
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      Plotly.newPlot("bar", [trace])
  });
};

//Bubble Chart

