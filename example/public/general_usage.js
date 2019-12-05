'use strict';
var signalFx = require('../../lib/signalfx');

var token = 'VkFOArA5z_3-FIbIqL74Pg'; // Replace with you token

var client = new signalFx.Ingest(token, {
  enableAmazonUniqueId: false, // Set this parameter to `true` to retrieve and add Amazon unique identifier as dimension
  dimensions: { type: 'test.cust_dim' , host: 'myhost' }, // This dimension will be added to every datapoint and event
  ingestEndpoint: 'https://ingest.us1.signalfx.com'
});

// // Sent datapoints routine
var counter = 0;
function loop() {
  setTimeout(function () {
    console.log(counter);
    var gauges = [{ metric: 'node_gauge_custom_metrics', value: counter % 10}];
    var counters = [{metric: 'node_counter_custom_metrics', value: counter % 2}];
    var cumulative_counters = [{ metric: 'node_cumulative_counter_custom_metrics', value: counter % 5}]
    // Send datapoint
    client.send({ gauges: gauges, counters: counters, cumulative_counters: cumulative_counters });
    counter += 1;
    loop();
  }, 1000);
}

// loop();
