/**
 * ?What is the difference between import and require?
 * * - Require can be called from anywhere inside the program. Import cannot be called conditionally, it always runs at the beginning of the file.
 * * - Require in Non-lexical (stays where they have put the file). Import is lexical (it get sorted to the top of the file)
 * * - To use the require statement, a file must be saved with .js extension. When we use the import statement it needs to be saved in .mjs.
 * * - In order to use import statements you need to use experimental feature flag. If you use require statement you can directly run the code.
 * * - Import is static (happens in parse time) and require is dynamic (happens in runtime).
 *
 * ?How can you enable using the import syntax using node js?
 * * 1.1 Add “type” : “module” in the package.json to enable ES6 modules.
 * * 1.2 Use import expression in a file with .js extension.
 * * 1.3 Run the command node --experimental-modules <fileName>
 *
 * * 2.1 Create a file with the .mjs extension.
 * * 2.2 In this approach we don't need to add "type": "module" to package.json
 * * 2.3 Execute the program by typing node --experimental-modules <fileName>
 *
 * * 3.1 npm install esm
 * * 3.2 Execute the program by writing node -r esm <fileName>
 *
 * ?Give 2 node.js environment variables that are not available when using the import syntax.
 * * __filename
 * * __dirname
 */

//?Create 3 functions using the export/import syntax

import { add } from "./foo3.js";
import { sub } from "./foo1.js";
import { multiple } from "./foo2.js";

const addRes = add(2, 4);
console.log(addRes);
const subRes = sub(2, 4);
console.log(subRes);
const multipleRes = multiple(2, 4);
console.log(multipleRes);

//?Import the file system module using the import syntax.
import * as fs from "fs";

fs.writeFile("example.txt", "Example:)", (err) => {
    if (err) {
        console.log(err);
    }
});
