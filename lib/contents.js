// injected content for the js goes in here

var contentsData = {
  // Set the width at which the menu should switch from horizontal to vertical
  menuStyleSwitch: 425,

  // Set this to your homefolder in order to allow for subfolder corrections on the injected menubar
  homeFolderName: 'ElectromagneticSpectrum',

  //set the default folder depth of the link a positive number is needed
  folderDepth: 0,

  // allows for path corrections to be made to a different external folder
  // appletPath: null,

  // To use the applet path correction the following 3 lines of code will need to be added to the page specific js
  // You will also need to use appletPath + "link" instead of folderPath + "link" to make use of this additional correction
  // appletPath = folderPath;
  // if (contentsData.hasOwnProperty("appletPath")) {
  // appletPath = folderPath + contentsData.appletPath;

  //menubar injection content
  //all strings should be surrounded by double qoutes
  //unused variables should be left as null without qoutes
  //links should be entered like this: "../index.html" or "index.html"depending on where they point
  //code should be added like this 'onclick="createWindow(\'about\')"' where the entire code snippet is wrapped in single qoutes(''), the function is wrapped in double qoute(""), and any passed in strings are wrapped in escaped single qoutes (\'\')

  menuBarContents: [
    { name: 'Instructions', link: null, code: "onclick=\"createWindow('instructions', 'normal')\"", submenu: null },
    { name: 'About', link: null, code: "onclick=\"createWindow('about', 'normal')\"", submenu: null },
  ],

  //contains text to be injected with javascript
  injection: [
    {
      name: 'about',
      text:
        '<h3> Applet Name: Electromagnetic Spectrum </h3>' +
        '<p> Version/Date: 3.0.0, July 10th, 2018</p>' +
        '<p>Authors: Dr. Brian Martin Martin, Dr. Peter Mahaffy, Ashley Ritter, Joseph Zondervan, Shawn Ritter</p>' +
        '<p>Contact: Visit <a href="http://www.kcvs.ca/" target="_new">KCVS.ca</a> for contact information.</p>' +
        '<div class="logoContainer"><a href="http://www.kcvs.ca/" target="_blank"><img src="https://files.lib.kcvs.ca/KCVS_logo.png" alt="KCVS.ca" class="aboutLogo" style="padding-bottom:3%;"/></a>',
    },
    {
      name: 'instructions',
      text:
        '<h4>Instructions</h4>' +
        '<p>Wavelength values can be altered by using the visible spectrum slider. As you change the wavelength of visible electromagnetic radiation, observe the response in the frequency and energy of the light.</p>',
    },
    {
      name: 'terms',
      text:
        '<h1> Terms Of Use </h1>' +
        '<p>KCVS applets may be linked to and used freely by educators and the general public. If you do find them useful we would certainly love to hear from you and how you have deployed them in teaching.</p>' +
        '<p>This work is licensed under a <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US">Creative Commons Attribution-NonCommerical-ShareAlike 3.0 Unported License.</a></p>' +
        '<p>For commercial use please email us at <a href="mailto:kcvs@kingsu.ca">kcvs@kingsu.ca</a> for details.</p>' +
        '<div class="logoContainer"><a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US" target="_blank" alt="Creative Commons Icon"><img src="https://files.lib.kcvs.ca/images/creativeCommons.svg" onerror="this.src=\'https://files.lib.kcvs.ca/images/creativeCommons.png\'alt="Creative Commons Icon" class="aboutLogo" style="padding-bottom:3%;"/></a>',
    },
    {
      name: 'acknowledgement',
      text:
        '<h1> Land Acknowledgement </h1>' +
        '<p>The King’s Centre for Visualization in Science respectfully acknowledges that we are located on Treaty 6 territory, traditional lands of First Nations and Metis people. In our work to help learners see and understand science, we seek reconciliation both with the diverse indigenous people who made and make their homes here and with the earth that supports and nourishes life.</p>',
    },
  ],
};
