import bcrypt from 'bcrypt'
import password from '../config/password.js';
const salt = password.salt;

export default class PasswordHelper {
    static hash(password) {
        return bcrypt.hashSync(password, salt.substr(0, 29))
    }

    static compare(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}