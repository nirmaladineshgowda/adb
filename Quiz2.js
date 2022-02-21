// let baseAddress = 'https://adbquiz2.azurewebsites.net/'; // 'http://localhost:3000/';
let baseAddress = 'http://localhost:3000/';

function getQuakesByMagRange() {
    let magRange1 = document.getElementById("magRange1").value;
    let magRange2 = document.getElementById("magRange2").value;
    let place = document.getElementById("place").value;

    
    fetch(`${baseAddress}getQuakesByMagRange`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ magRange1: magRange1, magRange2: magRange2, place: place }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            data = data.filter(x => x.place.includes(place));
            displayQuakes(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function displayQuakes(data) {
    document.getElementById("content").innerHTML = "";
    var mainContainer = document.getElementById("content");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.style.padding = '20px';
        div.innerHTML = "Calamity ID: " + data[i].id + "      Magnitude: " + data[i].mag + "     Type:" + data[i].type;
        mainContainer.appendChild(div);
    }
}


function getQuakesByTypeAndNet() {
    let type = document.getElementById("type").value;
    let net = document.getElementById("net").value;
    
    fetch(`${baseAddress}getQuakesByTypeAndNet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: type, net: net }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            data = data.filter(x => x.place.includes(place));
            displayQuakes(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}