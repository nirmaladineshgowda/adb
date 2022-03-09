// let baseAddress = 'https://adbquiz2.azurewebsites.net/'; // 'http://localhost:3000/';
let baseAddress = 'http://localhost:3000/';

function getQuakesByMagRange() {
    let magRange1 = document.getElementById("minId").value;
    let magRange2 = document.getElementById("ToId").value;
    
    fetch(`${baseAddress}getIdsRange`)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            const time = data.time;
            data = data.data.filter(x => x.id >= Number(magRange1) && x.id <= Number(magRange2));
            document.getElementById("time").innerText = time;
            displayQuakes(data, time);
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
        div.innerHTML = "ID: " + data[i].id + "      Name: " + data[i].name + "     pwd:" + data[i].pwd + "   code:" + data[i].code;
        mainContainer.appendChild(div);
    }
}

function getQuakesByDegrees() {
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;
    let N = document.getElementById("N").value;

    
    fetch(`${baseAddress}getQuakesByDegrees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat: lat, lon: lon, N: N }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            displayQuakes(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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