// // Create a client instance

// var location = {
//     hostname: "api.akriya.co.in",
//     port: "1883"
// };

var firestore = firebase.firestore();
console.log('starting');

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };
var client = new Paho.Client('bot.akriya.co.in', 1883, `clientId-boxing_${ID}`);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("VMC/1035/VEND_ORDER_ITEM");
  // message = new Paho.Message("Hello");
  // message.destinationName = "World";
  // client.send(message);
  
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString); 
  var json = JSON.parse(message.payloadString);
  console.log(json["oiid"]);
  document.getElementById("username").innerHTML = json["oiid"];
  // username_vended = firestore.collection('users').where("username", "==", json["oiid"])
  //   .onSnapshot(function (querySnapshot) {
  //   // console.log(querySnapshot);
  //   var instances = [];
  //     querySnapshot.forEach(function (doc) {
  //       instances.push({
  //         username: doc.data().username,
  //         photo: doc.data().photo
  //       });
  //     });
      
  // });
  // console.log(instances.length);
  // instances.forEach((contestant) => {
  //   var cst = contestant;
  //   console.log(cst);
  // });
}

function sendCustomMessage() {
    
    // var messageValue = document.getElementById("message").value;
    // console.log(messageValue);
    // if (messageValue) {
    //     var message = new Paho.Message(messageValue);
    //     message.destinationName = "digitalicon/91springboards1/message";
    //     client.send(message);
    //     document.getElementById("message").value = '';
    // }
    
}

function updateCounterValue() {
    // var counter = document.getElementById("counter").value;

    // console.log(counter);
    // if (counter) {
    //     var message = new Paho.Message(counter);
    //     message.destinationName = "digitalicon/91springboards1/count";
    //     client.send(message);
    //     document.getElementById("counter").value = '';
    // }
}