var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT id, name,  ST_X (ST_Transform (geom, 4326)) AS long, ST_Y (ST_Transform (geom, 4326)) AS lat FROM fuel LIMIT 100 `
    );
    
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
