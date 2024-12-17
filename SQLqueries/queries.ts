import { Client, QueryResult } from 'pg';

export const getAllUsers = async (client: Client): Promise<QueryResult> => {
    try {
        const result = await client.query('SELECT * FROM users');
        return result;
    } catch (err) {
      const error = err as Error;
      throw new Error('Error fetching users' + error.message);
    }
};

export const getSingleUser = async (client: Client, id: string): Promise<QueryResult> => {
    try {
        const result = await client.query(`SELECT users.name, users.age, user_email.email FROM users JOIN user_email on users.id = user_email.user_id WHERE users.id=${id}`);
        return result;
    } catch(err) {
        const error = err as Error;
        throw new Error('There was an error that occured fetching the data' + error.message);
    }
};