/* Shariff Muhammad 23611732 */

const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

router.get('/', search);

module.exports = router;