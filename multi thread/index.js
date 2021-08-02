const crypto = require('crypto');
const start = Date.now();

//This test was performed on an 4 core intel cpu

/*
The function logHashTime uses the node crypto module to create a hash just to test the libuv multithread
characteristic. If node was really single thread the times would have been a somatory of the last plus
the time to complete the new task. In this scenario the tasks take the same time what indicates that SO
operation are concurrently on the cpu cores, wich gives us the multi threaded model libuv implements.
*/

function logHashTime() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", Date.now() - start);
  });
}

logHashTime();
logHashTime();
logHashTime();
logHashTime();
// logHashTime();
/*
  If we ant to call a fifth time the function the results would be interesting because the first four
  would roughly be the same and the last one would be somewhat double the time of the first. This indicates
  that libuv created 5 threads for the 4 core cpu I am using and had to wait one of the four to finish to
  launch the fifth.
*/