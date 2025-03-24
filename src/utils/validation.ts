export const todoValidation = {
  required: "Task is required",
  minLength: {
    value: 3,
    message: "Task must be at least 3 characters",
  },
  pattern: {
    value: /^(?=.*[a-zA-Z])[\w\W]+$/,
    message:
      "Task must contain at least one letter and cannot consist only of numbers or symbols",
  },
};
