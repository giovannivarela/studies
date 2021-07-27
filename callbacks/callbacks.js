function callbackTest (a, b, c, callback) {
  console.log("Entrei na primeira callback")
    let d = 0;
    let e = 0;
    let f = 0;

  try {
    if(typeof(a) != 'number')
      throw new Error('Wrong input');

    d = a - a;
    e = b + b;
    f = c + c;
  } catch (e) {
      throw e;
  }

  callback(null, d, e, f);
}

function callbackTest2 (err, d, e, f, callback) {
  console.log("Entrei na segunda callback");
  callback(null, d, e, f);
}

function finalCallback(err, d, e, f){
  if(err) {
    console.log("Falha", err);
  } else {
    console.log("Sucesso?", d, e, f);
  }
}

callbackTest (1, 2, 3, (err, d, e, f) => callbackTest2(err, d, e, f, finalCallback));
callbackTest ('a', 2, 3, (err, d, e, f) => callbackTest2(err, d, e, f, finalCallback));
