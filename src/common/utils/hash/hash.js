import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
export function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashPassword);
}