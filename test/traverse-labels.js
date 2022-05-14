// sample function to traverse through the Video AI result

const fs = require("fs");

const rawdata = JSON.parse(fs.readFileSync(process.argv[2]));

// Gets annotations for video
const annotations = rawdata.annotationResults[0];

// Gets labels for video from its annotations
const labels = annotations.segmentLabelAnnotations;
labels.forEach((label) => {
  console.log(`Label ${label.entity.description} occurs at:`);
  label.segments.forEach((segment) => {
    segment = segment.segment;
    console.log(`\tStart: ${segment.startTimeOffset}`);
    console.log(`\tEnd: ${segment.endTimeOffset}.`,
    );
  });
});
