const { Router } = require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const Otter = require('../models/Otter');

router.get('/', async (req, res) => {
    const otters = await Otter.find().sort('-_id');
    res.json(otters);
});

router.post('/', async (req, res) => {
    const { title, author } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newOtter = new Otter({title, author, imagePath});
    await newOtter.save();
    res.json({'message': 'Otter Saved'});
});

router.delete('/:id', async (req, res) => {
    const otter = await Otter.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./backend/public/' + otter.imagePath));
    res.json({message: 'Otter Deleted'});
});


module.exports = router;