const SunspecReader = require('../lib/sunspec-reader').SunspecReader;

const reader = new SunspecReader('192.168.96.100', 502);

reader.readInverterInfo()
  .then(() => {
    return reader.readData()
  })
  .then(d => {
    console.log(d);
      
  })
  .catch(err => {
    console.warn(err);
  })

setInterval(() => {
  reader.readData()
    .then(d => {
      console.log(d);
    });
}, 3000)
