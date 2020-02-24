const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO registration(firstName, lastName, gender, email, password, number)
                     VALUES (?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            `SELECT id, firstName, lastName, gender, email, number FROM registration`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            } 
        );
    },

    getUserByUserId: (id, callBack) => {
        pool.query(
            `SELECT id, firstName, lastName, gender, email, number FROM registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            } 
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE registration SET firstName=?,lastName=?,gender=?,email=?,password=?,number=? WHERE id=?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            } 
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM registration WHERE id=?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            } 
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM registration where email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            } 
        );
    }

}