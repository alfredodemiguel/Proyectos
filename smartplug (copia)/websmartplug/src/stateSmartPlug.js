
var id,isSmartPlugLive,plug,proximity,plugState,proximityState,numberOfSmartPlug;

export function setStateInitial() {
    id = 0;
    isSmartPlugLive = 'false';
    plug = 'off';
    proximity = 0;
    plugState = 'off';
    proximityState = 'off';
}

export function getIdOfSmartPlug () {
    return (id);
}

export function setIdOfSmartPlug (TempIdOfSmartPlug){
    id = TempIdOfSmartPlug;
    console.log ('estoy en setid');
    console.log (id);
}

export function getIsSmartPlugLive() {
    return (isSmartPlugLive);
}

export function setIsSmartPlugLive (TempIsSmartPlugLive){
    isSmartPlugLive = TempIsSmartPlugLive;
}

export function getPlug() {
    return (plug);
}

export function setPlug (TempPlug){
    plug = TempPlug;
}

export function getProximity() {
    return (proximity);
}

export function setProximity (TempProximity){
    proximity = TempProximity;
}

export function getPlugState() {
    return (plugState);
}

export function setPlugState (TempPlugState){
    plugState = TempPlugState;
}

export function getProximityState() {
    return (proximityState);
}

export function setProximityState (TempProximityState){
    proximityState = TempProximityState;
}


export function getNumberOfSmartPlug() {
    return (numberOfSmartPlug);
}

export async function setNumberOfSmartPlug (TempNumberOfSmartPlug){
    numberOfSmartPlug = TempNumberOfSmartPlug;
}