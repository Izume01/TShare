import Database from "better-sqlite3";
import crypto from "crypto";
import type { transfers } from "../types/type.js";

const db = new Database("mydb.sqlite");

// Insert transfer info
const insertTransfer = (transferInfo: transfers) => {
  const stmt = db.prepare(`
    INSERT INTO transfers (
      id,
      file_name,
      file_size,
      peer_id,
      total_chunks,
      received_chunks,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    crypto.randomUUID(), 
    transferInfo.file_name,
    transferInfo.file_size,
    transferInfo.peer_id,
    transferInfo.total_chunks,
    transferInfo.received_chunks,
    transferInfo.status
  );
};

// Query Data
const getTransferById = (id : string) => {
    return db.prepare("SELECT * FROM transfers WHERE id=?").get(id)
}

const getAllTransfer = () => {
    return db.prepare("SELECT * FROM transfer").all()
}

// Update Transfer
const updateTransfer = (
    id : string , 
    field : Partial<Omit<transfers  , "id">>
) => {
    const updates = Object.keys(field)
        .map((key) => `${key} = ?`)
        .join(", ");
    
    const values  = Object.values(field)

    values.push(id)

    const stmt = db.prepare(`UPDATE FROM transfers SET ${updates} WHERE id = ?`)
    stmt.run(...values)
}


// Delete Transfer
const deleteTransferByID = (id : string) => {
    return db.prepare("DELETE FROM transfers WHERE id = ?").run(id)
}


export default {
  insertTransfer,
  getTransferById,
  getAllTransfer,
  updateTransfer,
  deleteTransferByID
};


