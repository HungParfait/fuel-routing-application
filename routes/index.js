var express = require("express");
var router = express.Router();
const pool = require("../db");

function longlatToLatlong(s) {
  const arr = s.split(",");
  const newS = arr[1].concat(",", arr[0]);
  return newS;
}

function filterLocation(s) {
  const arr = s.split('"');
  return longlatToLatlong(arr[0])
}

router.get("/", async (req, res) => {
  const fuel = (
    await pool.query(
      `SELECT id, name,  ST_X (ST_Transform (geom, 4326)) AS long, ST_Y (ST_Transform (geom, 4326)) AS lat FROM fuel_station`
    )
  ).rows;

  const index = (
    await pool.query(
      `(SELECT osm_id, id, lon as long, lat FROM ways_vertices_pgr
      ORDER BY the_geom <-> ST_SetSRID(ST_Point(105.8403167, 21.0053865), 4326) LIMIT 50)
      UNION
      (SELECT osm_id, id, lon as long, lat FROM ways_vertices_pgr
      ORDER BY the_geom <-> ST_SetSRID(ST_Point(105.84170043468475, 20.998344696408804), 4326) LIMIT 50)`
    )
  ).rows;

  res.render("index.ejs", {
    fuel,
    index,
  });
});

router.get("/route", async (req, res) => {
  let { departLocation, destLocation } = req.query;
  departLocation_latlong = filterLocation(departLocation);
  destLocation_latlong = filterLocation(destLocation);
  const queryLine = `SELECT ST_AsGeoJSON(ST_MakeLine(route.geom)), STRING_AGG(route.name, ',') as string FROM (
        SELECT geom, name FROM wrk_fromAtoB('ways',${departLocation_latlong},${destLocation_latlong}) ORDER BY seq) AS route;`;
  const queryResult = (await pool.query(queryLine)).rows;
  line = queryResult[0];
  res.render("route.ejs", { departLocation, destLocation, line });
});

router.get("/fuel/station", async (req, res) => {
  let { location } = req.query;
  location = longlatToLatlong(location);
  const queryLine = `SELECT id, name, ST_X(geom) as long, ST_Y(geom) as lat FROM fuel_station
  ORDER BY fuel_station.geom <-> ST_SetSRID(ST_Point(${location}), 4326) LIMIT 3;`;
  const queryResult = (await pool.query(queryLine)).rows;
  res.render("fuel.ejs", { location: longlatToLatlong(location), queryResult });
});

module.exports = router;
