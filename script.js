const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 550;
canvas.height = 550;

let segmentsArray = [];
let iterations = 5;

class Segment {
  constructor(point, angle, length) {
    this.theta = angle;
    this.magnitude = length;
    this.startPoint = point;
    this.endPoint = calculateEndpoint(this.startPoint, this.theta, this.magnitude);
    this.color = Math.random() * 360;
    this.altColor = this.startPoint[0] / canvas.width * 360;
    this.alt2Color = this.startPoint[0] - 75/ 300 * 360;
  }
  draw() {
    ctx.strokeStyle = `hsla(${this.alt2Color}, 100%, 50%, 1)`; //'white'
    ctx.beginPath();
    ctx.moveTo(...this.startPoint);
    ctx.lineTo(...this.endPoint);
    ctx.stroke();
    ctx.closePath();
  }
  divide() {
    let newLength = this.magnitude / 3;
    segmentsArray.push(new Segment(this.startPoint, this.theta, newLength));
    segmentsArray.push(new Segment(segmentsArray[segmentsArray.length - 1].endPoint, this.theta - Math.PI / 3, newLength));
    segmentsArray.push(new Segment(segmentsArray[segmentsArray.length - 1].endPoint, this.theta + Math.PI / 3, newLength));
    segmentsArray.push(new Segment(segmentsArray[segmentsArray.length - 1].endPoint, this.theta, newLength));
  }
}

function calculateEndpoint(point, angle, length) {
  dx = Math.cos(angle) * length;
  dy = Math.sin(angle) * length;
  bx = point[0] + dx;
  by = point[1] + dy;
  return [bx, by];
}

function drawKochCurve() {
  for (i = 0; i < iterations; i++) {
    let currentArrayLength = segmentsArray.length;
    for (j = 0; j < currentArrayLength; j++) {
      segmentsArray[0].divide();
      segmentsArray.shift();
    }
  }
  for (i = 0; i < segmentsArray.length; i++) {
    segmentsArray[i].draw();
  }
}

function init() {
  //For Koch curve on single line:
  //segmentsArray.push(new Segment([0, canvas.height * 0.5], 0, canvas.width));

  //For snowflake shape based on equilateral triangle:
  // let length = 400;
  // segmentsArray.push(new Segment([75, 400], -Math.PI / 3, length));
  // segmentsArray.push(new Segment(segmentsArray[0].endPoint, Math.PI / 3, length));
  // segmentsArray.push(new Segment(segmentsArray[1].endPoint, -Math.PI, length));

  //For a square-based nested rose shape:
  let length = 300;
  segmentsArray.push(new Segment([125, 125], 0, length));
  segmentsArray.push(new Segment([425, 125], Math.PI / 2, length));
  segmentsArray.push(new Segment([425, 425], -Math.PI, length));
  segmentsArray.push(new Segment([125, 425], -Math.PI / 2, length));

  length = 200;
  segmentsArray.push(new Segment([175, 175], 0, length));
  segmentsArray.push(new Segment([375, 175], Math.PI / 2, length));
  segmentsArray.push(new Segment([375, 375], -Math.PI, length));
  segmentsArray.push(new Segment([175, 375], -Math.PI / 2, length));

  length = 100;
  segmentsArray.push(new Segment([225, 225], 0, length));
  segmentsArray.push(new Segment([325, 225], Math.PI / 2, length));
  segmentsArray.push(new Segment([325, 325], -Math.PI, length));
  segmentsArray.push(new Segment([225, 325], -Math.PI / 2, length));

  drawKochCurve();
}

init();
