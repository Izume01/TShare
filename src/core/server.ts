import net from "node:net";
import type { option } from "../types/type.js";
import localIP from "../utils/getAddress.js";
import { getAllFiles } from "../utils/getAllFilesInFolder.js";

const host = localIP;
export function createServer(port: number, options?: option) {
	const files = [];
	// const _chunkSize = options?.chunk_size || 1024;
	if (options?.folder) {
		files.push(...getAllFiles(options?.folder));
	}

	const server = net.createServer((c) => {
		console.log(`[+] Client connected from ${c.remoteAddress}:${c.remotePort}`);

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

	server.listen(port, host, () => {
		console.log("Server listening on port 5000");
		console.log("Server running at Host : ", host);
	});
}
