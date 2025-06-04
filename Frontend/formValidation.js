import * as yup from 'yup';

const educationSchema = yup.object().shape({
    graduation:yup.string().required().min(2).max(50),
    specialization:yup.string().required().min(20).max(500),
    university:yup.string().required().min(2).max(100),    
    startingYear:yup.number().integer().required().min(1900).max(new Date().getFullYear()),
    endingYear:yup.number().required().integer().min(1900).max(new Date().getFullYear()).moreThan(yup.ref('startingYear'), 'Ending year must be after starting year'),
});

const projectSchema = yup.object().shape({
    title:yup.string().required().min(2).max(50),
    description:yup.string().required().min(20).max(500),
    skills:yup.string().required().min(2).max(100),
    githubLink:yup.string().required().url(),
    startingDate:yup.date().required().min('1900-01-01').max(new Date()),
    endingDate:yup.date().required().min(yup.ref('startingDate')),
});

const contactSchema = yup.object().shape({
    name:yup.string().required().min(2).max(50),
    organisation:yup.string().required().min(2).max(100),
    mobileNo:yup.string().required().matches(/^[0-9]{10}$/, 'Mobile number must be a 10-digit number'),
    message:yup.string().required().min(10).max(200),
});

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$#%]/, 'Password must contain at least one special character (@, $, #, %)'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

export  {educationSchema,projectSchema, contactSchema,userSchema};