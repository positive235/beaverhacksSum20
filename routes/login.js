const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

router.post('/login', async (req, res) => {
    Business.findOne({email: req.body.email}, (err, business) => {
        if (!business) {
            return res.json({ isEmail: "false" });
        }
        business.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ isPwd: "false"});
            }
            business.createToken((err, business) => {
                if (err) return res.status(400).send(err);
                res.cookie("qu_auth", business.token).status(200).json({
                    isLogin: "true",
                    business_id: business._id,
                });
            });
        });
    });
});

module.exports = router;