import pyrebase
import serial
import pynmea2


# Khalifa Firebase Credentials
# firebaseConfig = {
#     apiKey: "AIzaSyAULsQUiPZqCFKI7XHjwAz5gcsMZ5cpbmk",
#     authDomain: "trykey-protocol.firebaseapp.com",
#     projectId: "trykey-protocol",
#     storageBucket: "trykey-protocol.appspot.com",
#     messagingSenderId: "267573157193",
#     appId: "1:267573157193:web:735b6b3d626009c081ce98",
#     measurementId: "G-H66R1LWESC"
# }

# Abdulmalik Firebase Credentials
firebaseConfig = {
    "apiKey": "AIzaSyDExvt-JgGyiP3Agm296r-4MH8kfsIa4TE",
    "authDomain": "gps-tracker-fdba5.firebaseapp.com",
    "databaseURL": "https://gps-tracker-fdba5-default-rtdb.firebaseio.com",
    "projectId": "gps-tracker-fdba5",
    "storageBucket": "gps-tracker-fdba5.appspot.com",
    "messagingSenderId": "1077750052892",
    "appId": "1:1077750052892:web:ef8862ca2f15701bd907d9",
    "measurementId": "G-90J533WF9Q"
}

firebase=pyrebase.initialize_app(firebaseConfig)
db=firebase.database()

while True:
    port="/dev/ttyAMA0"
    ser=serial.Serial(port, baudrate=9600, timeout=0.5)
    dataout = pynmea2.NMEAStreamReader()
    newdata=ser.readline()
    n_data = newdata.decode('latin-1')
    if n_data[0:6] == '$GPRMC':
        newmsg=pynmea2.parse(n_data)
        lat=newmsg.latitude
        lng=newmsg.longitude
        gps = "Latitude=" + str(lat) + " and Longitude=" + str(lng)
        print(gps)
        data = {"LAT": lat, "LNG": lng}
        db.update(data)
        print("Data sent")
