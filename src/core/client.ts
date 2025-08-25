import net from "node:net";
import process from "node:process";

process.stdin.setEncoding("utf-8");

export function createClient(host: string, port: number) {
	const client = net.createConnection({ port, host }, () => {
		console.log("Connected to server!");
		console.log("Type messages and press Enter to send:");
	});

	client.setEncoding("utf-8");

	client.on("data", (data) => {
		console.log(`\x1b[36mServer:\x1b[0m ${data}`);
	});

	client.on("end", () => {
		console.log("Disconnected from server");
		process.exit(0);
	});

	client.on("error", (err) => {
		console.error("Connection error:", err);
	});

	process.stdin.on("data", (input) => {
		process.stdout.write(`\x1b[33mYou:\x1b[0m ${input}`);
		client.write(input);
	});
}
