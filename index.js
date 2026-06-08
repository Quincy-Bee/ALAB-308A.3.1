// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };

    try {
        // Find which database contains the user
        const dbName = await central(id);

        // Fetch user data
        const [dbData, vaultData] = await Promise.all([
            dbs[dbName](id),
            vault(id)
        ]);

        // Merge the data into the object
        return {
            id,
            ...vaultData,
            ...dbData
        };

    } catch (error) {
        throw error;
    }
}

getUserData(1)
    .then((user) => console.log(user))
    .catch((err) => console.error(err));

getUserData(11)
    .then((user) => console.log(user))
    .catch((err) => console.error(err));