const router = require("express").Router();


// simple rout to cheack if server is running with respns.ok
router.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});






module.exports = router;