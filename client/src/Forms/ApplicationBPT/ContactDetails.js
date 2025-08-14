import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

  const ContactDetails = () => {
  const [familyDetails, setFamilyDetails] = useState([
    { relation: 'Father', name: '', age: '', occupation: '', income: '' },
    { relation: 'Mother', name: '', age: '', occupation: '', income: '' },
    { relation: 'Spouse', name: '', age: '', occupation: '', income: '' }
  ]);

  const [formData, setFormData] = useState({
    correspondence: { address: '', country: '', state: '', district: '', pinCode: '', mobile: '', email: '' },
    permanent: { address: '', country: '', state: '', district: '', pinCode: '', mobile: '', email: '', fatherEmail: '' },
    otherInfo: ''
  });

  const navigate = useNavigate();
    const familyFields = [
    { name: 'name', label: 'Name' },
    { name: 'age', label: 'Age (in years)' },
    { name: 'occupation', label: 'Occupation' },
    { name: 'income', label: 'Gross Monthly Income (Rs.)' }
  ];


  const addressFields = [
    { section: 'correspondence', label: 'Address', name: 'address' },
    { section: 'correspondence', label: 'Country', name: 'country' },
    { section: 'correspondence', label: 'State', name: 'state' },
    { section: 'correspondence', label: 'District', name: 'district' },
    { section: 'correspondence', label: 'Pin Code', name: 'pinCode' },
    { section: 'correspondence', label: 'Mobile No.', name: 'mobile' },
    { section: 'correspondence', label: 'Email ID', name: 'email' },
    { section: 'permanent', label: 'Address', name: 'address' },
    { section: 'permanent', label: 'Country', name: 'country' },
    { section: 'permanent', label: 'State', name: 'state' },
    { section: 'permanent', label: 'District', name: 'district' },
    { section: 'permanent', label: 'Pin Code', name: 'pinCode' },
    { section: 'permanent', label: 'Mobile No.', name: 'mobile' },
    { section: 'permanent', label: 'Email ID', name: 'email' },
    { section: 'permanent', label: "Father's Email ID", name: 'fatherEmail' }
  ];


  const handleAddressChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleFamilyChange = (index, field, value) => {
    const updated = [...familyDetails];
    updated[index][field] = value;
    setFamilyDetails(updated);
  };

  const handleNext = () => { 
      // addressData: formData,
      // familyDetails: familyDetails
  
    navigate('/inter');
  };
  
return (
  <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
    
    <Typography variant="h6" gutterBottom>Details of Parents / Spouse</Typography>
    {familyDetails.map((person, index) => (
      <Box key={index} sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>{person.relation}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {familyFields.map(({ name, label }) => (
            <TextField
              key={`${index}-${name}`}
              label={`${person.relation} ${label}`}
              value={person[name]}
              onChange={(e) => handleFamilyChange(index, name, e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
          ))}
        </Box>
      </Box>
    ))}

    <Typography variant="h6" gutterBottom>Correspondence Address</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      {addressFields.filter(f => f.section === 'correspondence').map(({ label, name, section }) => (
        <TextField
          key={`${section}-${name}`}
          label={label}
          value={formData[section][name]}
          onChange={(e) => handleAddressChange(section, name, e.target.value)}
          size="small"
        />
      ))}
    </Box>

    <Typography variant="h6" gutterBottom>Permanent Address</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      {addressFields.filter(f => f.section === 'permanent').map(({ label, name, section }) => (
        <TextField
          key={`${section}-${name}`}
          label={label}
          value={formData[section][name]}
          onChange={(e) => handleAddressChange(section, name, e.target.value)}
          size="small"
        />
      ))}
    </Box>

    <Typography variant="h6" gutterBottom>Other Details</Typography>
    <TextField
      label="Any Other Relevant Information"
      multiline
      rows={3}
      fullWidth
      size="small"
      value={formData.otherInfo}
      onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
      sx={{ mb: 4 }}
    />

    <Box sx={{ mt: 3, textAlign: 'right' }}>
      <Button variant="contained" onClick={handleNext}>Next</Button>
    </Box>
  </Box>
);

}

export default ContactDetails;
