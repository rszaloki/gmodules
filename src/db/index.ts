import { Database } from 'sqlite3';
import { join } from 'path';

const db:Promise<Database> = new Promise((resolve, reject)=> {
    const dbFile = join(process.cwd(), 'store.db');
    console.log(dbFile);
    const db = new Database(dbFile,(err) => {
        if(err) {
            reject(err);
        }
        resolve(db);
    });
})

export type DBUser = {
    id: number;
    username: string;
}

export type DBProduct = {
    id: number;
    name: string;
}

const runQuery = <T>(dbPromise:Promise<Database>, sql:string, params?:any):Promise<Array<T>> => 
    dbPromise.then(db=> new Promise((resolve, reject) => {
        db.all(sql, params, (err:any, rows: Array<any>) => {
            console.log(sql,rows, err);
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    }));


export const getUser = async (userId:number): Promise<DBUser> => {
    const result = await runQuery<DBUser>(db, 'select id, username from users where id = $id', {$id:userId});
    return result[0];
}

export const getAllUsers = async (): Promise<DBUser[]> => {
    const result = await runQuery<DBUser>(db, 'select id, username from users');
    return result;
}

export const getUserOrders = async (userId:number): Promise<DBProduct[]> => {
    const result = await runQuery<DBProduct>(db, 'select product_id as id, name from orders inner join products on orders.product_id = products.id where user_id = $id', {$id:userId});
    return result;
}

export const getAllProducts = async (): Promise<DBProduct[]> => {
    const result = await runQuery<DBProduct>(db, 'select id, name from products');
    return result;
}

export const getProduct = async (productId:number): Promise<DBProduct> => {
    const result = await runQuery<DBProduct>(db, 'select id, name from products where id = $id', {$id:productId});
    return result[0];
}

export const getProductOrders = async (productId:number): Promise<DBUser[]> => {
    const result = await runQuery<DBUser>(db, 'select user_id as id, username from orders inner join users on orders.user_id = users.id where product_id = $id', {$id:productId});
    return result;
}
