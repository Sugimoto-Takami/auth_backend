// backend/src/config/passport-config.js
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import getUserByField from '../data/userService';

// 無駄な引数削除.
function initialize(passport: PassportStatic): void {
    const authenticateUser = async (email: string, password: string, done: Function) => {
        const user = await getUserByField('email', email);
        if (user  == null) {
            return done(null, false, {message: 'No user with that email'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField : 'email'},
    authenticateUser))

    passport.serializeUser((user: any, done) => done(null, user.id));
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await getUserByField('id', id); 
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
}

export default initialize;