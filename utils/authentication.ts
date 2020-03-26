import * as JWT from 'jsonwebtoken';
//TODOS LAS FUNCIONES QUE SE REALIZAN CON WEB TOKENS
export function createTokenSession(name: string, password: string, email: string, country: string) {
    const data = {
        name:name,
        password:password,
        email:email,
        country:country,
    }
    return JWT.sign(data, process.env.JWT_SECRET,{expiresIn: process.env.WEB_TOKEN_DURATION});
}
export function decodeToken(token:String) {
    return JWT.decode(token);
}
export function verifyToken(token:String){
    return JWT.verify(token,process.env.JWT_SECRET)
}