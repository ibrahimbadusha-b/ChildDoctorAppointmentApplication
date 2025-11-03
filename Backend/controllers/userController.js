const userModel = require('../models/userModel');

exports.storeUser = async (req, res,next) => {
  const datas = req.body;
  try {
    const userData = await userModel.create(datas);
    res.status(201).json({ success: true, userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getusers = async (req, res,next) => {
  try {
    const userDatas = await userModel.find();
    res.status(200).json({ success: true, userDatas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.singleUser = async (req, res,next) => {
  const { email } = req.params;
  try {
    const userDatas = await userModel.find({ authEmail: email });
    res.status(200).json({ success: true, userDatas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.cancelAppointment = async (req, res,next) => {
  const { id } = req.params;
  try {
    const cancel = await userModel.findByIdAndDelete(id);
    console.log('Deleted ID:', id);
    res.status(200).json({ success: true, cancel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

