document.getElementById("searchButton").setAttribute("onclick", "coinDetails()");

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

    var listUrl = "https://api.coingecko.com/api/v3/coins/list";
    var coinList = getApi(listUrl);

    function searchId() {

        let inputLow = document.getElementById("coinName").value.toLowerCase();
        var input = inputLow[0].toUpperCase() + inputLow.slice(1);

        for (let i = 0; i < coinList.length; i++) {
            if (coinList[i].name === input) {
                return coinList[i].id;
            }
        }
        return null;

    }

    var coinId = searchId();
    var coinUrl = "https://api.coingecko.com/api/v3/simple/price?ids=" + coinId + "&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=2"
    var coinProperties = getApi(coinUrl);


    var coin = coinProperties[coinId];
    var price = coin.eur;
    var change_24 = coin.eur_24h_change;
    var volume_24 = coin.eur_24h_vol;
    var mkt_cap = coin.eur_market_cap;
    var lastupdate = coin.last_updated_at;


    var url_ticker = "https://api.coingecko.com/api/v3/coins/" + coinId + "?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=true";
    var ticker = getApi(url_ticker);
    var logo_url = ticker.image.thumb;

    update("coin_logo").src = logo_url;
    update("coin").innerHTML = coinId.toUpperCase();
    update("price").innerHTML = "€ " + price;
    update("change").innerHTML = change_24.toFixed(2) + "%";
    update("volume").innerHTML = "€ " + volume_24.toLocaleString();
    update("mkt").innerHTML = "€ " + mkt_cap.toLocaleString();
    update("update").innerHTML = "Last updated: " + lastupdate;

}
