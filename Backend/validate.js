import joi from 'joi';
const educationSchema = joi.object({
    graduation:joi.string().required().min(2).max(50),
    specialization:joi.string().required().min(20).max(500),
    university:joi.string().required().min(2).max(100),
    startingYear:joi.number().integer().required().min(1900).max(new Date().getFullYear()),
    endingYear:joi.number().integer().required().min(1900).greater(joi.ref('startingYear')) .messages({
      'number.greater': 'Ending year must be after starting year',}).max(new Date().getFullYear()),
});

const projectSchema=joi.object({
    title:joi.string().required().min(2).max(50),
    description:joi.string().required().min(20).max(500),
    skills:joi.string().required().min(2).max(100),
    githubLink:joi.string().required().min(5).max(100).uri(),
    startingDate:joi.date().required().min('1900-01-01').max(new Date()),
    endingDate:joi.date().required().min(joi.ref('startingDate')).messages({
      'date.min': 'Ending date must be after starting date',
    }),
});

const contactSchema=joi.object({
    name:joi.string().required().min(2).max(50),
    organisation:joi.string().required().min(2).max(100),
    mobileNo:joi.string().required().pattern(/^[0-9]{10}$/).messages({
      'string.pattern.base': 'Mobile number must be a 10-digit number',
    }),
    message:joi.string().required().min(10).max(200),
});
const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%]).*$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, #, %)'),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords must match',
    }),
});

export {educationSchema,projectSchema, contactSchema,userSchema};




