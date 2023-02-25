var wavelengthConfig = {
    graphID: "waveViewGraph", // ID for the SVG context for the graph.
    containerID: "waveView", // Graph will be inserted into this element.
    width: $('#waveView').width(), // Outer dim.  If blank, will take from container element (TODO).
    height: $('#waveView').width()/2, // Outer dim.  If blank, will take from container element (TODO).
    gmargin: {top: 10, right: 20, bottom: 40, left: 60}, // graph area margins
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
}

var photonGraphConfig = {
    graphID: "photonGraph", // ID for the SVG context for the graph.
    containerID: "photonView", // Graph will be inserted into this element.
    width: $('#photonView').width(), // Outer dim.  If blank, will take from container element (TODO).
    height: $('#photonView').width()/2, // Outer dim.  If blank, will take from container element (TODO).
    gmargin: {top: 10, right: 10, bottom: 40, left: 60}, // graph area margins
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
}

var wavelengthGraph = new KCVSGraph(wavelengthConfig);
var photonGraph = new KCVSGraph(photonGraphConfig);

var currentWavelength = 550;
var currentRGB = "rgb(206, 224, 0)"; 
var currentFreq = 5.45;
var currentEnergy = 5.45;
var wavelengthArray = {
    "id": "wavelengthLine",
    "x":[],
    "y":[]
};
var photonArrayRight = {
    "id": "photonLineRight",
    "x":[],
    "y":[]
};
var photonArrayLeft = {
    "id": "photonLineLeft",
    "x":[],
    "y":[]
};

var RGBValues = [0,0,0];

updateWavelengthArray();
updatePhotonArray();

// wavelengthGraph.markerLines("wavelengthLine",wavelengthArray.y, 'y', true);
wavelengthGraph.addLine(wavelengthArray);
photonGraph.addLine(photonArrayRight);
photonGraph.addLine(photonArrayLeft);

