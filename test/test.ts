// Note: every assignment that has TypeScript coding
//       in it will come with a predefined package.
//       json which specifies the packages and package
//       versions for the assignment. For every assignment,
//       extract the files in a new folder, open a cmd in that folder,
//       and run npm i. This will install all necessary packages for the assignment.

import { map } from "ramda";
console.log("Hello, world");
console.log(map(x => x * x, [1, 2, 3, 4]));