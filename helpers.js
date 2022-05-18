// @require       https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

/****************************************************************************************************\
| CONSTANTS                                                                                           |
\****************************************************************************************************/
//ADDRESSES
const ADDR_BITCOIN = "3QcD5ZTyWFE6zn8A7KKwn4HLRq5k2dhbuS";
const ADDR_BITCOINCASH = "qzcpvtkka6tnvvvp88qtnmz33kmgf79r9slrtvy82s";
const ADDR_DASH = "Xbnj3vtVXUnEye8ERBaR2M7dXj8fysnVCo";
const ADDR_DOGECOIN = "D8TKc74V8jFzBFuWpxKyYdaCRRBUxmzjEz";
const ADDR_ETHEREUM = "0x2fA59Be2Ee252675937e453C5324De1F8849eDb3";
const ADDR_LITECOIN = "MSgS1PYbQD54h1d4as7VZHRpvtNnPdCUDT";
const ADDR_SOLANA = "3knrCxQPrjaDrX87uAbGmzLL2GcEGAntddeQWqAwCTuY";
const ADDR_ZCASH = "t1XmjzKxe1ndY6sruWrBu828j4XESfq22FA";
const ADDR_BINANCE = "0xAD57fc27a2cF924d4F847298bac75fF65864c9b7";
const ADDR_FEYORRA = "0xAD57fc27a2cF924d4F847298bac75fF65864c9b7";

//CRYPTO
const COIN_BCH = "bitcoincash";
const COIN_BTC = "bitcoin";
const COIN_DASH = "dash";
const COIN_DOGE = "dogecoin";
const COIN_ETH = "ethereum";
const COIN_LTC = "litecoin";
const COIN_SOL = "solana";
const COIN_ZEC = "zcash";
const COIN_BNB = "binance";
const COIN_FEY = "feyorra";

//CRYPTO COIN
const BTC = "btc";
const BCH = "bch";
const DASH = "dash";
const DOGE = "doge";
const ETH = "eth";
const LTC = "ltc";
const SOL = "sol";
const ZEC = "zec";
const BNB = "bnb";
const FEY = "fey";

let coinMap = new Map([
  [COIN_BTC, ADDR_BITCOIN],
  [COIN_BCH, ADDR_BITCOINCASH],
  [COIN_DASH, ADDR_DASH],
  [COIN_DOGE, ADDR_DOGECOIN],
  [COIN_ETH, ADDR_ETHEREUM],
  [COIN_LTC, ADDR_LITECOIN],
  [COIN_SOL, ADDR_SOLANA],
  [COIN_ZEC, ADDR_ZCASH],
  [COIN_BNB, ADDR_BINANCE],
  [COIN_FEY, ADDR_FEYORRA],

  [BTC, ADDR_BITCOIN],
  [BCH, ADDR_BITCOINCASH],
  [DASH, ADDR_DASH],
  [DOGE, ADDR_DOGECOIN],
  [ETH, ADDR_ETHEREUM],
  [LTC, ADDR_LITECOIN],
  [SOL, ADDR_SOLANA],
  [ZEC, ADDR_ZCASH],
  [BNB, ADDR_BINANCE],
  [FEY, ADDR_FEYORRA],
]);

//FAUCETPAY WITHDRAWAL
const FEES = {
  ZEC: 0.00000500, // 0.0005 cents
  DASH:0.00005000, // 0.002 cents
  LTC: 0.00005000, // 0.003 cents
  SOL: 0.00050000, // 0.03 cents
  BCH: 0.00010000, // 0.02 cents
  DOGE:1.00000000, // 0.09 cents
  BNB: 0.00064000, // 0.19 cents TRY
  BTC: 0.00001000, // 0.29 cents
  FEY: 1000.00000, // 2.525 eur 
  ETH: 0.01000000, // 19.81 eur
  TRX: 0.00000000, // unknown
  USDT:0.01000000, // unknown
  DGB: 0.01000000, // unknown
}

//SELECTORS
const Q_BTN = "button";
const Q_IN = "input";
const Q_ADDR = "[name='address']";
const Q_SUB = "[type='submit']";
const Q_TXT = "[type='text']";

//QUERIES
const Q_HCAPTCHA = "iframe[data-hcaptcha-widget-id]";
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

//DEFAULTS
const HOST = window.location.host;
let persistentObj = {
    name: "NAME",
    obj: {},
    cooldown: 1,
    updated: false,
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
function setPersistentObj(obj){
  persistentObj.name = HOST;
  persistentObj.cooldown = HOUR;
  persistentObj.obj = obj;
}

function wait(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function isBitcoinCash(string){return string.includes("bitcoin") && string.includes("cash")}

function randomInt(min=0, max=2){return Math.floor(Math.random() * (max - min)) + min}

function sortSmallerFirst(obj){return Object.keys(obj).sort(function(a,b){ return obj[a]-obj[b]})}
function sortBiggerFirst(obj){return Object.keys(obj).sort(function(a,b){ return obj[b]-obj[a]})}

function isAtUrl(url){ return window.location.href == url}
function urlIncludes(regex){ return window.location.href.includes(regex)}
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
  //TODO this will blow up eventually -> window.location.href may be != than the stored url in obj 
  dataObj.obj[window.location.href] = Date.now();
  GM_setValue(dataObj.name, dataObj);
}

function select(value){qSelect("option[value=" + value + "]").selected = true}
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
      console.log("waiting hcaptcha response " + WAIT_HCAPTCHA/MILLIS + "s");
      await wait(WAIT_HCAPTCHA);
  }
}

async function inputText(value){
  const addr = await qqSelect(Q_TYPE_TXT);
  addr.value = value;
}
async function textSubmit(textValue){
  await inputText(textValue);
  await click(Q_TYPE_SUB);
}

function scrollIntoMidView(element) {
  const elementRect = element.getBoundingClientRect();
  const scrollTopOfElement = elementRect.top + elementRect.height / 2;
  const scrollY = scrollTopOfElement - (window.innerHeight / 2);
  window.scrollTo(0, scrollY);
}

function convertMS(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
};

String.prototype.nthLastIndexOf = function(searchString, n){
  if(this === null) return -1;
  //if(typeof(this) != "string") return -1;
  if(!n || isNaN(n) || n <= 1) return this.lastIndexOf(searchString);
  return this.lastIndexOf(searchString, this.nthLastIndexOf(searchString, --n) - 1);
};

//const addCSS = css => {document.head.appendChild(document.createElement("style")).innerHTML=css};
//const css = "outline:green solid 10px;";
//const notcss = "outline:white;";
