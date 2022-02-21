let baseAddress = 'http://localhost:3000/';
function getEarthQuakesByMagnitude() {
  let value = document.getElementById("noOfQuakes").value;
  fetch(`${baseAddress}getEarthQuakesByMagnitude`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ noOfEarthQuakes: value }),
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

function getQuakesByLatLonRange() {
  var lat = document.getElementById("lat").value;
  var long = document.getElementById("lon").value;
  var range = document.getElementById("range").value;

  fetch(`${baseAddress}getQuakesInRange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lat: lat, lon: long, range: range }),
  })
    .then(response => response.json())
    .then(data => {
      displayQuakesByLatLonRange(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function displayQuakesByLatLonRange(data) {
  document.getElementById("content").innerHTML = "";
  var mainContainer = document.getElementById("content");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML = "Distance:" + data[i].DISTANCE + "    ID:" + data[i].ID + "     Magnitude:" + data[i].MAG;
    mainContainer.appendChild(div);
  }
}

function getQuakesByDateAndRange() {
  var fromDate = document.getElementById("fromDate").value;
  var toDate = document.getElementById("toDate").value;
  var mag = document.getElementById("mag").value;
  fetch(`${baseAddress}getQuakesInDateRange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromDate: fromDate, toDate: toDate, mag: mag }),
  })
    .then(response => response.json())
    .then(data => {
      displayQuakesByDateAndRange(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function displayQuakesByDateAndRange(data) {
  document.getElementById("content").innerHTML = "";
  var mainContainer = document.getElementById("content");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML = "ID:" + data[i].id + "    Magnitude is " + data[i].mag;
    mainContainer.appendChild(div);
  }
}

function getQuakesCountByMagnitude() {
  var days = document.getElementById("magnitude").value;
  fetch(`${baseAddress}getQuakesCountByMagnitude`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ days: days }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      count_mag_disp(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function count_mag_disp(data) {
  document.getElementById("content").innerHTML = "";
  var mainContainer = document.getElementById("content");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    div.innerHTML = "COUNT " + data[i].COUNT + "  ;RANGE" + data[i].RANGE;
    mainContainer.appendChild(div);
  }
}

function high_loc1_loc2() {
  var loc1_lat = document.forms["high_form_loc"]["loc1_lan"].value;
  var loc1_lon = document.forms["high_form_loc"]["loc1_lon"].value;
  var loc2_lat = document.forms["high_form_loc"]["loc2_lan"].value;
  var loc2_lon = document.forms["high_form_loc"]["loc2_lon"].value;
  var range = document.forms["high_form_loc"]["range_high_loc"].value;


  if (range == "") {
    alert("Name must be filled out");
    return false;
  }
  else {
    {
      ///First location call
      fetch('/profile/lac_lon_mac_cal', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat1: loc1_lat, lon1: loc1_lon, lat2: loc2_lat, lon2: loc2_lon, ran: range }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          high_loc_ran(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    return false;
  }
}

function high_loc_ran(data) {
  document.getElementById("content").innerHTML = "";
  var div = document.createElement("div");
  div.style.padding = '20px';
  var mainContainer = document.getElementById("content");
  var len1 = data[0][1];
  var len2 = data[0][2];

  div.innerHTML = "No of earthquakes in location-1 is " + len1 + " and " + "  No of earthquakes in location-2 is " + len2;
  mainContainer.appendChild(div);

}

function get_lat_lon_max() {
  var lat = document.forms["max_mag_lat_lon"]["lat_max_mag"].value;
  var long = document.forms["max_mag_lat_lon"]["long_max_mag"].value;
  var range = document.forms["max_mag_lat_lon"]["range_max_mag"].value;
  if (lat == "" || long == "" || range == "") {
    alert("Name must be filled out");
    return false;
  }
  else {
    fetch('/profile/lan_lon_range', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude: lat, longitude: long, Range: range }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        show_loat_lon_max(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return false;
  }
}

function show_loat_lon_max(data) {
  document.getElementById("content").innerHTML = "";
  var mainContainer = document.getElementById("content");
  // for (var i = 0; i < data.length; i++) {
  var div = document.createElement("div");
  div.style.padding = '20px';
  div.innerHTML = "ID =" + data[0].ID + "  ;MAG=" + data[0].MAG;
  mainContainer.appendChild(div);
  //}
}
