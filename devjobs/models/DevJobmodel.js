const mongoose = require('mongoose');

const commonSchema = mongoose.Schema({
  content: { type: String, required: true },
  items:{type:[String], required:true}
})

const jobSchema = mongoose.Schema({
  company: { type: String, required: true },
  logo: { type: String, required: true },
  logoBackground: { type: String, required: true },
  position: { type: String, required: true },
  postedAt: { type: String, required: true },
  contract: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: true },
  apply: { type: String, required: true },
  description: { type: String, required: true },
  requirements: commonSchema,
  role: commonSchema
})

const DevJobModel = mongoose.model('Job', jobSchema);

module.exports = { DevJobModel };