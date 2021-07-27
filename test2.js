const messageFactory = (errorCode = 500,
  message = "Unknow",
  severity = "FATAL") => {
    return Object.freeze({
      report: () => `${severity} ${errorCode}: ${message}`
    });
  };

const warning = (factory) => {
  return (errorCode, message) => factory(errorCode, message, "WARNING");
};

const warningFactory = warning(messageFactory);

console.log(messageFactory(401, "Unauthorized").report());
console.log(warningFactory(455, "Disc").report());