import validator from "validator";

// Regular expression for password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

// Validation messages
const validationMessages = {
  name: "Name should be between 3 and 50 characters long",
  email: "Invalid email format",
  phone: "Invalid phone number format",
  password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  specialization: "Specialization should be between 3 and 50 characters long",
  experience: "Experience must be a number between 0 and 50",
  profilePic: "Profile picture must be a valid image URL",
  licensePic: "License picture must be a valid image URL",
  fees: "Fees must be a positive number",
};

// Validators
const nameValidator = (value: string) => {
  return validator.isLength(value, { min: 3, max: 50 });
};

const emailValidator = (value: string) => {
  return validator.isEmail(value);
};

const phoneValidator = (value: string) => {
  return validator.isMobilePhone(value);
};

const passwordValidator = (value: string) => {
  return passwordRegex.test(value);
};

const specializationValidator = (value: string) => {
  return validator.isLength(value, { min: 3, max: 50 });
};

const experienceValidator = (value: number) => {
  return Number.isInteger(value) && value >= 0 && value <= 50;
};

const profilePicValidator = (value?: string) => {
  return !value || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
};

const licensePicValidator = (value?: string) => {
  return !value || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
};

const feesValidator = (value?: number) => {
  return value === undefined || (typeof value === "number" && value > 0);
};

// Doctor validators object
export const doctorValidators = {
  name: {
    validator: nameValidator,
    message: validationMessages.name,
  },
  email: {
    validator: emailValidator,
    message: validationMessages.email,
  },
  phone: {
    validator: phoneValidator,
    message: validationMessages.phone,
  },
  password: {
    validator: passwordValidator,
    message: validationMessages.password,
  },
  specialization: {
    validator: specializationValidator,
    message: validationMessages.specialization,
  },
  experience: {
    validator: experienceValidator,
    message: validationMessages.experience,
  },
  profilePic: {
    validator: profilePicValidator,
    message: validationMessages.profilePic,
  },
  licensePic: {
    validator: licensePicValidator,
    message: validationMessages.licensePic,
  },
  fees: {
    validator: feesValidator,
    message: validationMessages.fees,
  },
};
