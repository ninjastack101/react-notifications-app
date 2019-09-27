const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscription = mongoose.model("subscribers");
const q = require("q");
const webPush = require("web-push");
const keys = require("./../config/keys");
const getIcon = require("../services/getIcon");

router.post("/", (req, res) => {
  let payload = {
    title: req.body.title,
    message: req.body.message,
    url: "http://localhost:3000/",
    ttl: 36000,
    icon: getIcon[req.body.title]
  };

  Subscription.find({}, (err, subscriptions) => {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: "Technical error occurred"
      });
    } else {
      let parallelSubscriptionCalls = subscriptions.map(subscription => {
        return new Promise((resolve, reject) => {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.keys.p256dh,
              auth: subscription.keys.auth
            }
          };

          const pushPayload = JSON.stringify(payload);
          const pushOptions = {
            vapidDetails: {
              subject: "http://example.com",
              privateKey: keys.privateKey,
              publicKey: keys.publicKey
            },
            TTL: payload.ttl,
            headers: {}
          };
          webPush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then(value => {
              resolve({
                status: true,
                endpoint: subscription.endpoint,
                data: value
              });
            })
            .catch(err => {
              reject({
                status: false,
                endpoint: subscription.endpoint,
                data: err.message
              });
            });
        });
      });
      q.allSettled(parallelSubscriptionCalls).then(pushResults => {
        console.info(pushResults);
      });
      res.status(200).json({
        data: "Push triggered"
      });
    }
  });
});

router.get("/", (req, res) => {
  res.json({
    data: "Invalid Request Bad"
  });
});
module.exports = router;
