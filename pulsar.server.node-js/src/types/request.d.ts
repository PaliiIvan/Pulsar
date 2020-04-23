
declare namespace Express {
    interface Request {
       user: import('../authentication/identity-user').User | null
    }
 }