"use strict";

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

  if(!Validator.isLength(data.name, { min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if(!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  if(Validator.isEmail(data.password)) {
    errors.password = 'Password is required';
  }

  if(!Validator.isLength(data.password_confirm, { min: 8, max: 30 })) {
    errors.password_confirm = 'Password must be between 8 and 30 characters';
  }

  if(!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Both passwords must match';
  }

  if(Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Must confirm password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}