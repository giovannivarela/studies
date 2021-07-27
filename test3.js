const ERROR_INFO = {
  500: "SOMETHING"
}

function extractError({code, text, level}) {
  return { errorCode: code, message: text, warning: level};
}

function informError(errorObject) {
  let {errorCode} = errorObject;
  let info = ERROR_INFO[errorCode];

  return { ...errorObject, info};
}

let testError = {
  code: 500,
  text: "Unknow",
  server: "www.xyz",
  time: 23094038,
  level: "FATAL"
};

let result = informError(extractError(testError));
console.log(result);