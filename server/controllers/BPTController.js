// controllers/courseController.js
const {courseSelectionService} = require("../services/BPTService");

const courseSelectionController = async (req, res) => {
  try {
    const courseData = req.body;

    const result = await courseSelectionService(courseData);
    if(result.success) {
        console.log("Course saved successfully");   
        return res.status(200).json(result.message);
    }
    return res.status(400).json(result.message);

  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  courseSelectionController,
};
