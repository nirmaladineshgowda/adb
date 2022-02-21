let baseAddress = 'https://adbquiz2.azurewebsites.net/'; // 'http://localhost:3000/';

function getQuakesByMagRange() {
    let magRange1 = document.getElementById("magRange1").value;
    let magRange2 = document.getElementById("magRange2").value;

    fetch(`${baseAddress}getQuakesByMagRange`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ magRange1: magRange1, magRange2: magRange2 }),
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