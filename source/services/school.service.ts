import { Connection, SqlClient, Error } from "msnodesqlv8";
import { whiteBoardType } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helper";

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
}

export class SchoolService implements ISchoolService {
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve , reject) => {
            const result: whiteBoardType[] = [];
            const sql: SqlClient = require("msnodesqlv8");
    
            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.WhiteBoardTypes;
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                //If server doesnt work
                if(connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {  
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: whiteBoardType[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(whiteBoardType => {
                                    result.push(
                                        this.parseLocalWhiteBoardType(whiteBoardType)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    public getBoardType(id: number): Promise<whiteBoardType> {
        let result: whiteBoardType;
        return new Promise<whiteBoardType>((resolve, reject) => {

            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.WhiteBoardTypeById;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalWhiteBoardType(queryResult[0])
                            }
                            else if (queryResult !== undefined && queryResult.length === 0) {
                                //TO DO: Not Found 
                            }
                            resolve(result);
                        }
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