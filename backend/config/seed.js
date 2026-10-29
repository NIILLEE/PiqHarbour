/* Shariff Muhammad u23611732 */

const Reason = require('../models/Reason');

const defaultReasons = [
  'Spam or misleading',
  'Inappropriate or offensive content',
  'Harassment or bullying',
  'Copyright infringement',
  'Other',
];

async function seedReasons(){

  const count = await Reason.countDocuments();

  if (count === 0){
    await Reason.insertMany(defaultReasons.map((label) => ({ label })));
    console.log('Default report reasons added.');
  }
  
}

module.exports = seedReasons;