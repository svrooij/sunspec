# SunSpec interface

[![Support me on Github][badge_sponsor]][link_sponsor]
[![npm][badge_npm]][link_npm]
[![github issues][badge_issues]][link_issues]
[![Run tests from package.json][badge_build]][link_build]
[![semantic-release][badge_semantic]][link_semantic]

Sunspec is a specification to communicate with your solar power inverter. See [specs](https://www.solaredge.com/sites/default/files/sunspec-implementation-technical-note.pdf).

You can use this library to read the data from your inverter supporting modbus tcp (like SolarEdge).

```JavaScript
const SunspecReader = require('@svrooij/sunspec').SunspecReader;

const reader = new SunspecReader('192.168.x.x', 502);
reader.readInverterInfo() // Reads model info (only needed once)
  .then(() => {
    return reader.readData() // Read other data
  })
  .then(d => {
    console.log(d);
  })
  .catch(err => {
    console.warn(err);
  })
```

## Tested on

|Manufacturer|Model|Tested on|Tested by|
|------------|-----|---------|---------|
|SolarEdge|SE3680|2020-05-30|[@svrooij](https://github.com/svrooij)|

Send a PR, if you tested this on your inverter.

## Developer stuff

This library is written in TypeScript. You'll need to compile it before you can run.

```bash
npm install
npm run compile
```

[badge_sponsor]: https://img.shields.io/badge/Sponsor-on%20Github-red
[badge_issues]: https://img.shields.io/github/issues/svrooij/sunspec
[badge_npm]: https://img.shields.io/npm/v/@svrooij/sunspec
[badge_semantic]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[badge_build]: https://github.com/svrooij/sunspec/workflows/Run%20tests%20from%20package.json/badge.svg

[link_build]: https://github.com/svrooij/sunspec/actions
[link_sponsor]: https://github.com/sponsors/svrooij
[link_issues]: https://github.com/svrooij/sunspec/issues
[link_npm]: https://www.npmjs.com/package/@svrooij/sunspec
[link_semantic]: https://github.com/semantic-release/semantic-release