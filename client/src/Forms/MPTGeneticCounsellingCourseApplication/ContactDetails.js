
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ContactDetails = () => {
  const [father, setFather] = useState({ name: '', age: '', occupation: '', income: '' });
  const [mother, setMother] = useState({ name: '', age: '', occupation: '', income: '' });
  const [spouse, setSpouse] = useState({ name: '', age: '', occupation: '', income: '' });

  const [formData, setFormData] = useState({
    application_no: "",   
    correspondence: { address: '', country: '', state: '', district: '', pinCode: '', mobile: '', email: '' },
    permanent: { address: '', country: '', state: '', district: '', pinCode: '', mobile: '', email: '', fatherEmail: '' },
    otherInfo: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName;

  const handleChange = (obj, setObj) => (field, val) =>
    setObj(prev => ({ ...prev, [field]: val }));

  const handleAddressChange = (section, field, val) =>
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: val } }));

  const toNumberOrNull = (val) => (val === '' ? null : Number(val));

  const handleNext = async () => {
    if (!formData.application_no) {
      alert("⚠️ Application Number is required.");
      return;
    }
  if (!father.name) {
      alert("⚠️ Father Name is required.");
      return;
    }
     if (!mother.name) {
      alert("⚠️ Mother Name  is required.");
      return;
    }
    const payload = {
      application_no: formData.application_no,
      father_name: father.name,
      father_age: toNumberOrNull(father.age),
      father_occupation: father.occupation,
      father_income: toNumberOrNull(father.income),

      mother_name: mother.name,
      mother_age: toNumberOrNull(mother.age),
      mother_occupation: mother.occupation,
      mother_income: toNumberOrNull(mother.income),

      spouse_name: spouse.name,
      spouse_age: toNumberOrNull(spouse.age),
      spouse_occupation: spouse.occupation,
      spouse_income: toNumberOrNull(spouse.income),

      corr_address: formData.correspondence.address,
      corr_country: formData.correspondence.country,
      corr_state: formData.correspondence.state,
      corr_district: formData.correspondence.district,
      corr_pin_code: formData.correspondence.pinCode,
      corr_mobile: formData.correspondence.mobile,
      corr_email: formData.correspondence.email,

      perm_address: formData.permanent.address,
      perm_country: formData.permanent.country,
      perm_state: formData.permanent.state,
      perm_district: formData.permanent.district,
      perm_pin_code: formData.permanent.pinCode,
      perm_mobile: formData.permanent.mobile,
      perm_email: formData.permanent.email,

      father_email: formData.permanent.fatherEmail,
      other_info: formData.otherInfo,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/master/contact_details", payload);
      console.log("✅ Saved:", res.data);
      navigate("/gceducation", { state: { courseName } });
    } catch (error) {
      console.error("❌ Error saving contact details:", error.response?.data || error.message);
    }
  };

  const renderPersonInputs = (person, onChange, label) => (
    <>
      <TextField
        label={label} 
        value={person.name}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[a-zA-Z\s]*$/.test(value)) onChange('name', value);
        }}
        size="small"
        fullWidth
        margin="dense"
      />
      <TextField
        label={`${label} Age (years)`}
        value={person.age}
        onChange={e => onChange('age', e.target.value)}
        size="small"
        fullWidth
        margin="dense"
        type="number"
      />
    </>
  );

  const renderAddressInputs = (section) => {
    const fields = [
      { label: 'Address', name: 'address' },
      { label: 'Country', name: 'country', type: 'alpha' },
      { label: 'State', name: 'state', type: 'alpha' },
      { label: 'District', name: 'district', type: 'alpha' },
      { label: 'Pin Code', name: 'pinCode', type: 'pincode' }, 
      { label: 'Mobile No.', name: 'mobile', type: 'mobile' },
      { label: 'Email ID', name: 'email', type: 'email' },
    ];

    if (section === 'permanent') {
      fields.push({ label: "Father's Email ID", name: 'fatherEmail', type: 'email' });
    }

    return fields.map(({ label, name, type }) => (
      <TextField
        key={`${section}-${name}`}
        label={label}
        value={formData[section][name] || ''}
        onChange={e => {
          const value = e.target.value;
          let isValid = true;

          if (type === 'alpha') isValid = /^[a-zA-Z\s]*$/.test(value);
          else if (type === 'pincode') isValid = /^[1-9][0-9]{0,5}$/.test(value) || value === '';
          else if (type === 'mobile') isValid = /^[1-9][0-9]{0,9}$/.test(value) || value === '';
          else if (type === 'numeric') isValid = /^[0-9]*$/.test(value);

          if (isValid) handleAddressChange(section, name, value);
        }}
        size="small"
        fullWidth
        margin="dense"
        type={type === 'email' ? 'email' : 'text'}
        inputProps={{
          maxLength: type === 'pincode' ? 6 : type === 'mobile' ? 10 : undefined
        }}
      />
    ));
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>Parents / Spouse Details</Typography>

      <TextField
        label="Application No"
        value={formData.application_no}
        onChange={(e) => setFormData(prev => ({ ...prev, application_no: e.target.value }))}
        size="small"
        fullWidth
        margin="dense"
        type="number"
      />

      <Box mb={3}>
        <Typography variant="h6">Father Name</Typography>
        {renderPersonInputs(father, handleChange(father, setFather), 'Father')}
      </Box>

      <Box mb={3}>
        <Typography variant="h6">Mother Name</Typography>
        {renderPersonInputs(mother, handleChange(mother, setMother), 'Mother')}
      </Box>

      <Box mb={3}>
        <Typography variant="h6">Spouse Name</Typography>
        {renderPersonInputs(spouse, handleChange(spouse, setSpouse), 'Spouse')}
      </Box>

      <Typography variant="h6" gutterBottom>Correspondence Address</Typography>
      <Box mb={3}>{renderAddressInputs('correspondence')}</Box>

      <Typography variant="h6" gutterBottom>Permanent Address</Typography>
      <Box mb={3}>{renderAddressInputs('permanent')}</Box>

      <TextField
        label="Other Relevant Information"
        multiline
        rows={3}
        fullWidth
        size="small"
        value={formData.otherInfo}
        onChange={e => setFormData(prev => ({ ...prev, otherInfo: e.target.value }))}
        margin="dense"
      />

      <Box textAlign="right" mt={2}>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default ContactDetails;
