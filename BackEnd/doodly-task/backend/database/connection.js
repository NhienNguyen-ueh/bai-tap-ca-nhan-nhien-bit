const Database=require('better-sqlite3'); const path=require('path'); const fs=require('fs');
const file=process.env.DB_FILE?path.resolve(process.env.DB_FILE):path.join(__dirname,'doodly.sqlite'); fs.mkdirSync(path.dirname(file),{recursive:true});
const db=new Database(file); db.pragma('foreign_keys = ON'); db.pragma('journal_mode = WAL'); module.exports=db;
