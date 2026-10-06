import mysql from "mysql2/promise";

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "malon123",
    database: "taskflow",
    port: 3306
});

export default conexion;