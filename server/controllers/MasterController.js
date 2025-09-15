const express = require("express");
const { administrationDetails, personalInfo, contactDetails,educationDetails,
  paymentDetails, getSelectedCourseName,getAdministrtaionInfo,getPersonalInfo} = require("../services/MasterService");
const administration = async (req, res) => {
  try {
    const { course_name, application_no } = req.query; 

    if (!course_name || !application_no) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const result = await administrationDetails({ course_name, application_no });

    if (result.success) {
      return res.status(200).json({ id: result.id });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
   }
  };
  
const fetchAdministration = async (req, res) => {
  try {
    const { application_no } = req.query;

    const result = await getAdministrtaionInfo(application_no);

    if (result.success) {
      return res.status(200).json(result.data);
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};



const personal = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await personalInfo(formData);
    if (result.success) {
      return res.status(200).json({ id: result.id});
    }else {
    return res.status(400).json({message: result.message});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const fetchPersonal = async (req, res) => {
  try {
    const { application_no } = req.query;

    const result = await getPersonalInfo(application_no);

    if (result.success) {
      return res.status(200).json(result.data);
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
const contact = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await contactDetails(formData);
    if (result.success) {
      return res.status(200).json({ id: result.id});
    }else {
    
    return res.status(400).json({message: result.message});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const education = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await educationDetails(formData);
    if (result.success) {
      return res.status(200).json({ id: result.id});
   }else {
    return res.status(400).json({message: result.message});
   }
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

// New function to get course name by application number
const getCourseName = async (req, res) => {
  try {
    const { applicationNo } = req.query;
    const result = await getSelectedCourseName(applicationNo);

    if (result.isSuccess) {
      return res.status(200).json(result.data);
    } else {
      return res.status(404).json({ error: result.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { administration, personal,  contact, education, payment, getCourseName,
  fetchAdministration,fetchPersonal};
