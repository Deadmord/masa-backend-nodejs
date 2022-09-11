import { Connection, SqlClient, Error } from "msnodesqlv8";
import { DB_CONNECTION_STRING, ErrorCodes, ErrorMessage, Queries } from "../constants";
import { systemError, whiteBoardType } from "../entities";
import { ErrorHelper } from "../helpers/error.helper";
import { SqlHelper } from "../helpers/sql.helper";

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
}

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

export class SchoolService implements ISchoolService {

    public getBoardTypes(): Promise<whiteBoardType[]> {

        return new Promise<whiteBoardType[]>((resolve, reject) => {
        
            const sql: SqlClient = require("msnodesqlv8");
            const connectionString: string = DB_CONNECTION_STRING;
            const result: whiteBoardType[] = [];
    
            SqlHelper.OpenConnection()
                .then((connection: Connection) => {
                    connection.query(Queries.WhiteBoardTypes, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        if (queryError) {
                            reject(
                                ErrorHelper.parseError(ErrorCodes.queryError, ErrorMessage.SqlQueryError)
                            );
                        }
                        else {
                            
                            if (queryResult !== undefined) {
                                queryResult.forEach((whiteBoardType: localWhiteBoardType) => {
                                result.push(
                                    this.parseLocalBoardType(whiteBoardType)
                                    )
                                })
                            }
                            resolve(result);
                        }
                        
                    })
                })
                .catch((error: systemError) => {
                    reject(error);
                })

        });

    }

    public getBoardType(id: number): Promise<whiteBoardType> {

        return new Promise<whiteBoardType>((resolve, reject) => {
        
            const sql: SqlClient = require("msnodesqlv8");
            const connectionString: string = DB_CONNECTION_STRING;
            let result: whiteBoardType;
            
            SqlHelper.OpenConnection()
                .then((connection: Connection) => {
                    connection.query(`${Queries.WhiteBoardTypeById} ${id}`, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        if (queryError) {
                            reject(
                                ErrorHelper.parseError(ErrorCodes.queryError, ErrorMessage.SqlQueryError)
                            );
                        }
                        else {
                                if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalBoardType(queryResult[0]);
                                }
                                else if (queryResult !== undefined && queryResult.length === 0) {
                                //TODO
                                }
                                resolve(result);
                        }
                            
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                });

           
        }); 
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type,
        }
    }
}