require('dotenv').config(); const fs=require('fs'); const path=require('path'); const db=require('./connection');
db.exec(fs.readFileSync(path.join(__dirname,'schema.sql'),'utf8'));
const categories=[['Học tập','#91B7C8','📚'],['Công việc','#E96F4B','✏️'],['Sức khỏe','#8EA993','🌱'],['Cá nhân','#DE8FA0','💌'],['Sáng tạo','#F5C86A','🎨'],['Khác','#C2A6C9','⭐']];
const add=db.prepare('INSERT OR IGNORE INTO categories(name,color,icon,is_default) VALUES(?,?,?,1)'); categories.forEach(x=>add.run(...x));
db.prepare("INSERT OR IGNORE INTO mascot_settings(id,updated_at) VALUES(1,?)").run(new Date().toISOString());
db.prepare("INSERT OR IGNORE INTO app_settings(key,value) VALUES('theme','cream')").run(); console.log('Database schema ready.'); db.close();
