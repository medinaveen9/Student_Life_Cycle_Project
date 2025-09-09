// controllers/courseController.js
const { administrationDetails,personalInfo,identityInfo, contactDetails,educationDetails,
  paymentDetails,courseSelectionService,  getApplicationByNoService} = require("../services/BPTService");

const courseSelectionController = async (req, res) => {
  try {
    const courseData = req.body;

    const result = await courseSelectionService(courseData);

    if (result.success) {
      console.log("Course saved successfully");
      return res.status(200).json({ success: true, message: result.message, data: result.data });
    }

    return res.status(400).json({ success: false, message: result.message });

  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const administration = async (req, res) => {
  try {
    const formData = req.body;
    const result = await administrationDetails(formData);

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


const identity = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await identityInfo(formData);
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

const contact = async (req, res) => {
  try {
    const formData = req.body;
  
    const result = await contactDetails(formData);
    if (result.success) {
      return res.status(200).json({ id: result.id});
    }else {
    return res.status(400).json({message:result.message});
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

const getApplicationByNo = async (req, res) => {
  try {
    const { applicationNo } = req.params;
    const result = await getApplicationByNoService(applicationNo);

    if (!result) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching application:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  courseSelectionController, administration, personal,contact, education, payment, identity,
  getApplicationByNo};
