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
function getElement(id) {
    return document.getElementById(id);
}
function coinDetails() {

    const listUrl = "https://api.coingecko.com/api/v3/coins/list";
    const coinList = getApi(listUrl);
    let inputLow = document.getElementById("coinName").value.toLowerCase();
    let input = inputLow[0].toUpperCase() + inputLow.slice(1);
    const coinId = coinList.find(coin => coin.name === input)?.id || null;
    const errorElement=document.getElementById('error');

    if(!coinId){
        errorElement.style.display='block';
        errorElement.innerHTML="Coin cannot be found.";
        updateData("images/noImg.jpg",null,null,null,null,null);
        return;
    }else{
        errorElement.innerHTML="";
        errorElement.style.display='none';
    }

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

    updateData(
        logo_url,
        coinId.toUpperCase(),
        "€ " + price,
        change_24.toFixed(2) + "%",
        "€ " + volume_24.toLocaleString(),
        "€ " + mkt_cap.toLocaleString()
    );

    function updateData(logo, name,price,change, volume, mkt){
        getElement("coin_logo").src = logo;
        getElement("coin").innerHTML = name;
        getElement("price").innerHTML = price;
        getElement("change").innerHTML = change;
        getElement("volume").innerHTML = volume;
        getElement("mkt").innerHTML = mkt;
    }
}
