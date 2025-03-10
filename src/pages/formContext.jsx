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
    // registrationDatetime: "",
    otDateTime: "",
    followPlace: "Melmaruvathur",
    ownGlasses: "No",
    referredBy: "Camp",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
