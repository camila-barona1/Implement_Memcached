// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import memcached from "./conn";

let key;
let value;
let exptime;

export default (req, res) => {
  /********************
  Retrieval commands 
  *********************/
  //get
  let key_get = req.body.name; //change to trigger the get command (this one MUST already be created)
  memcached.get(key_get, function (error, data) {
    if (error || !data) {
      console.log("error getting");
      res.status(200).json({ value: "data", key: "none" });
    } else {
      console.log(`name: ${data}`);
      res.status(200).json({ value: data, key: key_get });
    }
  });
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
  const expr = req.body.comamnds;
  console.log(expr);
  switch (expr) {
    //add command
    case "1":
      key = req.body.key; //change to trigger the add command
      value = req.body.value; //change to trigger the add command
      console.log(req.body.key);
      exptime = 3600; //by deafult a hour

      if (key && value) {
        memcached.add(key, value, exptime, function (error) {
          if (error) {
            console.log("error adding");
            return;
          }
          console.log("key added");
        });
      }
      break;
    /*******************/

    //set command
    case "2":
      key = req.body.key; //change to trigger the set command
      value = req.body.value; //change to trigger the set command
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
      break;
    /*******************/

    //replace command
    case "3":
      key = req.body.key; //change to trigger the replace command
      value = req.body.value; //change to trigger the replace command
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
      break;
    /*******************/

    //append command
    case "4":
      key = req.body.key; //change to trigger the append command
      value = req.body.value; //change to trigger the append command

      if (key && value) {
        memcached.append(key, value, function (error) {
          if (error) {
            console.log("error append");
            return;
          }
          console.log("value appended");
        });
      }
      break;
    /*******************/

    //prepend command
    case "5":
      key = req.body.key; //change to trigger the prepend command
      value = req.body.value; //change to trigger the prepend command

      if (key && value) {
        memcached.prepend(key, value, function (error) {
          if (error) {
            console.log("error - prepend");
            return;
          }
          console.log("value prepended");
        });
      }
      break;
    /*******************/

    //cas command
    case "6":
      key = req.body.key; //change to trigger the cas command
      value = req.body.value; //change to trigger the cas command
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
      break;
    default:
      console.log("choose");
  }
};
