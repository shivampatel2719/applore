export class User {
    constructor(
        public username: string,
        public email : string,
        public id: string,
        public isAdmin: boolean,
        private _token: string,
    ) {}

    get token() {
        return this._token;
    }
}