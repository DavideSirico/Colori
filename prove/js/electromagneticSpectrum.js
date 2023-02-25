var wavelengthConfig = {
  graphID: "waveViewGraph", // ID for the SVG context for the graph.
  containerID: "waveView", // Graph will be inserted into this element.
  width: $("#waveView").width(), // Outer dim.  If blank, will take from container element (TODO).
  height: $("#waveView").width() / 2, // Outer dim.  If blank, will take from container element (TODO).
  gmargin: { top: 10, right: 20, bottom: 40, left: 60 }, // graph area margins
  xmin: 0,
  xmax: 2000, // nm
  ymin: -1,
  ymax: 1,
  xlabel: "Nanometers",
  ylabel: "Amplitude",
  xticks: 5, // Number of ticks on axis.  Auto if 0.
  yticks: 5, // Number of ticks on axis.  Auto if 0.
  xtickFormat: null, // Number format for tick-mark labels.  See d3-format.
  ytickFormat: null, // Number format for tick-mark labels.  See d3-format.
  zeroLine: false, // If true, adds a line across y=0.
  sortLinesByX: true, // Sort line data by increasing x value.
  fastTransition: 50, // Animation duration (ms)
  slowTransition: 600, // For slower animations, e.g. enter/exit.
};

var photonGraphConfig = {
  graphID: "photonGraph", // ID for the SVG context for the graph.
  containerID: "photonView", // Graph will be inserted into this element.
  width: $("#photonView").width(), // Outer dim.  If blank, will take from container element (TODO).
  height: $("#photonView").width() / 2, // Outer dim.  If blank, will take from container element (TODO).
  gmargin: { top: 10, right: 10, bottom: 40, left: 60 }, // graph area margins
  xmin: -5,
  xmax: 5, // nm
  ymin: -1,
  ymax: 1,
  xlabel: "Nanometers",
  ylabel: "Amplitude",
  xticks: 5, // Number of ticks on axis.  Auto if 0.
  yticks: 5, // Number of ticks on axis.  Auto if 0.
  xtickFormat: null, // Number format for tick-mark labels.  See d3-format.
  ytickFormat: null, // Number format for tick-mark labels.  See d3-format.
  zeroLine: false, // If true, adds a line across y=0.
  sortLinesByX: true, // Sort line data by increasing x value.
  fastTransition: 50, // Animation duration (ms)
  slowTransition: 600, // For slower animations, e.g. enter/exit.
};

var wavelengthGraph = new KCVSGraph(wavelengthConfig);
var photonGraph = new KCVSGraph(photonGraphConfig);

var currentWavelength = 550;
var currentRGB = "rgb(0, 0, 0)";
var currentFreq = 5.45;
var currentEnergy = 5.45;
var wavelengthArray = {
  id: "wavelengthLine",
  x: [],
  y: [],
};
var photonArrayRight = {
  id: "photonLineRight",
  x: [],
  y: [],
};
var photonArrayLeft = {
  id: "photonLineLeft",
  x: [],
  y: [],
};

var RGBValues = [0, 0, 0];

updateWavelengthArray();
updatePhotonArray();

// wavelengthGraph.markerLines("wavelengthLine",wavelengthArray.y, 'y', true);
wavelengthGraph.addLine(wavelengthArray);
photonGraph.addLine(photonArrayRight);
photonGraph.addLine(photonArrayLeft);

// FIXME: con il rosso molto acceso esplode tutto (forse è normale)
function updateWavelength() {
  HSLValues = rgbToHsl(RGBValues);
  console.log(HSLValues);
  frequency = 780 - (400 / 360) * HSLValues[0];
  // min: 380, Min value for the slider.
  // max: 780, Max value for the slider.
  /*if(frequency < 380){
        frequency = 380;
    }
    if(frequency > 780){
        frequency = 780;
    }*/
  currentWavelength = frequency;
  console.log(currentWavelength);
}

// copiato da stackoverflow
function rgbToHsl(c) {
  var r = c[0] / 255,
    g = c[1] / 255,
    b = c[2] / 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return new Array(h * 360, s * 100, l * 100);
}

