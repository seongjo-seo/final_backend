/* mysql db 등록 호스트, 루트 번호, 계정 이름, 비밀번호, db 스키마 이름*/

const mysql = require('mysql')
const db_info = {
  host: 'localhsot',
  prot: '3306',
  user: 'root',
  password: '1234',
  databse: 'petandpet',
}

module.exports = {
  init: function () {
    return mysql.createConnection(petandpet)
  },
  connet: function (conn) {
    conn.connet(function (err) {
      if (err) console.error('mysql connection error :' + err)
      else console.log('mysql is connected successfully!')
    })
  },
}
