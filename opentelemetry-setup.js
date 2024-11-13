// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// const sdk = new NodeSDK({
//   traceExporter: new JaegerExporter({
//     endpoint: 'http://localhost:14268/api/traces',
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// (async () => {
//   try {
//     await sdk.start();
//     console.log('OpenTelemetry initialized');
//   } catch (error) {
//     console.error('Error initializing OpenTelemetry', error);
//     process.exit(1);
//   }
// })();
/*instrumentation.js*/
// Require dependencies


// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
// const {
//   getNodeAutoInstrumentations,
// } = require('@opentelemetry/auto-instrumentations-node');
// const {
//   PeriodicExportingMetricReader,
//   ConsoleMetricExporter,
// } = require('@opentelemetry/sdk-metrics');

// const sdk = new NodeSDK({
//   traceExporter: new ConsoleSpanExporter(),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new ConsoleMetricExporter(),
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// sdk.start();
// Import necessary dependencies from OpenTelemetry packages
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');

// Create a NodeSDK instance
const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
    exportIntervalMillis: 5000,  // Set an interval for periodic metrics export
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the SDK
async function startSdk() {
  try {
    await sdk.start();
    console.log('OpenTelemetry SDK initialized');
  } catch (error) {
    console.error('Error initializing OpenTelemetry SDK:', error);
    process.exit(1);  // Exit process on initialization failure
  }
}

// Call the function to initialize the SDK
startSdk();
