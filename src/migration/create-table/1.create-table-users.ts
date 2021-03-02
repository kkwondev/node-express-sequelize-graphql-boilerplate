import {Users} from '../../models/user';	//방금 만들어준 user model

console.log("======Create User Table======");

const create_table_users = async() => {
    await Users.sync({force : true})
    .then(() => {
        console.log("✅Success Create User Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create User Table : ", err);
    })
}

create_table_users();