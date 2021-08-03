const cluster = require('cluster');
const numCPUs = require('os').cpus();
const net = require('net');

console.log('Code Started');

function killWorker(worker) {
  worker.send('shutdown');
  worker.disconnect();
  timeout = setTimeout(() => {
    worker.kill();
  }, 2000);
}

if(cluster.isMaster) {
  console.log('I am the master, lauching workers!');

  for(let i = 0; i < numCPUs.length; i++) {
    let worker = cluster.fork();

    worker.on('listening', (address) => killWorker(worker));
  }
} else {
  console.log(`#${cluster.worker.id}: I am a fork!`);
  const server = net.createServer((socket) => {});

  server.listen(8000);
  console.log(`#${cluster.worker.id}: Server opened`)

  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      server.close();
      console.log(`#${cluster.worker.id}: Server ended`);
    }
  });
}

console.log('Code ended');