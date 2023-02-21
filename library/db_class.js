import db from "mysql-activerecord";
import conf from "./dbConf.json";
class Database {
    constructor() {
        try {
            this.connection = new db.Pool(conf);
        } catch (e) {
            console.info(e);
        }
    }

    /* Custom Query to select
    Params : String
    Sample : 'SELECT * FROM USERS WHERE USER_ID ! = "" AND CATEGORY > 0'
   */
    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.getNewAdapter(function (connection) {
                connection.query(sql, function (err, rows) {
                    connection.releaseConnection();
                    if (err) {
                        console.info("\n\n" + sql);
                        return reject(err);
                    }
                    resolve(rows);
                });
            });
        });
    }

    /*
    Query to insert
    Params : Object
    Sample :
    {
      'table' : 'section',
      'data' : { first_name: 'John', last_name: 'Smith' },
    }
  */
    insert(params) {
        return new Promise((resolve, reject) => {
            this.connection.getNewAdapter(function (connection) {
                connection.insert(
                    params.table,
                    params.data,
                    function (err, info) {
                        if (params.info) {
                            console.info("\n\n" + connection._last_query());
                        }
                        connection.releaseConnection();
                        if (err) {
                            console.info(err);
                            return reject(err);
                        }
                        resolve(info);
                    }
                );
            });
        });
    }

    /*
    Query to UPDATE
    Params : Object
    Sample :
    {
      'table' : 'section',
      'data' : { first_name: 'John', last_name: 'Smith' },
      'custom' : ['(docid !="" OR status != 1)','section_id != 0'], // If required
      'conditions' : {docid: docid,status: 1}, // Will be appended after custom
    }
  */

    update(params) {
        return new Promise((resolve, reject) => {
            this.connection.getNewAdapter(function (connection) {
                let query = connection;
                if (params.custom) {
                    for (var i in params.custom) {
                        query = query.where(params.custom[i]);
                    }
                    //params.conditions = null;
                }
                if (params.conditions) {
                    query = query.where(params.conditions);
                }
                query = query.update(
                    params.table,
                    params.data,
                    function (err, res) {
                        if (params.info) {
                            console.info("\n\n" + connection._last_query());
                        }
                        connection.releaseConnection();
                        if (err) {
                            console.info(params);
                            return reject(err);
                        }
                        resolve(res);
                    }
                );
            });
        });
    }

    /*
    Query to DELETE
    Params : Object
    Sample :
    {
      'table' : 'section',
      'custom' : ['(docid !="" OR status != 1)','section_id != 0'], // If required
      'conditions' : {docid: docid,status: 1}, // Will be appended after custom
    }
  */
    delete(params) {
        return new Promise((resolve, reject) => {
            this.connection.getNewAdapter(function (connection) {
                let query = connection;
                if (params.custom) {
                    for (var i in params.custom) {
                        query = query.where(params.custom[i]);
                    }
                    //params.conditions = null;
                }
                if (params.conditions) {
                    query = query.where(params.conditions);
                }
                query = query.delete(params.table, function (err) {
                    if (params.info) {
                        console.info("\n\n" + connection._last_query());
                    }
                    connection.releaseConnection();
                    if (err) {
                        console.info(params);
                        return reject(err);
                    }
                    resolve(true);
                });
            });
        });
    }
    /*
    Query to SELECT
    Params : Object
    Sample :
    {
      'table' : 'section',
      'columns' : ['section_id', 'section_title', 'staff_id'],
      'custom' : ['(docid !="" OR status != 1)','section_id != 0'], // If required
      'conditions' : {docid: docid,status: 1}, // Will be appended after custom
      'group_by' : ['name asc', 'last_name desc'],
      'order_by' : ['name asc', 'last_name desc'],
      'limit' : [10,0] //limitNumber, offsetNumber
    }
  */
    select(params) {
        return new Promise((resolve, reject) => {
            this.connection.getNewAdapter(function (connection) {
                let query = connection.select(params.columns);
                if (params.custom) {
                    for (var i in params.custom) {
                        query = query.where(params.custom[i]);
                    }
                    //params.conditions = null;
                }
                if (params.conditions) {
                    query = query.where(params.conditions);
                }
                if (params.group_by) {
                    query = query.group_by(params.group_by);
                }
                if (params.order_by) {
                    query = query.order_by(params.order_by);
                }
                if (params.limit) {
                    query = query.limit(params.limit[0], params.limit[1]);
                }
                query = query.get(params.table, function (err, rows) {
                    if (params.info) {
                        console.info("\n\n" + connection._last_query());
                    }
                    connection.releaseConnection();
                    if (err) {
                        console.info(params);
                        return reject(err);
                    }
                    resolve(rows);
                });
            });
        });
    }

    /*
    Query to COUNT
    Params : Object
    Sample :
    {
      'table' : 'section',
      'custom' : ['(docid !="" OR status != 1)','section_id != 0'], // If required
      'conditions' : {docid: docid,status: 1}, // Will be appended after custom
    }
  */
    count(params) {
        return new Promise((resolve, reject) => {
            this.connection.getNewAdapter(function (connection) {
                let query = connection;
                if (params.custom) {
                    for (var i in params.custom) {
                        query = query.where(params.custom[i]);
                    }
                    //params.conditions = null;
                }
                if (params.conditions) {
                    query = query.where(params.conditions);
                }
                query = query.count(params.table, function (err, results) {
                    if (params.info) {
                        console.info("\n\n" + connection._last_query());
                    }
                    connection.releaseConnection();
                    if (err) {
                        console.info(params);
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });
    }
}

export default new Database();
