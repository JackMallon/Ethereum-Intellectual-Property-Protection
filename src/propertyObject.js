var express = require("express");

class IntellectualProperty {
  constructor(id, hash, timestamp) {
    this.id = id;
    this.hash = hash;
    this.timestamp = timestamp;
  }
}

function create(id, hash, timestamp) {
  ip = new IntellectualProperty(id, hash, timestamp);
  return ip;
}

module.exports.create = create;
