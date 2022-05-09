//@require       https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

/****************************************************************************************************\
| CONSTANTS                                                                                           |
\****************************************************************************************************/
//ADDRESSES
const ADDR_BITCOIN="3QcD5ZTyWFE6zn8A7KKwn4HLRq5k2dhbuS";
const ADDR_BITCOIN_CASH ="qzcpvtkka6tnvvvp88qtnmz33kmgf79r9slrtvy82s";
const ADDR_DASH ="Xbnj3vtVXUnEye8ERBaR2M7dXj8fysnVCo";
const ADDR_DOGECOIN ="D8TKc74V8jFzBFuWpxKyYdaCRRBUxmzjEz";
const ADDR_ETHEREUM ="0x2fA59Be2Ee252675937e453C5324De1F8849eDb3";
const ADDR_LITECOIN ="MSgS1PYbQD54h1d4as7VZHRpvtNnPdCUDT";
const ADDR_SOLANA ="3knrCxQPrjaDrX87uAbGmzLL2GcEGAntddeQWqAwCTuY";
const ADDR_ZCASH ="t1XmjzKxe1ndY6sruWrBu828j4XESfq22FA";

//QUERIES
const Q_HCAPTCHA = "iframe[data-hcaptcha-widget-id]";
const Q_BTN = "button";
const Q_IN = "input";
const Q_ADDR = "[name='address']";
const Q_SUB = "[type='submit']";

const Q_BTN_SUB = Q_BTN + Q_SUB;
//const Q_BTN_ID_SUB = Q_BTN + Q_ID_SUB;
const Q_IN_SUB = Q_IN + Q_SUB;

//IDS
const Q_ID_SUB = "#submit";

//TIME
const MILLIS = 1000;
const SECOND = 1 * MILLIS;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const WAIT_HCAPTCHA = 5 * SECOND;
const WAIT_ELEMENT = 3 * SECOND;
//////////////////////////////////////////////////////////////////////////////////////////////////////
function wait(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function isAtUrl(url){ return window.location.href == url}
function containsUrl(url){ return window.location.href.includes(url)}

function click(query){qqSelect(query).then(element => { element.click()})}
function qSelect(query){return document.querySelector(query)}
function qSelectAll(query){return document.querySelectorAll(query)}
async function qqSelect(query){
    console.debug("query: " + query);

    let element;
    while(!element){
        element = qSelect(query);
        await wait(WAIT_ELEMENT);
    }
    console.debug("element: " + element);
    return Promise.resolve(element);
}

async function waitHCaptcha(){
    let hcaptcha = await qqSelect(Q_HCAPTCHA);
    while(hcaptcha.getAttribute("data-hcaptcha-response").length < 1){
        await wait(WAIT_HCAPTCHA);
        console.log("waiting hcaptcha response " + WAIT_HCAPTCHA/MILLIS + "s");
    }
}

//const addCSS = css => {document.head.appendChild(document.createElement("style")).innerHTML=css};
//const css = "outline:green solid 10px;";
//const notcss = "outline:white;";
