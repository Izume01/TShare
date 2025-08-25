#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
import { createServer } from "../core/server.js";
import { createClient } from "../core/client.js";

program
  .name("TShare")
  .description("Terminal-based P2P file sharing")
  .version("0.0.1");

program
  .command("share <file_path>")
  .description("Send a file to a peer")
  .option("--to <peerId>", "Recipient peer ID")
  .option("--encrypt", "Encrypt the file")
  .option("--compress", "Compress the file")
  .action((file_path, Option) => {
    console.log(file_path, Option);
  });

program
  .command("download <file_id>")
  .description("Downlaod a file from a peer")
  .option("--from <peer_id>" , "Source peer ID")
  .option('--resume', 'Resume interrupted transfer')
  .action((fileId, options) => {
    console.log(fileId, options);
  });

program
  .command('peers')
  .description('List all connected/discovered peers')
  .option('--lan', 'Show LAN peers')
  .option('--tracker', 'Show tracker peers')
  .action((options) => {
    console.log(options);
  });

program
  .command('recieve')
  .description('Recieve a File')
  .option("--host <ip>" , "Enter the IP")
  .option("--port <number>" , "Enter the port")
  .action((options) => {
    createClient(options.host , options.port)
  })

program
  .command('start')
  .description('Start your peer server')
  .option('--port <number>', 'Port to listen on', '5000')
  .action((options) => {
    createServer(options.port)
  });

program.parse(process.argv);
