import fs from 'fs'
import Database from 'better-sqlite3'

const db = new Database('mydb.sqlite')
const sql = fs.readFileSync('schema.sql' , 'utf-8')

db.exec(sql)

console.log("DB is been Initialized");

db.close()
