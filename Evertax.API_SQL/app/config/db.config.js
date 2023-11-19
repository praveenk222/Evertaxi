// const  config = {
//   user:  'sa', // sql user
//   password:  '12456789', //sql user password
//   server:  'DESKTOP-R6CQIMS\\PRIYA', // if it does not work try- localhost
//   database:  'appify',
//   options: {
//     trustedconnection:  true,
//     enableArithAbort:  true,
//     instancename:  'SQLEXPRESS'  // SQL Server instance name
//   },
// }
const  config = {
  user:  'db_9f30c5_appify_admin', // sql user
  password:  'Adm1n1$tr@t0r', //sql user password
  server:  'SQL5109.site4now.net', // if it does not work try- localhost
  database:  'db_9f30c5_appify',
  options: {
    trustedconnection:  true,
    enableArithAbort:  true,
    instancename:  'SQLEXPRESS'  // SQL Server instance name
  },
}

module.exports = config;