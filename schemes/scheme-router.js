const express = require('express');

const User = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  User.find()
  .then(schemes => {
    res.status(200).json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Please provide a valid Id' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes with the id' });
  });
});


router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  User.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  User.add(schemeData)
  .then(scheme => {
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: err });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  User.findById(id)
  .then(scheme => {
    if (scheme) {
      User.update(changes, id)
      .then(updatedScheme => {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;