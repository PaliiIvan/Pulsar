import * as shelljs from 'shelljs';

//shelljs.cp("-R", "src/resources", "dist/resources");
shelljs.cp('-f', '.env', 'dist');
