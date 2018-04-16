'use strict';

const applicationServerPublicKey = 'BPib8iMxeYKkkT-wlMh2QbrwjhtEqmMh-Y2ddF_YBLhJXJaErgOh0XVodCK55pRTSdfIQZp8SAfG2igOtHJHl2Y';
let isSubscribed = false;
let swRegistration = null;

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('pwabuilder-sw.js')
        .then(function (swReg) {
            navigator.serviceWorker.ready.then(function (swReg) {
                const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
                swReg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                })
                console.log('Service Worker is registered', swReg)
                console.log("Subscribed")
            })
              
        })
        .catch(function (error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}