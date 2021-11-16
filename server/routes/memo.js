const express = require('express');
const router = express.Router();
const { Memo } = require("../models/memo");

// const { auth } = require("../middleware/auth");
const multer = require("multer");




// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.put("/createMemo", (req, res) => {
    Memo.findOneAndUpdate({ _id: req.body._id, }, { body: req.body.body }, { new: true, upsert: true }, (err, memoInfo) => {
        if (err) {
            return res.json({ success: false, err });
        }
        // console.log("create", memoInfo)
        return res.status(200).json({ success: true, memoInfo })
    })

});




router.get("/getMemos", (req, res) => {
    Memo.find()
        .exec((err, memos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, memos: memos });
        });
});


router.get("/getMemo/:id", (req, res) => {

    Memo.findOne({ "_id": req.params.id })
        .exec((err, memInfo) => {
            if (err) {
                return res.status(400).send(err);
            }
            // console.log("get data", memInfo);
            res.status(200).json({ success: true, memInfo: memInfo })
        })

});



module.exports = router;