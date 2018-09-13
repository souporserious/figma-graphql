// elements([], {})
// elements(["name", "type", size(), position(["x"])], { type: "TEXT" });
const isString = require("lodash/isString");

const style = (fields = [], args = {}) =>
    `style(${Object.keys(args)
        .map(k => `${k}: ${typeof args[k] === "string" ? `"${args[k]}"` : args[k]}`)
        .join(", ")}) { \n ${fields.join("\n")} \n}`;

// const query = `{
//     file(id: "KViUntEBJqK4gWfiwft5NObl") {
//         name
//         thumbnailUrl
//         lastModified
//         pages {
//             name
//             id
//             type
//             frames {
//                 id
//                 name
//                 position {
//                     x
//                 }
//                 size {
//                     width
//                     height
//                 }
//                 elements(type: "TEXT") {
//                     name
//                     type
//                     characters
//                     position {
//                         x
//                         y
//                     }
//                     size {
//                         width
//                         height
//                     }
//                     style {
//                         fontSize
//                         fontFamily
//                         fontWeight
//                         letterSpacing
//                     }
//                     strokes {
//                         type
//                     }
//                     fill {
//                         r
//                         g
//                         b
//                         a
//                     }
//                 }
//             }
//         }
//     }
// }`;

// const file = (fields = [], args = {}) => ({
//     query: `style(${Object.keys(args)
//         .map(k => `${k}: ${isString(args[k]) ? `"${args[k]}"` : args[k]}`)
//         .join(", ")}) { \n ${fields.join("\n")} \n}`,
//     all: `${fields.join("\n")}`,
// });

// const position = null;
// const size = null;
// const elements = null;
// const pages = null;

// const simplifiedQuery = `{
//     file(id: "KViUntEBJqK4gWfiwft5NObl") {
//         ${file.all()}
//         pages {
//             ${pages.all()}
//             frames {
//                 id
//                 name
//                 ${position.query()}
//                 ${size.query()}
//                 ${elements.query(
//                     [
//                         "name",
//                         "type",
//                         position.query(["x"]),
//                         size.query(),
//                         style.query(["fontSize", "fontFamily", "fontWeight", "letterSpacing"]),
//                         strokes.query(),
//                         fill.query()
//                     ],
//                     { type: "TEXT" }
//                 )}
//             }
//         }
//     }
// }`;
