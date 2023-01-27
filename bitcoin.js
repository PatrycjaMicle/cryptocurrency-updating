document.getElementById("searchButton").addEventListener("click", function(){
    coinDetails();
    startLoading();
    stopLoading()
});
document.getElementById("coinName").addEventListener("keyup", function(event) {
    if (event.code === 'Enter'){
        event.preventDefault();
        coinDetails();
        startLoading();
        stopLoading()
    }
});
function startLoading() {
    document.body.style.cursor = "wait";
}
function stopLoading() {
    document.body.style.cursor = "default";
}
function getApi(url) {
    let daten;
    let datenJSON;
    function getData(x) {
        const request = new XMLHttpRequest();
        request.open("GET", x, false);
        request.send();
        return request.responseText;
    }
    datenJSON = getData(url);
    daten = JSON.parse(datenJSON);
    return daten;
}
function update(id) {
    return document.getElementById(id);
}
function coinDetails() {

    const listUrl = "https://api.coingecko.com/api/v3/coins/list";
    const coinList = getApi(listUrl);
    let inputLow = document.getElementById("coinName").value.toLowerCase();
    let input = inputLow[0].toUpperCase() + inputLow.slice(1);
    const coinId = coinList.find(coin => coin.name === input)?.id || null;
    if(!coinId) return; //If coin is found, it accesses the id property of that object
                        // and assigns it to the variable coinId.
                        // If no match is found, coinId is assigned a value of null.
                        // Then it check if coinId is null, if it is then it will return nothing.

    const coinUrl = "https://api.coingecko.com/api/v3/simple/price?ids=" + coinId + "&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=2"
    const coinProperties = getApi(coinUrl);
    const coin = coinProperties[coinId];
    const price = coin.eur;
    const change_24 = coin.eur_24h_change;
    const volume_24 = coin.eur_24h_vol;
    const mkt_cap = coin.eur_market_cap;
    const url_ticker = "https://api.coingecko.com/api/v3/coins/" + coinId + "?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=true";
    const ticker = getApi(url_ticker);
    const logo_url = ticker.image.thumb;

    update("coin_logo").src = logo_url;
    update("coin").innerHTML = coinId.toUpperCase();
    update("price").innerHTML = "€ " + price;
    update("change").innerHTML = change_24.toFixed(2) + "%";
    update("volume").innerHTML = "€ " + volume_24.toLocaleString();
    update("mkt").innerHTML = "€ " + mkt_cap.toLocaleString();
}
