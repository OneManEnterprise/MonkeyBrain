// @require       https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

/****************************************************************************************************\
| CONSTANTS                                                                                           |
\****************************************************************************************************/
//ADDRESSES
const ADDR_BITCOIN = "3QcD5ZTyWFE6zn8A7KKwn4HLRq5k2dhbuS"
const ADDR_BITCOINCASH = "qzcpvtkka6tnvvvp88qtnmz33kmgf79r9slrtvy82s"
const ADDR_DASH = "Xbnj3vtVXUnEye8ERBaR2M7dXj8fysnVCo"
const ADDR_DOGECOIN = "D8TKc74V8jFzBFuWpxKyYdaCRRBUxmzjEz"
const ADDR_ETHEREUM = "0x2fA59Be2Ee252675937e453C5324De1F8849eDb3"
const ADDR_LITECOIN = "MSgS1PYbQD54h1d4as7VZHRpvtNnPdCUDT"
const ADDR_SOLANA = "3knrCxQPrjaDrX87uAbGmzLL2GcEGAntddeQWqAwCTuY"
const ADDR_ZCASH = "t1XmjzKxe1ndY6sruWrBu828j4XESfq22FA"
const ADDR_BINANCE = "0xAD57fc27a2cF924d4F847298bac75fF65864c9b7"
const ADDR_FEYORRA = "0xAD57fc27a2cF924d4F847298bac75fF65864c9b7"

//CRYPTO
const COIN_BCH = "bitcoincash"
const COIN_BTC = "bitcoin"
const COIN_DASH = "dash"
const COIN_DOGE = "dogecoin"
const COIN_ETH = "ethereum"
const COIN_LTC = "litecoin"
const COIN_SOL = "solana"
const COIN_ZEC = "zcash"
const COIN_BNB = "binance"
const COIN_FEY = "feyorra"

//CRYPTO COIN
const BTC = "btc"
const BCH = "bch"
const DASH = "dash"
const DOGE = "doge"
const ETH = "eth"
const LTC = "ltc"
const SOL = "sol"
const ZEC = "zec"
const BNB = "bnb"
const FEY = "fey"

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
])

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
const Q_BTN = "button"
const Q_IN = "input"
const Q_ADDR = "[name='address']"
const Q_SUB = "[type='submit']"
const Q_TXT = "[type='text']"

//QUERIES
const Q_HCAPTCHA = "iframe[data-hcaptcha-widget-id]"
const Q_BTN_SUB = Q_BTN + Q_SUB
const Q_IN_SUB = Q_IN + Q_SUB

//IDS
const Q_ID_SUB = "#submit"

//TIME
const MILLIS = 1000
const SECOND = 1 * MILLIS
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

//WAITS
const WAIT_HCAPTCHA = 5 * SECOND
const WAIT_ELEMENT = 3 * SECOND

//DEFAULTS
const HOST = window.location.host
const DATANAME = "DATA"
const MAX = Number.MAX_SAFE_INTEGER
const DAY = new Date(Date.now()).getDate()

const STORED_OBJ = GM_getValue(DATANAME)
const DATA_OBJ = {
    name: DATANAME,
    obj: {},
    day: DAY,
}

const DEFAULT_WEBSITE_OBJ = {
  name:HOST,
  claims:0,
  lastclaim:-1,
  maxclaims:-1,
  cooldown:-1,
  executiontime:0,
  //TODO getCoinByHOST()
  coin: BTC,
  script: function(){},
}

const STARTUP_TIME = performance.now()
let startupOk = false
let scriptOk = false
let updateOk = false
let nextObj = {}

