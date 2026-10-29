/* Shariff Muhammad u23611732 */

const Reason = require('../models/Reason');

async function getReasons(req, res){

  try {
    const reasons = await Reason.find().sort({ createdAt: 1 });

    res.status(200).json({
        success: true, 
        reasons 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }

}

module.exports = { getReasons };