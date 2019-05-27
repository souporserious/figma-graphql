import merge from "lodash/merge";
import * as file from "./file";
import * as page from "./page";
import * as frame from "./frame";
import * as node from "./node";
import * as vector from "./vector";
import * as image from "./image";
import * as comments from "./comments";
import * as projects from "./projects";
import * as projectFiles from "./project-files";
import * as misc from "./misc";

const typePaths = [
    file,
    page,
    frame,
    node,
    vector,
    image,
    comments,
    projects,
    projectFiles,
    misc,
    require("./helpers/style"),
    require("./helpers/constraint"),
    require("./helpers/effect"),
    require("./helpers/grid"),
    require("./helpers/text"),
];

/**
 * Since we would like to modularize our schema, we need a convenient way to combine
 * the types and their resolvers. This function will take each type file and merge
 * it's types and resolvers into an object that can be passed to makeExecutableSchema.
 *
 * The only requirement is that our type files expose named exports:
 * type, resolvers
 */
export default ({ typeDefs: t, resolvers: r }) =>
    typePaths.reduce(
        ({ typeDefs, resolvers }, { type, resolvers: typeResolvers }) => ({
            typeDefs: [...typeDefs, type],
            resolvers: merge(resolvers, typeResolvers),
        }),
        {
            typeDefs: t,
            resolvers: r,
        }
    );