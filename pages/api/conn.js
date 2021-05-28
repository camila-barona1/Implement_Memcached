let Memcached = require("memcached");
let memcached = new Memcached(`localhost:${process.env.PORT}`);

export default memcached;
