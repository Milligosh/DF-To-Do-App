import crypto from 'crypto'

export class GenericHelper{
    static generateID():string{
        return  crypto.randomUUID().replace(/-/g, '');
    }
}