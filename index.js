const { autoDetect, colors } = require('launchpad.js');
const { colorFromHex, defaultColors } = colors;
const  {buttonHandler} = require('./buttonHandler.js')
const lp = autoDetect();


// Alternatively:
//
//    await waitForReady(lp);

console.log('colors', colors);
console.log('defaultColors', defaultColors);

lp.once('ready', (deviceName) => {
  console.log(`${deviceName} is ready!!`);

  lp.on('buttonDown', (rawButton) => {
    const button = buttonHandler(rawButton,'down', lp);
    
    // Generate a random color on each button press
  //   const randHex = Math.floor(Math.random() * 16777215).toString(16);

  //   // The Launchpad accepts an RGB-triple between 0 and 1. This converts the
  //   // hex code to the appropriate number array.
  //   const color = colorFromHex(randHex);

  //  // console.log(`Button pressed ${button.nr} (x: ${button.xy[0]}, y: ${button.xy[1]}`);

  //   lp.setButtonColor(button, color);
  });

  lp.on('buttonUp', (rawButton) => {
    const button = buttonHandler(rawButton, 'up', lp);
    // wait 2 seconds and turn the color off
    // setTimeout(() => {
    //   lp.setButtonColor(button, defaultColors.off);
    // }, 2000);
        
  });
});