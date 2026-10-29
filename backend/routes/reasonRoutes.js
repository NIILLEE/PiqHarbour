/* Shariff Muhammad u23611732 */

const express = require('express');
const router = express.Router();

const { getReasons } = require('../controllers/reasonController');

router.get('/', getReasons);

module.exports = router;