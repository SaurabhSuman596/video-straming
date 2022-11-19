const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');

// CREATE

router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch {
      (err) => res.status(500).json(err);
    }
  } else {
    res.status(403).json('you are not allowed!');
  }
});

// DELETE

router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json('This list has been deleted!');
    } catch {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed!');
  }
});

// GET

router.get('/', verify, async (req, res) => {
  const typedQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typedQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typedQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
