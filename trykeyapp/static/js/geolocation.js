// Abdulmalik Firebase Credentials
const firebaseConfig = {
    apiKey: "AIzaSyDExvt-JgGyiP3Agm296r-4MH8kfsIa4TE",
    authDomain: "gps-tracker-fdba5.firebaseapp.com",
    databaseURL: "https://gps-tracker-fdba5-default-rtdb.firebaseio.com",
    projectId: "gps-tracker-fdba5",
    storageBucket: "gps-tracker-fdba5.appspot.com",
    messagingSenderId: "1077750052892",
    appId: "1:1077750052892:web:ef8862ca2f15701bd907d9",
    measurementId: "G-90J533WF9Q"
};

firebase.initializeApp(firebaseConfig );

var latitude;
var longitude;

var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
    var gps = snapshot.val();
    console.log(gps.LAT);
    console.log(gps.LNG);
    latitude = gps.LAT;
    longitude = gps.LNG;

    map.setCenter({lat:latitude, lng:longitude, alt:0});
    mark.setPosition({lat:latitude, lng:longitude, alt:0});
    
    lineCoords.push(new google.maps.LatLng(latitude, longitude));

    var lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoords,
    geodesic: true,
    strokeColor: '#8B0000'
    });
    
    lineCoordinatesPath.setMap(map);
}, function (error) {
    console.log("Error: " + error.code);
});

// Initialize at NCAIR
window.lat = 9.052411503878703;
window.lng = 7.441675368692147;

var map;
var mark;
var lineCoords = [];

var initialize = function() {
    map  = new google.maps.Map(document.getElementById('map'), {center:{lat:lat,lng:lng},zoom:12});
    // mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});

    // Array of arbitrary marker data
    const markers = [
        { position: { lat: 9.047340774368058, lng: 7.446985812379514 }, icon: "../static/img/rickshaw(inactive).png" },
        { position: { lat: 9.046270641849858, lng: 7.443091245114522 }, icon: "../static/img/rickshaw(active).png" },
        { position: { lat: 9.045550154797594, lng: 7.44993624212572 }, icon: "../static/img/rickshaw(active).png" },
        { position: { lat: 9.0410152914226, lng: 7.45123443121405 }, icon: "../static/img/rickshaw(inactive).png" },
    ];

    // Loop through the marker data and create markers
    markers.forEach((markerData) => {
        new google.maps.Marker({
        position: markerData.position,
        map: map,
        icon: {
            url: markerData.icon,
            scaledSize: new google.maps.Size(40, 30),
        },
        title: "Arbitrary Marker",
        });
    });
    
    // Define the custom marker icon
    const customIcon = {
        url: "../static/img/rickshaw(active).png", // A marker with a with a URL pointing to a PNG.
        scaledSize: new google.maps.Size(40, 30),
    };

    // Create a marker with the custom icon
    mark = new google.maps.Marker({
        position: { lat: latitude, lng: longitude }, // Same as map center
        map: map,
        icon: customIcon,
        title: "Tracked Marker",
    });
};

window.initialize = initialize;


// Khalifa Firebase Credentials
// const firebaseConfig = {
//     apiKey: "AIzaSyAULsQUiPZqCFKI7XHjwAz5gcsMZ5cpbmk",
//     authDomain: "trykey-protocol.firebaseapp.com",
//     projectId: "trykey-protocol",
//     storageBucket: "trykey-protocol.appspot.com",
//     messagingSenderId: "267573157193",
//     appId: "1:267573157193:web:735b6b3d626009c081ce98",
//     measurementId: "G-H66R1LWESC"
// };
