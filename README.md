# My Crypto Exchange

Simple crypto currency exchanger. Your initial account is prefilled with 10k € with which 
you can buy different crypto currencies. Exchange rates changes every 5 
seconds. All transactions are stored locally in `db.json` file.

Project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4 
and is using [json-server](https://github.com/typicode/json-server) version 0.12.1 for local API
calls.

## Running

1. Pull repository and run `npm install`

2. Install Angular CLI: `npm i -g @angular/cli`

3. Install JSON Server: `npm i -g json-server`

4. Run json server in project root folder: `json-server --watch db.json`

5. Run development server: `ng serve`. Navigate to `http://localhost:4200/` for app and
`http://localhost:3000/` if you like to see json-server output. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
You can then run the dist version on some http server like [http-server](https://www.npmjs.com/package/http-server).
