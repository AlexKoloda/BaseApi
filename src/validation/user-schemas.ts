import { string, object } from 'yup';

export const createUserSchema = object({
  email: string()
    .email('Email must be with ex@ex.com')
    .required('Email must be require'),
  password: string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password must be require'),
});

export const signInSchema = object({
  email: string()
    .email('Email must be with ex@ex.com')
    .required('Email must be require'),
  password: string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password must be require'),
});

export const idSchema = object({
  id: string()
    .min(1, 'Id must be more than 1 characters')
    .required('Id must be require'),
});

export const updateUserSchema = object({
  id: string()
    .min(1, 'Id must be more than 1 characters'),
  name: string()
    .min(1, 'Name must be more than 1 characters'),
  email: string()
    .email('Email must be with ex@ex.com'),
  avatar: string()
});

export const updateUserPhoto = object({
  avatar: string(),
});

export const updatePasswordSchema = object({
  oldPassword: string()
  .min(6, 'Password must be more than 6 characters')
  .required('Old password must be require'),
  newPassword: string()
  .min(6, 'Password must be more than 6 characters')
  .required('New password must be require'),
  passwordReplay: string()
  .min(6, 'Password must be more than 6 characters')
})
