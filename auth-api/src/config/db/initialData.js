import bcrypt from "bcrypt"
import User from "./../../modules/user/model/User.js"

export async function createInitialData() {
    await User.sync({ force: true }) // força a tabela a sincronizar os dados
    let password = await bcrypt.hash('123456', 10)
    await User.create({
        name: 'Alexandre',
        email: 'alexandre@email.com',
        password: password
    })
    await User.create({
        name: 'Marina',
        email: 'marina@email.com',
        password: password
    })
}