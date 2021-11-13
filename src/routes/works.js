const express = require('express');
const auth = require('../middleware/auth');
const DBWork = require('../db/db_work');

const router = express.Router();

router.post('/add/work', auth, async (req, res) => {
  const db = new DBWork();
  const work = {
    workName: req.body.work_name,
    workDetails: req.body.work_details,
    languageId: req.body.language_id,
    link: req.body.link,
    gitLink: req.body.git_link,
    coverImage: req.body.image,
    coverImageType: req.body.image_type,
  };
  try {
    const result = await db.createWork(work);
    if (result.success) {
      res.status(201).json({ ...result, message: 'Succesfully created' });
      return;
    }
    res.status(400).json({ ...result, message: 'Can`t insert in db!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post('/add/language', auth, async (req, res) => {
  const db = new DBWork();
  const language = {
    language: req.body.language,
    languageShort: req.body.language_short,
  };
  try {
    const result = await db.insertLanguage(language);
    if (result.success) {
      res.status(201).json({ ...result, message: 'Succesfully added' });
      return;
    }
    res.status(400).json({ ...result, message: 'Can`t insert in db!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post('/add/details', auth, async (req, res) => {
  const db = new DBWork();
  const work = {
    workId: req.body.work_id,
    languageId: req.body.language_id,
    workName: req.body.work_name,
    workDetails: req.body.work_details,
  };
  try {
    const result = await db.insertWorkDetails(work);
    if (result.success) {
      res.status(201).json({ ...result, message: 'Succesfully added' });
      return;
    }
    res.status(400).json({ ...result, message: 'Can`t insert in db!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.put('/update/details', auth, async (req, res) => {
  const db = new DBWork();
  const work = {
    workId: req.body.work_id,
    languageId: req.body.language_id,
    workName: req.body.work_name,
    workDetails: req.body.work_details,
  };
  try {
    const result = await db.updateWorkDetails(work);
    if (result.success) {
      res.status(200).json({ ...result, message: 'Succesfully updated' });
      return;
    }
    res.status(400).json({ ...result, message: 'Can`t insert in db!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.put('/update/work', auth, async (req, res) => {
  const db = new DBWork();
  const work = {
    workId: req.body.work_id,
    link: req.body.link,
    gitLink: req.body.git_link,
  };
  try {
    const result = await db.updateWork(work);
    if (result.success) {
      res.status(200).json({ ...result, message: 'Succesfully updated' });
      return;
    }
    res.status(400).json({ ...result, message: 'Can`t insert in db!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get('/get/alllang', auth, async (req, res) => {
  const db = new DBWork();
  try {
    const result = await db.getAllLanguages();
    if (result.success) {
      res.status(200).json(result);
      return;
    }
    res.status(404).json({ ...result, message: 'Not found!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get('/get/allworks', auth, async (req, res) => {
  const db = new DBWork();
  try {
    const result = await db.getAllWorks();
    if (result.success) {
      res.status(200).json(result);
      return;
    }
    res.status(404).json({ ...result, message: 'Not found!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get('/get/works', async (req, res) => {
  const db = new DBWork();
  const languageShort = req.query.language_short;
  const { data } = await db.getLanguage(languageShort);
  try {
    const result = await db.getAllWorksByLanguage(data.id);
    if (result.success) {
      res.status(200).json(result);
      return;
    }
    res.status(404).json({ ...result, message: 'Not found!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get('/get/work', async (req, res) => {
  const db = new DBWork();
  // eslint-disable-next-line camelcase
  const { work_id, language_short } = req.query;
  const { data } = await db.getLanguage(language_short);
  try {
    const result = await db.getWorkByIdAndLanguage(work_id, data.id);
    if (result.success) {
      res.status(200).json(result);
      return;
    }
    res.status(404).json({ ...result, message: 'Not found!' });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete('/delete/work', auth, async (req, res) => {
  const db = new DBWork();
  const workId = req.body.work_id;
  try {
    const result = await db.deleteWorkById(workId);
    if (result.success) {
      res.status(200).json(result);
      return;
    }
    res.status(505).json({ ...result, message: 'Error' });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
