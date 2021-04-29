export const DEFAULT_URl = 'ws://random.pigne.org:9001';

export function getlinkFromName(sensorName) {
    return sensorName.replaceAll(' ', '_');
}

export function setUrlCookie(newUrl) {
    document.cookie = 'mqttUrl=' + newUrl;
}

export function getUrlCookie() {
    const urlCookie = document.cookie.split(';').find(cookie => cookie.startsWith(' mqttUrl='));
    if (urlCookie) {
        return urlCookie.split('=').pop();
    }
    return '';
}