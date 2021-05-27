// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let Memcached = require("memcached");
let memcached = new Memcached(`localhost:${process.env.PORT}`);

let key;
let value;
let exptime;

export default (req, res) => {
  /********************
  Retrieval commands 
  *********************/
  //get
  let key_get = ""; //change to trigger the get command (this one MUST already be created)
  if (key_get) {
    memcached.get(key_get, function (error, data) {
      if (error || !data) {
        console.log("error getting");
        return;
      }
      console.log(`name: ${data}`);
      res.status(200).json({ value: data, key: key_get });
    });
  } else {
    res.status(200).json({ value: "data", key: "none" });
  }
  /*******************/

  //gets
  key = ""; //this one must already be created
  if (key) {
    memcached.gets(key, function (err, data) {
      if (err) {
        console.log("error - gets");
        return;
      }
      console.log(data.key);
      console.log(data.cas);
    });
  }

  /********************
  Storage commands 
  *********************/

  //add command
  key = ""; //change to trigger the add command
  value = ""; //change to trigger the add command
  exptime = 3600; //by deafult a hour

  if (key && value) {
    memcached.add(key, value, exptime, function (error) {
      if (error) {
        console.log("error adding");
        return;
      }
      console.log("name set");
    });
  }
  /*******************/

  //set command
  key = ""; //change to trigger the set command
  value = ""; //change to trigger the set command
  exptime = 3600; //by deafult a hour

  if (key && value) {
    memcached.set(key, value, exptime, function (error) {
      if (error) {
        console.log("error setting");
        return;
      }
      console.log("key set");
    });
  }
  /*******************/

  //replace command
  key = ""; //change to trigger the replace command
  value = ""; //change to trigger the replace command
  exptime = 3600; //by deafult a hour

  if (key && value) {
    memcached.replace(key, value, exptime, function (error) {
      if (error) {
        console.log("error replacing");
        return;
      }
      console.log("value replaced");
    });
  }
  /*******************/

  //append command
  key = ""; //change to trigger the append command
  value = ""; //change to trigger the append command

  if (key && value) {
    memcached.append(key, value, function (error) {
      if (error) {
        console.log("error append");
        return;
      }
      console.log("value appended");
    });
  }
  /*******************/

  //prepend command
  key = ""; //change to trigger the prepend command
  value = ""; //change to trigger the prepend command

  if (key && value) {
    memcached.prepend(key, value, function (error) {
      if (error) {
        console.log("error - prepend");
        return;
      }
      console.log("value prepended");
    });
  }
  /*******************/

  //cas command
  key = ""; //change to trigger the cas command
  value = ""; //change to trigger the cas command
  if (key && value) {
    memcached.gets(key, function (err, data) {
      memcached.cas(key, value, data.cas, 3600, function (err) {
        if (err) {
          console.log("error - cas");
          return;
        }
        console.log("done");
      });
    });
  }
};
