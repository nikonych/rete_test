import Rete from "rete";
import {ReteNode} from "../Node";
import { BodyControl } from "../controls/BodyControl";
import {actionSocket, numSocket} from "../sockets";
import NumControl from "../controls/NumControl";

export default class MyComponent extends Rete.Component {
    body;
    constructor() {
        super("Niko");
        this.data.component = ReteNode; // optional
        this.body = null;
    }

    builder(node) {
        this.body = new BodyControl(
            this.editor,
            node.data.body,
            node.id + "_BODY",
            MyComponent.type
        );

        // const status = new StatusControl(
        //     this.editor,
        //     node.data.status,
        //     node.id + "_STATUS",
        //     BotInputNode.type
        // );

        node.addControl(this.body);
        console.log(node)
        if (
            node.data.properties &&
            !node.data.properties.includes("ENTRY_POINT")
        ) {
            node.addInput(new Rete.Input("act", "Link", actionSocket, true));
        }
        if (node.data.actions) {
            node.data.actions.forEach(action => {
                node.addOutput(
                    new Rete.Output(action.id, action.text, actionSocket, false)
                );
            });
        }
        return node;
    }

    worker(node, inputs, outputs) {
        console.log("Alert", node.id, node.data);
    }


}



