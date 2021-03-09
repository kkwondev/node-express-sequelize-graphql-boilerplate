import {Roles} from '../../models/role';	//방금 만들어준 user model

console.log("======Create User Table======");

const create_table_roles = async() => {
    await Roles.sync({force : true})
    .then(() => {
        console.log("✅Success Create Roles Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create Roles Table : ", err);
    })
}

create_table_roles();