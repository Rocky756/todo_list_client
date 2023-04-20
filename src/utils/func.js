const validateEmail = (email) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};

const sanitizeString = (str) => {
  const scriptRegex = /<script\b[^<]*>((?!<\/script>)[\s\S])*<\/script>/gi;
  str = str.replace(scriptRegex, (match) => {
    return match.replace(/<\/?script[^>]*>/gi, '');
  });
  const attrRegex = /(\s|\\t)*(on[a-z]+|data|dynsrc|lowsrc|xmlns)\s*=\s*(['"]?)[\s\S]*?\1/gi;
  str = str.replace(attrRegex, '');

  return str;

};

export const validateAndSanitize = (data) => {
  const { name, email, text } = data;

  if (!name || !email || !text) {
    throw new Error('All fields must be filled');
  }

  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  const sanitizedData = {
    name: sanitizeString(name),
    email: sanitizeString(email),
    text: sanitizeString(text),
  };
  return sanitizedData;
};
