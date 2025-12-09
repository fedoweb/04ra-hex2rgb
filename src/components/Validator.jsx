const Validator = (hex) => {
  const hexRegex = /^#([0-9A-Fa-f]{6})$|^[0-9A-Fa-f]{6}$/;
  return hexRegex.test(hex);
};


export default Validator;