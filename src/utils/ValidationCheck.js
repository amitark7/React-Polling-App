export const validateForm = (userData, isLogin = false) => {
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
    if (userData.firstName.trim() === "" || userData.firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters.";
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
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(userData.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit";
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

export const validateAddEditForm = (data) => {
  const newErrors = { title: "", optionTitle: "" };
  let isVallid = true;

  if (data.title?.trim() === "" || data.title?.length < 10) {
    newErrors.title = "Question must be at least 10 characters long";
    isVallid = false;
  }

  if (data.optionTitle?.trim() === "") {
    newErrors.optionTitle = "Option must not be empty";
    isVallid = false;
  }

  if (data.options?.length < 2) {
    newErrors.optionTitle = "There must be at least two options";
    isVallid = false;
  }

  return { newErrors, isVallid };
};
