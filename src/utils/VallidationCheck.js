export const ValidateForm = (userData) => {
  let isValid = true;
  const errors = {};

  if (!userData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = "Email is invalid";
    isValid = false;
  }

  if (!userData.password) {
    errors.password = "Password is required";
    isValid = false;
  }
  return { isValid, errors };
};
