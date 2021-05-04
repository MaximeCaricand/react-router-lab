export const DEFAULT_URl = 'ws://random.pigne.org:9001';

export function getlinkFromName(sensorName) {
    return sensorName.replace(/ /g, '_');
}

export function setUrlCookie(newUrl) {
    document.cookie = 'mqttUrl=' + newUrl;
}

export function getUrlCookie() {
    const urlCookie = document.cookie.split(';').find(cookie => cookie.trimLeft().startsWith('mqttUrl='));
    if (urlCookie) {
        return urlCookie.split('=').pop();
    }
    return '';
}