declare namespace NodeJS {
  interface Process {
    pkg?: any;
  }
}

declare namespace Express {
  export interface Request {
    user?: any;
  }
}
