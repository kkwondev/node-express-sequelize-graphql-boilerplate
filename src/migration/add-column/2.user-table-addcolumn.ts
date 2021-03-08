import {Users} from '../../models/user';	//방금 만들어준 user model

console.log("======add User Table======");

const add_column = async() => {
    await Users.sync({alter:true})
    .then(() => {
        console.log("✅Success add User Table");
    })
    .catch((err) => {
        console.log("❗️Error in add User Table : ", err);
    })
}

add_column();