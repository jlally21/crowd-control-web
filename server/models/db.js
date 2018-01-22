var pg = require('pg');
var username = require('os').userInfo().username;

var conString = process.env.DB_URL || "postgres://postgres:5432@localhost/" + username;

// setup initial table
function createDefaultTable() {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('CREATE TABLE IF NOT EXISTS data (id integer NOT NULL, location_name varchar(100), count integer, date TIMESTAMP); ', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
        });
    });
}

// get current "people count" of a location
var getCountAtLocation = function(location, res) {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT SUM(count) FROM data WHERE location_name=$1;', [location], function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            else {
                res.send(result.rows);
            }
            client.end();
        });
    });
}

var addDataEntry = function(id, location_name, count, date, res) {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('INSERT INTO data (id, location_name, count, date) VALUES ($1, $2, $3, $4)', [id, location_name, count, date], function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            else {
                res.send("added entry to data table");
            }
            client.end();
        });
    });
}

createDefaultTable();
module.exports.getCountAtLocation = getCountAtLocation;
module.exports.addDataEntry = addDataEntry;
