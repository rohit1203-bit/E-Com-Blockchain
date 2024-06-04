exports.handleErr = (res, err) => {
  const errors = { email: "", password: "", name: "", lastName: "", others: "" };

  switch (err.message) {
    case "Incorrect Email":
      res.statusCode = 401;
      errors.email = "Incorrect Email";
      break;
    case "Incorrect password":
      res.statusCode = 401;
      errors.password = "Incorrect password";
      break;
    case "Invalid Email":
      res.statusCode = 400;
      errors.email = "Invalid Email";
    case "Invalid password":
      res.statusCode = 400;
      errors.password = "min length 6";
    case "Unauthorized":
      console.log("Inside switch")
      res.statusCode = 401;
      errors.others = "Unauthorized"
    default:
      res.statusCode = 500
      errors.others = err.message
  }

  if (err.code === 11000) {
    res.statusCode = 409;
    errors.email = "That email is Already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    res.statusCode = 400;
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};