// Preserve the initial sweep and replace only the explicitly rerun widgets.
const fs = require('fs');
const sources = ['visual-labs-full-sweep.json', 'visual-labs-targeted-retries.json', 'widgets-targeted.json'];
const merged = new Map();
for (const source of sources) {
  const report = JSON.parse(fs.readFileSync('qa/reports/' + source));
  for (const widget of report.results) merged.set(widget.id, widget);
}
let cases = 0, controlValues = 0, buttonsClicked = 0;
const failures = [];
for (const widget of merged.values()) {
  if (widget.error || widget.errors?.length) failures.push({id: widget.id, error: widget.error, errors: widget.errors});
  for (const result of widget.results || []) {
    cases++; controlValues += result.controlValuesExercised; buttonsClicked += result.buttonsClicked;
    for (const state of ['initial', 'final']) {
      const geometry = result[state];
      if (geometry.overlaps.length || geometry.overflow.length || geometry.tinyText.length) failures.push({id:widget.id,width:result.width,theme:result.theme,state,...geometry});
    }
    if (result.states.length || result.status.error || result.status.invalidNumber || result.status.documentOverflow) failures.push({id:widget.id,width:result.width,theme:result.theme,status:result.status,states:result.states});
  }
}
const report = {timestamp:new Date().toISOString(),sources,retried:['amhs-sim','dram-cell','euv-source','bragg-mirror'],widgets:merged.size,cases,controlValues,buttonsClicked,failures};
fs.writeFileSync('qa/reports/visual-labs-validation.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(failures.length || merged.size !== 46) process.exitCode=1;
