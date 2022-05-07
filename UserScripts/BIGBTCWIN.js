// ==UserScript==
// @name         BigBTC
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       You
// @match        https://bigbtc.win/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
//@require https://raw.githubusercontent.com/OneManEnterprise/MonkeyBrain/main/helpers.js

// ==/UserScript==

//Block All Pop ups
//unsafeWindow.open = function(){};
(function() {
    'use strict';

    // Your code here...
    const URL_BIG_LOGIN = 'https://bigbtc.win/'; 
    const URL_BIG_FAUCET = 'https://bigbtc.win/faucet';   
  
    const Q_SUCCESS = ".alert-success";  

    bigbtc();
    async function bigbtc(){
        await login();
        await faucet();
    }

    async function login(){
        if(!isAtUrl(URL_BIG_LOGIN)) return;

        //TODO Promise-Then
        //let loginAddr = await qqSelect(Q_ADDR);
        //loginAddr.value = ADDR_BITCOIN;
        await qqSelect(Q_ADDR).value = ADDR_BITCOIN;
        await click(Q_SUB);
    }

    async function faucet(){
        if(!isAtUrl(URL_BIG_FAUCET)) return;
        await waitHCaptcha();
        await claim();
    }

    async function claim(){
        await click(Q_SUB);
        await qqSelect(Q_SUCCESS);
        await wait(5*MINUTES);
        location.reload();
    }


})();
