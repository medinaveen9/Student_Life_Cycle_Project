const express = require("express");
const { administrationDetails,personalInfo, contactDetails,educationDetails,paymentDetails} = require("../services/MasterService");


const administration = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await administrationDetails(formData);
    if (result) {
      return res.status(200).json({ id: result.rows[0].id});
    }
    return res.status(400).json("Error occured");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const personal = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await personalInfo(formData);
    if (result) {
      return res.status(200).json({ id: result.rows[0].id});
    }
    return res.status(400).json("Error occured");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


const contact = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await contactDetails(formData);
    if (result) {
      return res.status(200).json({ id: result.rows[0].id});
    }
    return res.status(400).json("Error occured");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const education = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await educationDetails(formData);
    if (result) {
      return res.status(200).json({ id: result.rows[0].id});
    }
    return res.status(400).json("Error occured");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


const payment = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await paymentDetails(formData);
    if (result) {
      return res.status(200).json({ id: result.rows[0].id});
    }
    return res.status(400).json("Error occured");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  administration,
  personal,
  contact,
  education,
  payment
};
