var visibleSliderConfig = {
    containerID: "wavelengthSliderContainer", // Slider will be inserted into this element.
    inputID: "wavelengthSlider", // ID for the new slider (input box, specifically).
    inputSize: "5", // Number of characters to display in input box.
    title: "Visible Spectrum", //Displayed Label
    min: 380, // Min value for the slider.
    max: 780, // Max value for the slider.
    constraintMin: null, // Used to apply min constraint if > min.
    constraintMax: null, // Used to apply max constraint if < max.
    step: 10, // Slider step size.  Dummy default.
    decimal: 0, // Max number of decimal places to display in the input box.
    default: 550, // Starting value.  Dummy default.
    showTitle: true, // Show the title?
    showFill: false, // Fill the left side of the slider?
    showScale: true, // Show the min and max values?
    fillFromDefault: false, // Fill from default value instead of left edge?
    showModified: false, // Show when the slider is not at its default
};

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

var visibleSpectrumSlider = new KCVSSlider(visibleSliderConfig);
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

updateWavelengthArray();
updatePhotonArray();

// wavelengthGraph.markerLines("wavelengthLine",wavelengthArray.y, 'y', true);
wavelengthGraph.addLine(wavelengthArray);
photonGraph.addLine(photonArrayRight);
photonGraph.addLine(photonArrayLeft);



function update(){
    // var inputValue = visibleSpectrumSlider.value;
    console.log("Updating Wavelength");
    console.log("Current wavelength: " + currentWavelength);
    console.log("Current RGB Color: " + currentRGB);
    console.log("Current Frequency: " + currentFreq);
    console.log("Current Energy: " + currentEnergy);
    updateWavelength();
    console.log("Updated wavelength: " + currentWavelength);
    updateColor();
    console.log("Updated RGB Color: " + currentRGB);
    updateFreq();
    console.log("Updated Frequency: " + currentFreq);
    updateEnergy();
    console.log("Updated Energy: " + currentEnergy);
    updateWavelengthArray();
    updatePhotonArray();
    wavelengthGraph.updateLine(wavelengthArray.id, wavelengthArray.x, wavelengthArray.y);
    photonGraph.updateLine(photonArrayRight.id, photonArrayRight.x, photonArrayRight.y);
    photonGraph.updateLine(photonArrayLeft.id, photonArrayLeft.x, photonArrayLeft.y);
}

function updateWavelength(){
    currentWavelength = visibleSpectrumSlider.currentValue;
    // currentWavelength = 450;
}

// Referenced a copepen by Peter Wise for this, who originally referenced Academo.org
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
    currentRGB = "rgb(" + red + "," + green + "," + blue + ")"; 


    // $('#waveView').css("background",currentRGB);
    // $('#photonView').css("background",currentRGB);
    return;
}

function updateFreq(){
    var c = 2.9979e+17;
    currentFreq = c/currentWavelength;
    currentFreq = currentFreq/1e+14;
    currentFreq = currentFreq.toPrecision(3);
    var output = "Frequency = " + currentFreq + " x 10<sup>14</sup>";
    $('#frequency').html(output);
    return;
}

function updateEnergy(){
    currentEnergy = 1240/currentWavelength;
    currentEnergy = currentEnergy.toPrecision(3);
    var output = "Energy = " + currentFreq + " (eV)";
    $('#energy').html(output);
    return;
}

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
$(document).ready(function() {
    updateHandle();
    update();
});
