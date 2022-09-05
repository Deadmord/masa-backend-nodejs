import { config, Connection, ConnectionPool } from "mssql";
import { SqlClient } from "msnodesqlv8";

interface ISchoolService {
    getBoardTypes(): string;
}

export class SchoolService implements ISchoolService {
    public getBoardTypes(): string {

        const sql: SqlClient = require("msnodesqlv8");

        const connectionString: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
        const query: string = "SELECT * FROM white_board_type";

        sql.open(connectionString,  (err, conn) => {
            conn.query(query, (err, result) => {
                console.log(result);
            })
        });
        // sql.open(connectionString, (err: Error, connection: Connection) => {
            // if (error) {
            //     console.error(error);
            // }
            // else {
            //     connection.execute(query, (err: any, rows) => {
            //         console.log(rows);
            //     });
            // }
        // });

        // const config: config = {
        //     driver: 'msnodesqlv8',
        //     server: 'localhost',
        //     database: 'masa_school',
        //     options: {
        //         trustedConnection: true,
        //         useUTC: true
        //     }
        // };

        // sql.connect(config).then((pool: ConnectionPool) => {
        //     // Query
        //     return pool.request()
        //         .query(query)
        // }).then((result: any) => {
        //     console.log(result)
        // }).catch((err: any) => {
        //     console.error(err);
        // });

        return "getBoardTypes";
    }
}