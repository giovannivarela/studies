const cluster = require('cluster');
const numCPUs = require('os').cpus();
const crypto = require('crypto');
const start = Date.now();

function logHashTime() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", Date.now() - start);
  });
}

if(cluster.isMaster) {
  console.log('I am the master, lauching workers!');

  for(let i = 0; i < numCPUs.length; i++) cluster.fork();
} else {
  /*
    What if the function is called in a cluster?
    The results are very interesting as the time for the 16 calls being completed are roughly the same and
    much higher than the previous tests. This behaviour indicates that in a cluster the libuv tries to execute
    all the threads at the same time, delegating the management to the SO, wich gives all the threads equal
    time to complete.
    This happens because each worker in the cluster create a thread pool of 4 threads to execute their actions
    and when all those threads get in the SO the scheduler tries to accommodate everyone. In the other example
    that would not happen because there where only one process, so 4 threads.
  */
  console.log('I am a fork!');
  logHashTime();
  logHashTime();
  logHashTime();
  logHashTime();
}