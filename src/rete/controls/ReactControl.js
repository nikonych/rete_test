import React from "react";

export class ReactControl extends React.Component {
    control;
    state = {};

    constructor(id, control) {
        super(id);
        this.control = control;
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            data: this.props.data
        });
    }

    onChange() {
        this.onUpdate();
    }

    render() {
        return this.props.render();
    }

    onUpdate() {
        this.props.putData(this.props.data.inputid, this.props.value);
        this.props.emitter.trigger("process");
    }

    setValue(value) {
        this.props.putData(this.key, value);
        this.update();
    }
}
