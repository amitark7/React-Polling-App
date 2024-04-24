export const ValidateForm = (userData, isLogin = false) => {
  let isValid = true;
  const errors = {};

  if (isLogin) {
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
  } else {
    if (userData.firstName.length < 6) {
      errors.firstName = "First name must be at least 6 characters.";
      isValid = false;
    }

    if (!userData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!userData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!userData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!userData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!userData.roleId) {
      errors.roleId = "Role is required";
      isValid = false;
    }
  }
  return { isValid, errors };
};
