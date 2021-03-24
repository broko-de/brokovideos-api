const MongoLib = require('../lib/mongo');
// Lib que se encarga de crear en modo hash, no se deben guardar en texto plano
const bcrypt = require('bcrypt');

class UsersService{
    constructor(){
        this.collection = 'users';
        this.mongoLib = new MongoLib();
    }

    async getUsers(){
        const users = await this.mongoLib.getAll(this.collection,{});
        return users
    }

    async getUser({email}){
        const [user] = await this.mongoLib.getAll(this.collection, {email});
        return user;
    }

    async createUser({user}){
        //destructuring de usuario, sacamos user, email y password
        const {name, email, password} = user;
        const hashedPassword = await bcrypt.hash(password,10);

        const createUserId = await this.mongoLib.create(this.collection,{
            name,
            email,
            password: hashedPassword
        });
        return createUserId;
    }

    async updateUser({userId,user}={}){
        const updatedUserId = await this.mongoLib.update(this.collection,userId,user);
        return updatedUserId;
    }

    async deleteUser({userId}){
        const deletedUserId = await this.mongoLib.delete(this.collection,userId);
        return deletedUserId;
    }
}

module.exports = UsersService;
