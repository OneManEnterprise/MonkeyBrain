//@require https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

/****************************************************************************************************\
| ADDRESSES                                                                                           |
\****************************************************************************************************/
const BITCOIN="3QcD5ZTyWFE6zn8A7KKwn4HLRq5k2dhbuS";
const BITCOIN_CASH ="qzcpvtkka6tnvvvp88qtnmz33kmgf79r9slrtvy82s";
const DASH ="Xbnj3vtVXUnEye8ERBaR2M7dXj8fysnVCo";
const DOGECOIN ="D8TKc74V8jFzBFuWpxKyYdaCRRBUxmzjEz";
const ETHEREUM ="0x2fA59Be2Ee252675937e453C5324De1F8849eDb3";
const LITECOIN ="MSgS1PYbQD54h1d4as7VZHRpvtNnPdCUDT";
const SOLANA ="3knrCxQPrjaDrX87uAbGmzLL2GcEGAntddeQWqAwCTuY";
const ZCASH ="t1XmjzKxe1ndY6sruWrBu828j4XESfq22FA";
//////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO var vs let
var waitMillis= 2*1000;
let waitIterations = 10;

function now(){console.log("performance.now(): " + performance.now())}
function wait(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function qSelect(query){return document.querySelector(query)}
function qSelectAll(query){return document.querySelectorAll(query)}
function dSelect(query){
    console.debug("query: " + query); 
    console.debug("document.querySelector(query): " + document.querySelector(query));
    return document.querySelector(query);
}
function dSelectAll(query){
  console.debug("query: " + query); 
  document.querySelectorAll(query).forEach(el => console.debug(el));
  return document.querySelectorAll(query);
}
async function qqSelect(query){
    let element = qSelect(query);
    let iteration = 0;
    while(!element){
        if(iteration == waitIterations) return;
        
        element = qSelect(query);
        await wait(waitMillis);
        iteration++;
}
