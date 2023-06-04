export default class AutoArrange {
    constructor(editor, node, margin, depth) {
        this.editor = editor;
        this.margin = margin || { x: 50, y: 100 };
        this.depth = depth;
        this.node = node || editor.nodes[0];
    }

    getNodes(node, type = "output") {
        const nodes = [];
        const key = `${type}s`;

        for (let index of Object.keys(node[key])) {
            let io = node[key][index].values();
            for (let connection of io.connections.values()) {
                nodes.push(
                    connection[type === "input" ? "output" : "input"].node
                );
            }
        }
        return nodes;
    }

    getNodesTable(node, rows = [], depth = 0) {
        if (this.depth && depth > this.depth) return;
        if (!rows[depth]) rows[depth] = [];
        if (rows[depth].includes(node)) return;

        rows[depth].push(node);

        this.getNodes(node, "output").map(n =>
            this.getNodesTable(n, rows, depth + 1)
        );
        this.getNodes(node, "input").map(n =>
            this.getNodesTable(n, rows, depth - 1)
        );

        return rows;
    }

    nodeSize(node) {
        const el = this.editor.view.nodes.get(node).el;

        return {
            width: el.clientWidth,
            height: el.clientHeight
        };
    }

    arrange(node = this.node) {
        const table = this.getNodesTable(node);
        const heights = table.map(row =>
            Math.max(...row.map(n => this.nodeSize(n).height))
        );

        let y = 0;

        for (let [i, row] of Object.entries(table)) {
            const widths = row.map(n => this.nodeSize(n).width);
            const fullWidth = widths.reduce((a, b) => a + b + this.margin.x);

            let x = -Math.abs(fullWidth) / 2;

            y += heights[i] + this.margin.y;

            for (let [j, n] of Object.entries(row)) {
                this.editor.view.nodes.get(n).translate(x, y);
                this.editor.view.updateConnections({ node: n });
                x += widths[j] + this.margin.x;
            }
        }
    }
}
