#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

import { createClient } from "../core/client.js";
import { createServer } from "../core/server.js";

program
	.name("TShare")
	.description("Terminal-based P2P file sharing")
	.version("0.0.1");

program
	.command("peers")
	.description("List all connected/discovered peers")
	.option("--lan", "Show LAN peers")
	.option("--tracker", "Show tracker peers")
	.action((options) => {
		console.log(options);
	});

program
	.command("receive")
	.description("receive a File")
	.option("--host <ip>", "Enter the IP")
	.option("--port <number>", "Enter the port")
	.action((options) => {
		createClient(options.host, options.port);
	});

program
	.command("send")
	.description("Send a File")
	.requiredOption("--port <number>", "Port to listen on", "5000")
	.option("--folder <path>", "Path to the folder to send")
	.option("--encrypt", "Encrypt the files")
	.option("--compress", "Compress the files")
	.option("--chunk_size <number>", "Chunk size for file transfer", "1024")
	.option("--verify", "Verify checksum after transfer")
	.action((options) => {
		console.log(options);
		createServer(options.port, options);
	});

program
	.command("start")
	.description("Start your peer server")
	.option("--port <number>", "Port to listen on", "5000")
	.action((options) => {
		createServer(options.port);
	});

program.parse(process.argv);
