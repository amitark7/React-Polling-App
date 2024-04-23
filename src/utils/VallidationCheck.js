export const ValidateForm = (userData) => {
  let formValid = true;
  const errors = {};

  if (!userData.email.trim()) {
    errors.email = "Email is required";
    formValid = false;
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = "Email is invalid";
    formValid = false;
  }

  if (!userData.password) {
    errors.password = "Password is required";
    formValid = false;
  }

  return { formValid, errors };
};
