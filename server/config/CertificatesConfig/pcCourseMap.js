// Map course names to certificate types
const courseContentMap = {
    "B.Sc. (Nursing)": "TYPE_E",
    "Bachelor of Physiotherapy": "TYPE_B",
    "Master in Hospital Management": "TYPE_B",

    "B.Sc.(Anesthesia Technology)" : "TYPE_C",
    "B.Sc. ( Dialysis Therapy Technology)" : "TYPE_C",
    "B.Sc. (Cardiovascular Technology)" : "TYPE_C", 
    "B.Sc. (Emergency & Trauma Care Technology)" : "TYPE_C",
    "B.Sc. (Radiography & Imaging Technology)" : "TYPE_C",
    "B.Sc. (Medical Laboratory Technology)" : "TYPE_C", 
    "B.Sc. (Neuro Technology)" : "TYPE_C", 
    "B.Sc. (Perfusion Technology)" : "TYPE_C", 
    "B.Sc. (Radiation Therapy Technology)" : "TYPE_C", 
    "B.Sc. (Respiratory Therapy Technology)" : "TYPE_C", 
    "B.Sc. (Transfusion Medicine)" : "TYPE_C",

    "Master of Physiotherapy in Musculoskeletal Sciences" : "TYPE_A",
    "Master of Physiotherapy in Neurosciences" : "TYPE_A",
    "Master of Physiotherapy in Cardio-vascular & Pulmonary Sciences" : "TYPE_A",
    
    "Postgraduate Diploma in Nuclear Medicine Technology": "TYPE_D",
    "M.Sc. Program in Genetic Counselling": "TYPE_E",
};

// Define content patterns for different certificate types
const contentPatterns = {
    TYPE_A: {
        main: "has qualified for",
        examLine: "having passed the said Degree",
        internship: false,
        division: false
    },

    TYPE_B: {
        main: "has qualified for",
        examLine: "having passed the said Degree",
        internship: true,
        internshipText1: "and satisfactorily completed",
        internshipText2: "the six-months compulsory internship"
    },
    TYPE_C: {
        main: "has qualified for",
        examLine: "having passed the said Degree",
        internship: true,
        internshipText1: "and satisfactorily completed",
        internshipText2: "the one year compulsory internship",
        division: true,
        divisionText: "and placed in "
    },

    TYPE_D: {
        main: "has been duly admitted to the",
        examLine: "having passed in the Final Examinations",
        internship: false
    },

    TYPE_E: {
        main: "has qualified for",
        examLine: "having passed the said Degree",
        internship: false,
        division: true,
        divisionText: "and placed in "
    }
};

module.exports = {contentPatterns, courseContentMap}