function update() {
  // var inputValue = visibleSpectrumSlider.value;
  updateWavelength();
  updateWavelengthArray();
  updatePhotonArray();
  console.log("Updating Wavelength");
  console.log("Current wavelength: " + currentWavelength);
  console.log("Current RGB Color: " + currentRGB);
  console.log("Current Frequency: " + currentFreq);
  console.log("Current Energy: " + currentEnergy);
  console.log("Updated wavelength: " + currentWavelength);
  console.log("Updated RGB Color: " + currentRGB);
  updateFreq();
  console.log("Updated Energy: " + currentEnergy);
  console.log("Updated Frequency: " + currentFreq);
  updateEnergy();
  wavelengthGraph.updateLine(
    wavelengthArray.id,
    wavelengthArray.x,
    wavelengthArray.y
  );
  photonGraph.updateLine(
    photonArrayRight.id,
    photonArrayRight.x,
    photonArrayRight.y
  );
  photonGraph.updateLine(
    photonArrayLeft.id,
    photonArrayLeft.x,
    photonArrayLeft.y
  );
}

// Roba matematica
function updateFreq() {
  var c = 2.9979e17;
  currentFreq = c / currentWavelength;
  currentFreq = currentFreq / 1e14;
  currentFreq = currentFreq.toPrecision(3);
  var output = "Frequency = " + currentFreq + " x 10<sup>14</sup>";
  $("#frequency").html(output);
  return;
}

// Roba matematica
function updateEnergy() {
  currentEnergy = 1240 / currentWavelength;
  currentEnergy = currentEnergy.toPrecision(3);
  var output = "Energy = " + currentFreq + " (eV)";
  $("#energy").html(output);
  return;
}

// Non lo so
function updateWavelengthArray() {
  var n = 100;
  wavelengthArray.x = Array(n);
  wavelengthArray.y = Array(n);
  for (var i = 0; i < n; i++) {
    wavelengthArray.x[i] = (wavelengthGraph.getXmax() * i) / n;
    wavelengthArray.y[i] = Math.sin(
      (2 * Math.PI * wavelengthArray.x[i]) / currentWavelength
    );
  }
  $("#wavelengthLine").css("stroke", currentRGB);
}

function updatePhotonArray() {
  var n = 250;
  photonArrayRight.x = Array(n);
  photonArrayRight.y = Array(n);
  photonArrayLeft.x = Array(n);
  photonArrayLeft.y = Array(n);
  for (var i = 0; i < n; i++) {
    photonArrayRight.x[i] = (photonGraph.getXmax() * i) / n;
    photonArrayRight.y[i] =
      1 *
      Math.exp(-photonArrayRight.x[i]) *
      Math.sin((5500 / currentWavelength) * photonArrayRight.x[i]);
  }
  for (var i = 0; i < n; i++) {
    photonArrayLeft.x[i] = ((photonGraph.getXmax() * i) / n) * -1;
    photonArrayLeft.y[i] =
      1 *
      Math.exp(photonArrayLeft.x[i]) *
      Math.sin((5500 / currentWavelength) * photonArrayLeft.x[i]);
  }
  $("#photonLineRight").css("stroke", currentRGB);
  $("#photonLineLeft").css("stroke", currentRGB);
}

$(document).ready(function () {
  update();
});

// leggo l'immagine dal form e la disegno sul canvas
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      img = new Image();
      img.crossOrigin = "anonymous";
      img.src = e.target.result;
      img.addEventListener("load", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //scale image to fit canvas
        const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          ),
          x = canvas.width / 2 - (img.width / 2) * scale,
          y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        img.style.display = "none";
      });
    };
    reader.readAsDataURL(input.files[0]);
  }
}

let img = new Image();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hoveredColor = document.getElementById("hovered-color");
const selectedColor = document.getElementById("selected-color");

// funzione che visualizza il colore che si sta hoverando
function pick_hover(event) {
  const bounding = canvas.getBoundingClientRect();
  const x = event.clientX - bounding.left;
  const y = event.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  hoveredColor.style.background = rgba;
  hoveredColor.textContent = rgba;
  return rgba;
}

// funzione che visualizza il colore su cui si ha cliccato
function pick_select(event) {
  const bounding = canvas.getBoundingClientRect();
  const x = event.clientX - bounding.left;
  const y = event.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  selectedColor.style.background = rgba;
  selectedColor.textContent = rgba;
  currentRGB = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  RGBValues = [data[0], data[1], data[2]];
  update();
  return rgba;
}

canvas.addEventListener("mousemove", (event) => pick_hover(event));
canvas.addEventListener("click", (event) => pick_select(event));
