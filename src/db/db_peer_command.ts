import Database from "better-sqlite3";
import type { peers } from "../types/type.js";

const db = new Database("mydb.sqlite");

const insertPeer = (peerInfo: peers) => {
	const stmt = db.prepare(`
        INSERT INTO peers (
            peer_id,
            id,
            port,
            last_seen
        ) VALUES (? , ? , ? , ?)
    `);

	stmt.run(peerInfo.peer_id, peerInfo.ip, peerInfo.port, peerInfo.last_seen);
};

// Update Data
const updatePeer = (
	peer_id: string,
	field: Partial<Omit<peers, "peer_id">>,
) => {
	const updates = Object.keys(field)
		.map((key) => `${key} = ?`)
		.join(", ");

	const values = Object.values(field);

	values.push(peer_id);

	const stmt = db.prepare(`UPDATE FROM peers SET ${updates} WHERE peer_id = ?`);
	stmt.run(...values);
};

// Query Data
const getAllPeer = () => {
	return db.prepare("SELECT * FROM peers").all();
};

// Delete Peer  by ID

const deletePeerByID = (peer_id: string) => {
	return db.prepare("DELETE FROM peer WHERE peer_id = ?").run(peer_id);
};

export default {
	deletePeerByID,
	updatePeer,
	getAllPeer,
	insertPeer,
};
