import uuid from 'uuid/v4';

/* global chrome */
export const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['items'], function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                let res =
                    result.items && result.items.length ? result.items : [{ itemName: '', number: 0, id: uuid() }];

                resolve(res);
            }
        });
    });
};

export const storageSync = items =>
    chrome.storage.sync.set({ items }, function () {
        console.log('storage synced', items);
    });

// Immediate sync function that returns a promise for reliable completion
export const storageSyncImmediate = items => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ items }, function () {
            if (chrome.runtime.lastError) {
                console.error('Immediate storage sync failed:', chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError);
            } else {
                console.log('immediate storage synced', items);
                resolve();
            }
        });
    });
};
