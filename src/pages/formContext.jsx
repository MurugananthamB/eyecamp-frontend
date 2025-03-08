import React, { createContext, useState } from "react";

// Create context
export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    fatherOrCO: "",
    attenderName: "",
    attenderMobile: "",
    sex: "Male",
    age: "",
    mobile: "",
    address: "",
    district: "",
    otherDistrict: "",
    email: "",
    visualRight: "",
    visualLeft: "",
    ownGlasses: "",
    procedureName: "",
    surgeonName: "",
    diagnosis: "",
    registrationDateTime: "",
    otInDateTime: "",
    surgeryDate: "",
    surgeryPlace: "Melmaruvathur",
    operatedEye: "",
    registrationDatetime: "",
    otDatetime: "",
    followPlace: "Melmaruvathur",
    ownGlasses: "No",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
