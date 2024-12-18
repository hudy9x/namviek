#!/bin/bash
sleep 10  # Give MongoDB time to start
mongosh --eval "rs.initiate({
  _id: 'rs0',
  members: [{
    _id: 0,
    host: 'localhost:27017'
  }]
})" 