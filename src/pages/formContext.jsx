import React, { createContext, useState } from "react";

// Create context
export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    
    patientName: "",
    fatherOrCO: "",
    attenderName: "",
    attenderMobile: "",
    gender: "Male",
    age: "",
    mobile: "",
    address: "",
    district: "CHENGALPET",
    otherDistrict: "",
    email: "",
    visualRight: "",
    visualLeft: "",
    procedureName: "",
    surgeonName: "",
    diagnosis: "",
    registrationDateTime: "",
    surgeryDate: "",
    surgeryPlace: "Melmaruvathur",
    operatedEye: "",
    otDateTime: "",
    ownGlasses: "No",
    finalDiagnosis: "",
    selectedMedications: [],
    dateOfDischarge: "", // ✅ Added missing field for discharge date
    others: "", // ✅ Added missing field for additional details
    firstVisit: "", // ✅ Added missing field for 1st follow-up visit
    secondVisit: "", // ✅ Added missing field for 2nd follow-up visit
    followPlace: "Melmaruvathur", // Already present, ensured no duplication
    referredBy: "Camp", // ✅ Added missing field for referral source
    regNo: "", // ✅ Added missing field for registration
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
