import groupBy from "lodash/groupBy";
import uniqBy from "lodash/uniqBy";
import { Node } from "figma-js";

export const groupNodes = (nodes: Node[]) => groupBy(uniqBy(nodes, "id"), "type");

export const getNodes = (data, nodeType, filterBy) => {
    const { name: filterByName, type: filterByType } = filterBy;
    const dataNodes = nodeType === "ALL" ? data.children : data.shortcuts[nodeType];

    if (dataNodes == null) {
        return [];
    }

    if (filterByType != null) {
        return dataNodes.filter(node => filterByType.includes(node.styleType));
    }

    if (filterByName != null) {
        const nameRegex = new RegExp(filterByName);
        return dataNodes.filter(node => nameRegex.test(node.name));
    }

    return dataNodes;
};

export const processNodes = (nodes, documentStyles: { [key: string]: any }, fileId) => {
    const parsedStyles = new Map(Object.entries(documentStyles));

    const traverseChildren = (node, parentId) => {
        const { id, styles, children, ...rest } = node;
        let nodeStyles: any[] = [];

        // If node has styles definitions populate that with the actual styles
        if (styles != null) {
            nodeStyles = Object.entries(styles).map(([key, styleId]) => {
                const documentStyle = parsedStyles.get(styleId as string);

                return {
                    id: styleId,
                    ...documentStyle,
                    styles: node[`${key}s`],
                    typeStyles: node.style,
                    type: "STYLE",
                };
            });
        }

        // Reached a leaf so returning the simplified node
        if (children == null || children.length === 0) {
            return [[{ id, parentId, fileId, ...rest }], nodeStyles];
        }

        // If it gets here then it means it has children
        // so we're going to recursively go through them
        // and combine everything
        const [parsedChildren, shortcuts] = children.reduce(
            (acc, child) => {
                const [accChildren, accShortcuts] = acc;
                const [tChildren, tShortcuts] = traverseChildren(child, id);
                return [
                    [...accChildren, ...tChildren],
                    [...accShortcuts, ...tChildren, ...tShortcuts],
                ];
            },
            [[], []]
        );

        // Finally we return the parsed node with the
        // parsed children grouped by type
        const parsedNode = {
            id,
            parentId,
            fileId,
            ...rest,
            children: parsedChildren,
            shortcuts: groupNodes(shortcuts),
        };

        return [[parsedNode], shortcuts];
    };

    return traverseChildren(nodes, "0:0");
};
