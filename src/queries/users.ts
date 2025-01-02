export const UserQueries ={
    createUser : `INSERT INTO users(
    id,
    firstname,
    lastname,
    username,
    email,
    password,
    phoneNumber) VALUES($1,$2,$3,$4,$5,$6,$7) Returning id,firstname,username`,

    checkUsernameExistence:`SELECT * FROM users WHERE username=$1`,
    checkEmailExistence:`SELECT * FROM users WHERE email=$1`


}