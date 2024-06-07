// Initialize at NCAIR
window.lat = 9.052411503878703;
window.lng = 7.441675368692147;

var map;
var mark;
var lineCoords = [];

var initialize = function() {
    map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:lat,lng:lng},zoom:12});
    mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
};

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

window.initialize = initialize;

firebase.initializeApp(firebaseConfig );

var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
    var gps = snapshot.val();
    console.log(gps.LAT);
    console.log(gps.LNG);
    lat = gps.LAT;
    lng = gps.LNG;

    map.setCenter({lat:lat, lng:lng, alt:0});
    mark.setPosition({lat:lat, lng:lng, alt:0});
    
    lineCoords.push(new google.maps.LatLng(lat, lng));

    var lineCoordinatesPath = new google.maps.Polyline({
        path: lineCoords,
        geodesic: true,
        strokeColor: '#8B0000'
    });
    
    lineCoordinatesPath.setMap(map);
}, function (error) {
    console.log("Error: " + error.code);
});


// window.lat = 37.7850;
// window.lng = -122.4383;

// var map;
// var mark;
// var lineCoords = [];

// var initialize = function() {
//     map  = new google.maps.Map(document.getElementById('map'), {center:{lat:lat,lng:lng},zoom:12});
//     mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
// };

// const firebaseConfig = {

// apiKey: "AIzaSyDExvt-JgGyiP3Agm296r-4MH8kfsIa4TE",
// authDomain: "gps-tracker-fdba5.firebaseapp.com",
// databaseURL: "https://gps-tracker-fdba5-default-rtdb.firebaseio.com",
// projectId: "gps-tracker-fdba5",
// storageBucket: "gps-tracker-fdba5.appspot.com",
// messagingSenderId: "1077750052892",
// appId: "1:1077750052892:web:ef8862ca2f15701bd907d9",
// measurementId: "G-90J533WF9Q"

// };

// window.initialize = initialize;

// firebase.initializeApp(firebaseConfig );

// var ref = firebase.database().ref();

// ref.on("value", function(snapshot) {
//     var gps = snapshot.val();
//     console.log(gps.LAT);
//     console.log(gps.LNG);
//     lat = gps.LAT;
//     lng = gps.LNG;

//     map.setCenter({lat:lat, lng:lng, alt:0});
//     mark.setPosition({lat:lat, lng:lng, alt:0});
    
//     lineCoords.push(new google.maps.LatLng(lat, lng));

//     var lineCoordinatesPath = new google.maps.Polyline({
//     path: lineCoords,
//     geodesic: true,
//     strokeColor: '#2E10FF'
//     });
    
//     lineCoordinatesPath.setMap(map);
// }, function (error) {
//     console.log("Error: " + error.code);
// });