//SCRIPT
async function handleWebsites(websiteScript){
  await startup()
  if(startupOk) await websiteScript()
  await endup()
}
function startup(){
  updateLocalData()
  if(!updateOk)populateWebsitesObj()

  if(!canClaim()) return
  startupOk = true
}
async function endup(){
  updateClaim()

  setData()

  nextObj = await getNextObj()

  await wait(6 * SECOND)
  //TODO ORIGIN INSTEAD OF HOST
  window.location.href = "https://" + nextObj.name
}
function updateLocalData(){
  if(!STORED_OBJ) return
  if(!isDataRecent()) return
  DATA_OBJ.obj = STORED_OBJ.obj
  updateOk = true
}
function updateClaim(){
  if(!scriptOk) return

  DATA_OBJ.obj[HOST].lastclaim = Date.now()
  DATA_OBJ.obj[HOST].claims += 1
  DATA_OBJ.obj[HOST].executiontime = performance.now() - STARTUP_TIME
}
function populateObj(objPopulator = DEFAULT_WEBSITE_OBJ, objToPopulate){
  Object.entries(objPopulator).forEach(kv =>{if(!objToPopulate[kv[0]]) objToPopulate[kv[0]] = kv[1]})
  return objToPopulate
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function isBitcoinCash(string){return string.includes("bitcoin") && string.includes("cash")}

function wait(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function randomInt(min=0, max=2){return Math.floor(Math.random() * (max - min)) + min}

function setData(dataObj = DATA_OBJ){GM_setValue(dataObj.name, dataObj)}
function getData(name = DATANAME){return GM_getValue(name)}

function isAtUrl(url){return window.location.href == url}
function urlIncludes(regex){return window.location.href.includes(regex)}

function isDataRecent(dataObj=DATA_OBJ){return dataObj.day == DAY}


async function getNextObj(){
  let nextObj = filterSortObj()
  while(!nextObj){
    console.log("WAITING HOUR")
    await wait(HOUR)
    nextObj = filterSortObj()
  }
  return nextObj
}

function filterObject(obj, callback) {return Object.fromEntries(Object.entries(obj).filter(([key, val]) => callback(val, key)))}
function filterSortObj(){
  let filteredObj = filterObject(DATA_OBJ.obj, filterClaims)
  if(Object.entries(filteredObj).length == 0) return
  let sortedObj = getFirstSorted(filteredObj, sortClaims)
  return sortedObj
}

function sortClaims(obj){return obj.cooldown - (Date.now() - obj.lastclaim)}
function filterClaims(obj){
  let notMax = obj.maxclaims > obj.claims
  let notCooldown = obj.lastclaim == -1 || Date.now() - obj.lastclaim > obj.cooldown
  return notMax && notCooldown
}

function getFirstSorted(obj, callback){
  let sorted = Object.entries(obj).sort(([key, val]) => callback(val, key))
  let firstSorted = sorted[0]
  return firstSorted[1]
}


function elapsedTime(startTimer){return Math.round((Date.now() - startTimer))}
function canClaim(){
  if(DATA_OBJ.obj[HOST].claims >= DATA_OBJ.obj[HOST].maxclaims) return false
  return isClaimTime(DATA_OBJ.obj[HOST])
}
function isClaimTime(obj){
  if(obj.lastclaim < 0) return true
  return elapsedTime(obj.lastclaim) > obj.cooldown
}


function select(value){qSelect("option[value=" + value + "]").selected = true}
function click(query){qqSelect(query).then(element => {element.click()})}
function qSelect(query){return document.querySelector(query)}
function qSelectAll(query){return document.querySelectorAll(query)}
async function qqSelect(query){
  let element
  while(!element){
      element = qSelect(query)
      await wait(WAIT_ELEMENT)
  }
  return element
}

async function waitHCaptcha(){
  let hcaptcha = await qqSelect(Q_HCAPTCHA)
  while(hcaptcha.getAttribute("data-hcaptcha-response").length < 1){
      console.log("waiting hcaptcha response " + WAIT_HCAPTCHA/MILLIS + "s")
      await wait(WAIT_HCAPTCHA)
  }
}

async function inputText(value){
  const addr = await qqSelect(Q_TYPE_TXT)
  addr.value = value
}
async function textSubmit(textValue){
  await inputText(textValue)
  await click(Q_TYPE_SUB)
}

String.prototype.nthLastIndexOf = function(searchString, n){
  if(this === null) return -1
  //if(typeof(this) != "string") return -1
  if(!n || isNaN(n) || n <= 1) return this.lastIndexOf(searchString)
  return this.lastIndexOf(searchString, this.nthLastIndexOf(searchString, --n) - 1)
}
