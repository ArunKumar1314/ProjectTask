import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("TasksSync.db");

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            // Create the table if it doesn't exist
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS TaskList (
                    id TEXT PRIMARY KEY, 
                    title TEXT, 
                    description TEXT, 
                    completion_status TEXT, 
                    risk_status TEXT, 
                    dateAssigned DATE, 
                    deadLine DATE,
                    signature TEXT,
                    dataSynced TEXT);`,
                [],
                (_, result) => {
                    // console.log("Table initialized");
                    resolve();
                },
                (_, error) => {
                    console.log("Error initializing table:", error);
                    reject(error);
                }
            );
        });
    });
};


export const addTaskToDb = (id,title, description,completion_status, risk_status, dateAssigned,deadLine, signature, dataSynced) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO TaskList(id,title, description, completion_status, risk_status, dateAssigned,deadLine ,signature, dataSynced) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);`,
                [id,title, description, completion_status,risk_status, dateAssigned,deadLine, signature, dataSynced],
                (_, result) => {
                    console.log("Data added:", result);
                    resolve("from r"+result);
                },
                (_, error) => {
                    console.log("Error adding data:", error);
                    reject(error);
                }
            );
        });
    });
};


export const fetchTaskFromDb = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT id, title, description,completion_status, risk_status, dateAssigned,deadLine, dataSynced FROM TaskList;',
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                   
                    console.error("Error fetching tasks:", error);
                    reject(error);
                }
            );
        });
    });
};


export const updateTaskFromDb = (id, title, description, completion_status, risk_status, dateAssigned,deadLine, signature, dataSynced) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE TaskList
                 SET title = ?, description = ?, completion_status = ?, risk_status = ?, dateAssigned = ?,deadLine=?, signature = ?, dataSynced = "completed"
                 WHERE id = ?;`,
                [title, description,completion_status, risk_status, dateAssigned,deadLine, signature, id],
                (_, result) => {
                    console.log("update exe")
                    console.log("Task updated:", result.rowsAffected, id);
                    resolve(result);
                },
                (_, error) => {
                    console.log("Error updating task:", error);
                    reject(error);
                }
            );
        });
    });
};

export const deleteTaskFromDb = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM TaskList WHERE id = ?;',
                [id],
                (_, result) => {
                    console.log("Task deleted:", result, id);
                    resolve(result);
                },
                (_, error) => {
                    console.error("Error deleting task:", error);
                    reject(error);
                }
            );
        });
    });
};

export const updateOfflineToOnlineDb=(apiId,localId)=>{
    return new Promise ((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(
                `Update TaskList 
                set id=?, dataSynced=?
                where id=?;`,
                [apiId,"completed",localId],
                (_,result)=>{
                    console.log("for off to on")
                    console.log("Task updated:", result.rowsAffected, id);
                    resolve();
                },
                (_, error)=>{
                    console.log("Task updating error");
                    reject();
                }

            )
        })
    })
};
export const dropTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE IF EXISTS TaskList;',
                [],
                (_, result) => {
                    console.log("Table dropped successfully");
                    resolve(result);
                },
                (_, error) => {
                    console.error("Error dropping table:", error);
                    reject(error);
                }
            );
        });
    });
};
