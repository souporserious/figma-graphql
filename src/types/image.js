const { loadFigmaImages } = require("../utils");

exports.type = `
    input Params {
        # A comma separated list of node IDs to render
        ids: [String]!

        # A number between 0.01 and 4, the image scaling factor
        scale: Int

        # A string enum for the image output format, can be "jpg", "png", or "svg"
        format: String
    }

    type ImageSrc {
        id: String
        source: String
    }

    type Image {
        # Source of the images you requested
        id: String
        source: String
    }

    extend type Query {
        # Get just the image of a node id in a file
        images(id: String!, params: Params): Image
    }
`;

exports.resolvers = {
    Query: {
        images: (root, { id, params = { ids: ["0:1"] } }) =>
            loadFigmaImages(id, params).then(data => data),
    },
    Image: {
        id: root => Object.keys(root)[0],
        source: root => Object.values(root)[0],
    },
    ImageSrc: {
        id: root => Object.keys(root)[0],
        source: root => Object.values(root)[0],
    },
};
