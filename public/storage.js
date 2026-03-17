function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const normalizeItem = item => {
    const safeItem = item || {};

    return {
        itemName: typeof safeItem.itemName === 'string' ? safeItem.itemName : '',
        number: typeof safeItem.number === 'number' && Number.isFinite(safeItem.number) ? safeItem.number : 0,
        id: safeItem.id || generateUUID(),
    };
};

/* global chrome */
export const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['items'], function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                let res = result.items && result.items.length ? result.items.map(normalizeItem) : [normalizeItem({})];

                resolve(res);
            }
        });
    });
};

export const storageSync = items =>
    chrome.storage.sync.set({ items }, function () {
        console.log('storage synced', items);
    });
