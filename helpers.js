//@require https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

/****************************************************************************************************\
| CONSTANTS                                                                                           |
\****************************************************************************************************/
//ADDRESSES
const BITCOIN="3QcD5ZTyWFE6zn8A7KKwn4HLRq5k2dhbuS";
const BITCOIN_CASH ="qzcpvtkka6tnvvvp88qtnmz33kmgf79r9slrtvy82s";
const DASH ="Xbnj3vtVXUnEye8ERBaR2M7dXj8fysnVCo";
const DOGECOIN ="D8TKc74V8jFzBFuWpxKyYdaCRRBUxmzjEz";
const ETHEREUM ="0x2fA59Be2Ee252675937e453C5324De1F8849eDb3";
const LITECOIN ="MSgS1PYbQD54h1d4as7VZHRpvtNnPdCUDT";
const SOLANA ="3knrCxQPrjaDrX87uAbGmzLL2GcEGAntddeQWqAwCTuY";
const ZCASH ="t1XmjzKxe1ndY6sruWrBu828j4XESfq22FA";

//QUERIES
const Q_HCAPTCHA = "iframe[data-hcaptcha-widget-id]";
const BTN = "button";
const IN = "input";
const ADDR = "[name='address']";ADDRESSES
const SUB = "[type='submit']";
const ID_SUB = "#submit";

const Q_BTN_SUB = BTN + SUB;
const Q_BTN_ID_SUB = BTN + ID_SUB;
//////////////////////////////////////////////////////////////////////////////////////////////////////

//TODO var vs let
var waitMillis= 2*1000;
let waitIterations = 10;

function now(){console.log("performance.now(): " + performance.now())}
function wait(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function qSelect(query){return document.querySelector(query)}
function qSelectAll(query){return document.querySelectorAll(query)}
async function qqSelect(query){
    console.debug("query: " + query);
  
    for(let i = 0; i < waitIterations; i++){
        let element = qSelect(query);
        if(element) {
            console.debug("element: " + element);
            return element;
        }
    }
}

async function click(query){
    let element = await qqSelect(query);
    element.click();
}

async function waitHCaptcha(){
    let hcaptcha = qqSelect(Q_HCAPTCHA);
    while(hcaptcha.getAttribute("data-hcaptcha-response").length < 1){
        await wait(waitMillis);
        console.log("waiting hcaptcha response " + waitMillis/1000 + "s");
    }
}
