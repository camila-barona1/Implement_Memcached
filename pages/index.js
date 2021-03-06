import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  console.log(data);
  let value = data.value;
  let key = data.key;

  const temp_value =
    typeof window !== "undefined" ? localStorage.getItem("temp_value") : null;

  const temp_key =
    typeof window !== "undefined" ? localStorage.getItem("temp_key") : null;

  const getKey = async (event) => {
    // event.preventDefault();
    const res = await fetch("/api/memcached", {
      body: JSON.stringify({
        name: event.target.name.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
    if (result.value === "data" || result.key === "none") {
      alert("Key no created");
    }

    localStorage.setItem("temp_value", result.value);
    localStorage.setItem("temp_key", result.key);
    location.reload();
  };

  const addKeyValue = async (event) => {
    // event.preventDefault();
    const res = await fetch("/api/memcached", {
      body: JSON.stringify({
        key: event.target.key.value,
        value: event.target.value.value,
        comamnds: event.target.comamnds.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    // console.log(result);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h4 className={styles.title}>Nextjs + Memcached</h4>

        <p className={styles.description}>Next js with memcached</p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>
              {temp_key ? temp_key : key} &rarr;{" "}
              {temp_value ? temp_value : value}
            </h2>
            <p>
              Representation of the{" "}
              <b>
                <em>key</em>
              </b>{" "}
              and the{" "}
              <b>
                <em>value</em>
              </b>
            </p>
          </a>
        </div>
        <form onSubmit={getKey}>
          <label htmlFor="name">Key </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
          <button type="submit">Search</button>
        </form>
        <small>
          {" "}
          <b>Get</b> the <b>key</b> that you just create
        </small>
        <br />
        <p>
          Make sure you have already installed <b>memcached</b>, listening to
          port <b>11211</b> in localhost and the connection type is{" "}
          <b>telnet</b>
        </p>
        <form
          onSubmit={addKeyValue}
          style={{
            margin: "0.3rem",
            padding: "1rem",
            textAlign: "center",
            border: "2px solid #ccc",
          }}
        >
          <div style={{ paddingBottom: "10px" }}>
            <b>Try out the Storage Commands</b>
          </div>
          <label htmlFor="key">Key </label>
          <input id="key" name="key" type="text" autoComplete="key" required />
          <label htmlFor="value"> Value </label>
          <input
            id="value"
            name="value"
            type="text"
            autoComplete="value"
            required
          />
          <br />
          <label style={{ color: "red", fontWeight: "bold" }} htmlFor="comamnd">
            Choose a command:
          </label>
          &nbsp;
          <select name="comamnds" id="comamnds" required>
            <option value="">Select command:</option>
            <option value="1" required>
              Add
            </option>
            <option value="2">Set</option>
            <option value="3">Replace</option>
            <option value="4">Append</option>
            <option value="5">Prepend</option>
            <option value="6">Cas</option>
          </select>
          <div></div>
          <br />{" "}
          <div>
            <button type="submit">Submit</button>
          </div>
          <small>
            If you want to see the changes please make sure to <b>search</b> for
            the
            <b> key again</b>
          </small>
        </form>

        <p>
          You can find the implementation of the commands in
          <code className={styles.code}>pages/api/memcached.js</code>
        </p>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:3000/api/memcached");
  const data = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}
