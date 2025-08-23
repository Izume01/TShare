import net from "node:net";

const server = net.createServer((c) => {
  console.log("\x1b[33mClient:\x1b[0m  Connected");

  c.setEncoding("utf-8");

  c.on("data", (data) => {
    console.log("\x1b[33mClient:\x1b[0m :", data);
  });

  process.stdin.on("data", (input) => {
    process.stdout.write(`\x1b[33mYou:\x1b[0m ${input}`);
    c.write(input);
  });

  c.on("end", () => {
    console.log("\x1b[33mClient:\x1b[0m  Disconnected");
  });

  c.on("error", (err) => {
    console.log("Socket Error:", err);
  });

  c.write("Welcome to this TCP Server\n");
});

server.on("error", (err) => {
  console.error("Server Error:", err);
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
