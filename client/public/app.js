let isSubscribed = false;
let swRegistration = null;
let applicationKey =
  "BDjfggxh23VR3POI0zdzAXs7g12xsiW9yShUynMzItKQGV8ULEyPz4G8MZCgbqzml8Umd9QvP4rzzgVNZ1K1DoU";

// Url Encription
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Installing service worker
if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");

  navigator.serviceWorker
    .register("sw.js", { scope: "/app/" })
    .then(function(swReg) {
      swRegistration = swReg;
      swRegistration.pushManager.getSubscription().then(function(subscription) {
        isSubscribed = !(subscription === null);
        console.log(subscription);
        if (isSubscribed) {
          console.log("User is already subscribed");
        } else {
          console.log(swRegistration);
          swRegistration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlB64ToUint8Array(applicationKey)
            })
            .then(function(subscription) {
              saveSubscription(subscription);
              isSubscribed = true;
            })
            .catch(function(err) {
              console.log("Failed to subscribe user: ", err.message);
            });
        }
      });
    })
    .catch(function(error) {
      console.error("Service Worker Error", error);
    });
} else {
  console.warn("Push messaging is not supported");
}

// Send request to database for add new subscriber
function saveSubscription(subscription) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "http://localhost:5000/subscribe/");
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.onreadystatechange = function(res) {
    if (xmlHttp.readyState != 4) return;
    if (xmlHttp.status != 200 && xmlHttp.status != 304) {
      console.log("HTTP error " + xmlHttp.status, null);
    } else {
      console.log("User subscribed to server");
    }
  };

  xmlHttp.send(JSON.stringify(subscription));
}
