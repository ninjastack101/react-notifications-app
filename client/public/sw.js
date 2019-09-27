let notificationUrl = "https://localhost:3000";

self.addEventListener("push", function(event) {
  let _data = event.data ? JSON.parse(event.data.text()) : {};
  notificationUrl = _data.url;
  event.waitUntil(
    self.registration.showNotification(_data.title, {
      body: _data.message,
      icon: _data.icon,
      tag: _data.tag,
      vibrate: [200, 100, 200, 100, 200, 100, 200]
    })
  );
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window"
      })
      .then(function(clientList) {
        if (clients.openWindow) {
          // console.log("sw.js/notificationclick/clientlist");
          return clients.openWindow(notificationUrl);
        }
      })
  );
});
