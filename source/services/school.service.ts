//import { config, Connection, ConnectionPool } from "mssql";
import { Connection, SqlClient, Error } from "msnodesqlv8";
import { ErrorCodes } from "../constants";
import { systemError, whiteBoardType } from "../entities";

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}
interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
}

export class SchoolService implements ISchoolService {
    
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve , reject) => {
            const result: whiteBoardType[] = [];
            const sql: SqlClient = require("msnodesqlv8");
    
            const connectionString: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
            const query: string = "SELECT * FROM white_board_type";
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                if(connectionError !== null) {
                    const error: systemError = {
                        code: ErrorCodes.ConnectionError,
                        message: "SQL server connection error"
                    }
                    reject(error);
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {  
                        if (queryResult !== undefined) {
                            queryResult.forEach((whiteBoardType: localWhiteBoardType) => {
                                result.push(
                                    this.parseLocalWhiteBoardType(whiteBoardType)
                                ); 
                            });
                        }
                        resolve(result);
                    })
                }
            });
        });
    }

    private parseLocalWhiteBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type
        };
    }
}


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