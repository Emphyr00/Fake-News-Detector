import bcrypt from 'bcrypt'
import password from '../config/password';
const saltRounds = password.saltRounds;

export default class PasswordHelper {
    static hash(password) {
        return bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return null
            } else {
                return hash
            }
        });
    }

    static compare(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return false
            } else if (result) {
                return true
            } else {
                return false
            }
        });
    }
}