// FIXME: con il rosso molto acceso esplode tutto
function updateWavelength(){
    HSLValues = rgbToHsl(RGBValues);
    console.log(HSLValues);
    frequency = 780 - 400 / 360 * HSLValues[0];
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
    var r = c[0]/255, g = c[1]/255, b = c[2]/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if(max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return new Array(h * 360, s * 100, l * 100);
}


function update(){
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
    updateColor();
    console.log("Updated RGB Color: " + currentRGB);
    updateFreq();
    console.log("Updated Energy: " + currentEnergy);
    console.log("Updated Frequency: " + currentFreq);
    updateEnergy();
    wavelengthGraph.updateLine(wavelengthArray.id, wavelengthArray.x, wavelengthArray.y);
    photonGraph.updateLine(photonArrayRight.id, photonArrayRight.x, photonArrayRight.y);
    photonGraph.updateLine(photonArrayLeft.id, photonArrayLeft.x, photonArrayLeft.y);
}


// Referenced a copepen by Peter Wise for this, who originally referenced Academo.org
// wavelength to RGB conversion ma non ci dovrebbe servire
function updateColor(){
    var red = 0;
    var green = 0;
    var blue = 0;
    var Gamma = 0.80, IntensityMax = 255, factor, red, green, blue;
    if((currentWavelength >= 380) && (currentWavelength<440)){
        red = -(currentWavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 0.9;
    }else if((currentWavelength >= 440) && (currentWavelength<490)){
        red = 0.0;
        green = (currentWavelength - 440) / (490 - 430);
        blue = 0.75;
    }else if((currentWavelength >= 490) && (currentWavelength<510)){
        red = 0.0;
        green = 0.85;
        blue = -(currentWavelength - 510) / (510 - 490);
    }else if((currentWavelength >= 510) && (currentWavelength<580)){
        red = (currentWavelength - 510) / (580 - 510);
        green = 0.85;
        blue = 0.0;
    }else if((currentWavelength >= 580) && (currentWavelength<645)){
        red = 1.0;
        green = -(currentWavelength - 645) / (645 - 573);
        blue = 0.0;
    }else if((currentWavelength >= 645) && (currentWavelength<781)){
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    }else{
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    };
    // Let the intensity fall off near the vision limits
    if((currentWavelength >= 380) && (currentWavelength<420)){
        factor = 0.15 + 0.7*(currentWavelength - 380) / (420 - 380);
    }else if((currentWavelength >= 420) && (currentWavelength<645)){
        factor = 1.0;
    }else if((currentWavelength >= 645) && (currentWavelength<781)){
        factor = 0.3 + 0.7*(780 - currentWavelength) / (780 - 645);
    }else{
        factor = 0.0;
    };
    if (red !== 0){
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0){
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0){
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }

    // currentRGB[0]=red;
    // currentRGB[1]=green;
    // currentRGB[2]=blue;

    // $('#waveView').css("background",currentRGB);
    // $('#photonView').css("background",currentRGB);
    return;
}


// Roba matematica
function updateFreq(){
    var c = 2.9979e+17;
    currentFreq = c/currentWavelength;
    currentFreq = currentFreq/1e+14;
    currentFreq = currentFreq.toPrecision(3);
    var output = "Frequency = " + currentFreq + " x 10<sup>14</sup>";
    $('#frequency').html(output);
    return;
}

// Roba matematica
function updateEnergy(){
    currentEnergy = 1240/currentWavelength;
    currentEnergy = currentEnergy.toPrecision(3);
    var output = "Energy = " + currentFreq + " (eV)";
    $('#energy').html(output);
    return;
}


// Non lo so
function updateWavelengthArray(){
    var n = 100;
    wavelengthArray.x = Array(n);
    wavelengthArray.y = Array(n);
    for (var i = 0; i < n; i++) {
        wavelengthArray.x[i] = wavelengthGraph.getXmax()*i/n;
        wavelengthArray.y[i] = Math.sin(2*Math.PI*wavelengthArray.x[i]/currentWavelength);
    }
    $('#wavelengthLine').css("stroke",currentRGB);
}

function updatePhotonArray(){
    var n = 250;
    photonArrayRight.x = Array(n);
    photonArrayRight.y = Array(n);
    photonArrayLeft.x = Array(n);
    photonArrayLeft.y = Array(n);
    for (var i = 0; i < n; i++) {
        photonArrayRight.x[i] = photonGraph.getXmax()*i/n;
        photonArrayRight.y[i] = 1*Math.exp(-photonArrayRight.x[i])*Math.sin((5500/currentWavelength)*photonArrayRight.x[i]);
    }
    for (var i = 0; i < n; i++) {
        photonArrayLeft.x[i] = photonGraph.getXmax()*i/n*-1;
        photonArrayLeft.y[i] = 1*Math.exp(photonArrayLeft.x[i])*Math.sin((5500/currentWavelength)*photonArrayLeft.x[i]);
    }
    $('#photonLineRight').css("stroke",currentRGB);
    $('#photonLineLeft').css("stroke",currentRGB);
}

function updateHandle(){
    console.log("adding strip");
    $('#wavelengthSliderHandle').html('<div id="sliderHandleContainer" class="sliderHandleContainer"></div>');
    $('#sliderHandleContainer').append('<div class="sliderHandleStrip"></div>');
}


$('#wavelengthSliderContainer').on('slide.kcvs.slider', update);

// visibleSpectrumSlider.addListener(update());
/*$(document).ready(function() {
    updateHandle();
    update();
});*/



// leggo l'immagine dal form e la disegno sul canvas
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = e.target.result;
          img.addEventListener('load', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            img.style.display = 'none';
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
}

let img = new Image();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const hoveredColor = document.getElementById('hovered-color');
const selectedColor = document.getElementById('selected-color');

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
  RGBValues = [data[0],data[1],data[2]];
  update();
  return rgba;
}

canvas.addEventListener('mousemove', event => pick_hover(event));
canvas.addEventListener('click', event => pick_select(event));