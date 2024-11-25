import { ExtractJwt, Strategy } from "passport-jwt"
import { userRepository } from "../User/repository/user-repository";

const secretKey = 'secret';
const extract = ExtractJwt.fromAuthHeaderAsBearerToken();

const jwtStrategy = new Strategy ({ secretOrKey: secretKey, jwtFromRequest: extract }, (jwt_payload, done) => {
    const user = userRepository.findOneBy({email: jwt_payload.email})
      return user ? done(null, user) : done(null, false);
     }
);