const { autoDetect, colors } = require('launchpad.js');
const { colorFromHex, defaultColors } = colors;

function buttonHandler(buttonData, buttonState, lp) {
    // Do something with buttonData
    // console.log('Button pressed!', buttonData);
    const controlData=controlMap(buttonData.nr);
    Object.assign(buttonData, controlData,{state:buttonState})

    controlColor(buttonData, 'auto', lp)
    //console.log('buttonData', buttonData);
    // switch (buttonState) {
    //     case 'down': {
    //      //   console.log('Button pressed!');
    //         controlColor(buttonData, 'on2', lp)
    //         break;
    //     }
    //     case 'up': {
    //       //  console.log('Button released!');
    //         controlColor(buttonData, 'off2', lp)
    //         break;
    //     }
    // }


   




    return buttonData;
}

function controlMap(controlNumber) {
    // Map the control number to a name and type

    lookupButtons={
        104: 'up',
        105: 'down',
        106: 'left',
        107: 'right',
        108: 'session',
        109: 'user1',
        110: 'user2',
        111: 'mixer',
        89: 'volume',
        79: 'pan',
        69: 'sendA',
        59: 'sendB',
        49: 'stop',
        39: 'mute',
        29: 'solo',
        19: 'recordArm',


    }
    lookupPads={
        11: 'gridBottomLeft',
        18: 'gridBottomRight',
        81: 'gridTopLeft',
        88: 'gridTopRight',
    }


    // if the control number is in the lookupButtons object, 
    // return the name and type  
    // if the control number is in the lookupPads object,
    // return the name and type if not, make the name 
    // from xy and return the name and type

    return (controlNumber in lookupButtons)? {
        name: lookupButtons[controlNumber],
        type: 'button'
    }:{
        name: (controlNumber in lookupPads)? lookupPads[controlNumber]:`${controlNumber%10}x${Math.floor(controlNumber/10)}`,
        type: 'pad'
    }
}

function controlColor(control, command, lp) {
    console.clear();
    console.log('controlColor', control, command);
    const { name, type, state } = control;
    console.log('controlColor', name, type, state);
    // Set the color of the control
    // control is the control object from controlMap
    // command is the command to send to the control
    // lp is the launchpad object

    

    switch (control.type) {
        case 'button': {
            command = (command === 'auto') ? (state === 'down') ? 'on2' : 'off' : command;
            switch (command) {
                case 'on': {
                    console.log('button on');
                    lp.setButtonColor(control, colorFromHex('ffffff'));
                    break;
                }
                case 'on2': {
                    console.log('button on2');
                    // lp.setButtonColor(control, colorFromHex('ffffff'));
                    // on2 will fade the button from 00 to ff over 2 seconds
                    // this is a work in progress
                    let hex=0;
                    let interval=setInterval(() => {
                        let myHex = hex.toString(16).padStart(2, '0');
                        // let colorHex = `${myHex}${myHex}${myHex}`
                        let colorHex = `${myHex}0000`
                        lp.setButtonColor(control, colorFromHex(colorHex));
                        
                        hex++;
                        if (hex===256) {
                            clearInterval(interval); 
                            console.log('interval cleared')
                            lp.setButtonColor(control, colorFromHex('000000'));
                        }
                    }, 20);
                    
                    break;
                }
                case 'off': {
                    console.log('button off');
                    lp.setButtonColor(control, colorFromHex('000000'));
                    break;
                }
                case 'off2': {
                    console.log('button off2');
                    setTimeout(() => {
                        console.log('button off2 - at last...');
                        lp.setButtonColor(control, colorFromHex('000000'));
                    }, 4000);
                    break;
                }
                case 'fadeOut': {
                    console.log('button fadeOut');
                    // lp.setButtonColor(control, colorFromHex('ffffff'));
                    // on2 will fade the button from 00 to ff over 2 seconds
                    // this is a work in progress
                    let hex=256;
                    let interval=setInterval(() => {
                        let myHex = hex.toString(16).padStart(2, '0');
                        // let colorHex = `${myHex}${myHex}${myHex}`
                        let colorHex = `${myHex}0000`
                        lp.setButtonColor(control, colorFromHex(colorHex));
                        
                        hex--;
                        if (hex===0) {
                            clearInterval(interval); 
                            console.log('interval cleared')
                            lp.setButtonColor(control, colorFromHex('000000'));
                        }
                    }, 20);
                    
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case 'pad': {
            command = (command === 'auto') ? (state === 'down') ? 'on' : 'fadeOut' : command;
            switch (command) {
                case 'on': {
                    console.log('button on');
                    lp.setButtonColor(control, colorFromHex('ffffff'));
                    break;
                }
                case 'on2': {
                    console.log('button on2');
                    // lp.setButtonColor(control, colorFromHex('ffffff'));
                    // on2 will fade the button from 00 to ff over 2 seconds
                    // this is a work in progress
                    let hex=0;
                    let interval=setInterval(() => {
                        let myHex = hex.toString(16).padStart(2, '0');
                         let colorHex = `${myHex}${myHex}${myHex}`
                        //let colorHex = `${myHex}0000`
                        lp.setButtonColor(control, colorFromHex(colorHex));
                        
                        hex++;
                        if (hex===256) {clearInterval(interval); console.log('interval cleared')}
                    }, 20);

                    break;
                }
                case 'off': {
                    console.log('button off');
                    lp.setButtonColor(control, colorFromHex('000000'));
                    break;
                }
                case 'off2': {
                    console.log('button off2');
                    setTimeout(() => {
                        console.log('button off2 - at last...');
                        lp.setButtonColor(control, colorFromHex('000000'));
                    }, 4000);
                    break;
                }
                case 'fadeOut': {
                    console.log('button fadeOut');
                    // lp.setButtonColor(control, colorFromHex('ffffff'));
                    // on2 will fade the button from 00 to ff over 2 seconds
                    // this is a work in progress
                    let hex=256;
                    let interval=setInterval(() => {
                        let myHex = hex.toString(16).padStart(2, '0');
                        // let colorHex = `${myHex}${myHex}${myHex}`
                        let colorHex = `${myHex}0000`
                        lp.setButtonColor(control, colorFromHex(colorHex));
                        
                        hex--;
                        if (hex===0) {
                            clearInterval(interval); 
                            console.log('interval cleared')
                            lp.setButtonColor(control, colorFromHex('000000'));
                        }
                    }, 20);
                    
                    break;
                }
                default: {
                    console.log('pad default');
                    break;
                }
            }
            break;
        }
        default: {
            break;
        }
    }
}

exports.buttonHandler=buttonHandler
exports.controlMap=controlMap
exports.controlColor=controlColor