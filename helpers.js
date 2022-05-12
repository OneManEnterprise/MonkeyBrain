// @require       https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

/****************************************************************************************************\
| CONSTANTS                                                                                           |
\****************************************************************************************************/
//ADDRESSES
const ADDR_BITCOIN="3QcD5ZTyWFE6zn8A7KKwn4HLRq5k2dhbuS";
const ADDR_BITCOINCASH ="qzcpvtkka6tnvvvp88qtnmz33kmgf79r9slrtvy82s";
const ADDR_DASH ="Xbnj3vtVXUnEye8ERBaR2M7dXj8fysnVCo";
const ADDR_DOGECOIN ="D8TKc74V8jFzBFuWpxKyYdaCRRBUxmzjEz";
const ADDR_ETHEREUM ="0x2fA59Be2Ee252675937e453C5324De1F8849eDb3";
const ADDR_LITECOIN ="MSgS1PYbQD54h1d4as7VZHRpvtNnPdCUDT";
const ADDR_SOLANA ="3knrCxQPrjaDrX87uAbGmzLL2GcEGAntddeQWqAwCTuY";
const ADDR_ZCASH ="t1XmjzKxe1ndY6sruWrBu828j4XESfq22FA";

//CRYPTO
const COIN_BCH = "bitcoincash";
const COIN_BTC = "bitcoin";
const COIN_DASH = "dash";
const COIN_DOGE = "dogecoin";
const COIN_ETH = "ethereum";
const COIN_LTC = "litecoin";
const COIN_SOL = "solana";
const COIN_ZEC = "zcash";

//CRYPTO COIN
const BTC = "btc";
const BCH = "bch";
const DASH = "dash";
const DOGE = "doge";
const ETH = "eth";
const LTC = "ltc";
const SOL = "sol";
const ZEC = "zec";

let coinMap = new Map([
  [COIN_BTC, ADDR_BITCOIN],
  [COIN_BCH, ADDR_BITCOINCASH],
  [COIN_DASH, ADDR_DASH],
  [COIN_DOGE, ADDR_DOGECOIN],
  [COIN_ETH, ADDR_ETHEREUM],
  [COIN_LTC, ADDR_LITECOIN],
  [COIN_SOL, ADDR_SOLANA],
  [COIN_ZEC, ADDR_ZCASH],
  
  [BTC, ADDR_BITCOIN],
  [BCH, ADDR_BITCOINCASH],
  [DASH, ADDR_DASH],
  [DOGE, ADDR_DOGECOIN],
  [ETH, ADDR_ETHEREUM],
  [LTC, ADDR_LITECOIN],
  [SOL, ADDR_SOLANA],
  [ZEC, ADDR_ZCASH]
]);

function isBitcoinCash(string){return string.includes("bitcoin") && string.includes("cash")}

//SELECTORS
const Q_HCAPTCHA = "iframe[data-hcaptcha-widget-id]";
const Q_BTN = "button";
const Q_IN = "input";
const Q_ADDR = "[name='address']";
const Q_SUB = "[type='submit']";

//QUERIES
const Q_BTN_SUB = Q_BTN + Q_SUB;
const Q_IN_SUB = Q_IN + Q_SUB;

//IDS
const Q_ID_SUB = "#submit";

//TIME
const MILLIS = 1000;
const SECOND = 1 * MILLIS;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

//WAITS
const WAIT_HCAPTCHA = 5 * SECOND;
const WAIT_ELEMENT = 3 * SECOND;
//////////////////////////////////////////////////////////////////////////////////////////////////////
function wait(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function isAtUrl(url){ return window.location.href == url}
function isIncludedInUrl(url){ return window.location.href.includes(url)}
function gotoUrl(url){window.location.href = url}
function getNextUrl(dataObj){return sortSmallerFirst(dataObj.obj).pop()}

//timer is -1 or stored Date.now()
function elapsedTime(startTimer){return Math.round((Date.now() - startTimer))}
function isItTime(startTimer, interval){return elapsedTime(startTimer) > interval}
function isClaimTime(startTimer, cooldown){return startTimer < 0 || elapsedTime(startTimer) > cooldown}
function isClaimable(persistentObj){
  let obj = persistentObj.obj;
  let cooldown = persistentObj.cooldown;
  let currentUrl = window.location.href;
  let currentUrlTimer = obj[currentUrl];
  let isClaimable =  isClaimTime(currentUrlTimer, cooldown);

  return isClaimable;
}

function getData(oldObj){
  let storedObj = GM_getValue(oldObj.name);
  if(storedObj) return storedObj;
  return oldObj;
}
function setData(dataObj){
  dataObj.obj[ window.location.href] = Date.now();
  GM_setValue(dataObj.name, dataObj);
}


function sortSmallerFirst(obj){return Object.keys(obj).sort(function(a,b){ return obj[a]-obj[b]})}
function sortBiggerFirst(obj){return Object.keys(obj).sort(function(a,b){ return obj[b]-obj[a]})}

function click(query){qqSelect(query).then(element => {element.click()})}
function qSelect(query){return document.querySelector(query)}
function qSelectAll(query){return document.querySelectorAll(query)}
async function qqSelect(query){
  let element;
  while(!element){
      element = qSelect(query);
      await wait(WAIT_ELEMENT);
  }
  console.info("element: " + element);
  return element;
}

async function waitHCaptcha(){
  let hcaptcha = await qqSelect(Q_HCAPTCHA);
  while(hcaptcha.getAttribute("data-hcaptcha-response").length < 1){
      await wait(WAIT_HCAPTCHA);
      console.log("waiting hcaptcha response " + WAIT_HCAPTCHA/MILLIS + "s");
  }
}

function scrollIntoMidView(element) {
  const elementRect = element.getBoundingClientRect();
  const scrollTopOfElement = elementRect.top + elementRect.height / 2;
  const scrollY = scrollTopOfElement - (window.innerHeight / 2);
  window.scrollTo(0, scrollY);
}

String.prototype.nthLastIndexOf = function(searchString, n){
  if(this === null) return -1;
  //if(typeof(this) != "string") return -1;
  if(!n || isNaN(n) || n <= 1) return this.lastIndexOf(searchString);
  return this.lastIndexOf(searchString, this.nthLastIndexOf(searchString, --n) - 1);
};

//const addCSS = css => {document.head.appendChild(document.createElement("style")).innerHTML=css};
//const css = "outline:green solid 10px;";
//const notcss = "outline:white;";
