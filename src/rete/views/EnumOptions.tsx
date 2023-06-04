import React from "react";
import styled from "styled-components";

// MARK: Constants

const DefaultWidth = 65;


// MARK: Types

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace EnumOption {
    export type Props = {
        value: string;
        width: number;
        onDeleteClick: (value: number) => void
    };

    export type State = {
        value?: string;
        width: number;
    };
}

// MARK: Styles

const Styled = {
    Container: styled.div`
      position: relative;
      text-align: right;
      width: 100%;
      margin-bottom: 6px;
    `,
    EnumOption: styled.input`
      background: #ffffff;
      border-radius: 20px;
      border-width: 2px;
      border-style: solid;
      border-color: rgb(0, 177, 169);
      color: rgba(0, 0, 0, 0.87);
      cursor: pointer;
      display: inline-block;
      font-size: 12px;
      font-weight: normal;
      font-family: "Roboto", sans-serif;
      flex-direction: row;
      letter-spacing: normal;
      line-height: 14px;
      margin: 0;
      padding: 6px;
      text-align: center;
      text-indent: 0px;
      text-rendering: auto;
      text-shadow: none;
      text-transform: none;
      word-spacing: normal;
    `,
    DeleteButton: styled.button`
      color: red;
    `,
    EnumGhost: styled.div`
      opacity: 0.3;
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
      visibility: hidden;
      position: absolute;
      top: 0;
      margin: 0;
      padding: 40px;
    `
};

// MARK: Component

export class EnumOptionControl extends React.Component<
    EnumOption.Props,
    EnumOption.State
> {

    mounted: boolean;
    capsule: any;
    ghost: any;
    state: { width: number; value: string } = {
        width: DefaultWidth,
        value: null
    };

    constructor(props: EnumOption.Props) {
        super(props);

        this.state = {
            width: DefaultWidth,
            value: props.value
        };

        this.setValue = this.setValue.bind(this);
        this.setWidth = this.setWidth.bind(this);
    }

    setWidth() {
        if (this.mounted) {
            const element = this.ghost;

            this.setState({
                width: element.clientWidth
            });
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.setWidth();
        window.setTimeout(() => this.setWidth(), 1);
    }

    setValue(event: { target: { value: any } }) {
        const {value} = event.target;
        // this.setState({ value });
    }

    inputField() {
        const {width, value} = this.state;

        return (
            <div>
                <Styled.EnumOption
                    style={{
                        width
                    }}
                    value={value}
                    onChange={this.setValue}
                    onKeyUp={this.setWidth}
                />
            </div>
        );
    }

    ghostField() {
        return (
            <Styled.EnumGhost
                className="enum-ghost"
                ref={c => (this.ghost = c)}
                aria-hidden="true">
                {this.state.value}
            </Styled.EnumGhost>
        );
    }


    handleClick = (event) => {
        const buttonId = event.target.getAttribute('data-id')
        // this.removeAnswerButton(body_control, buttonId)
        // on_click(buttonId)
        if (this.props.onDeleteClick) {
            this.props.onDeleteClick(buttonId);
        }
    }

    deleteButton(item_id) {
        return (
            <Styled.DeleteButton
                onClick={this.handleClick}
                data-id={item_id}>
                Delete
            </Styled.DeleteButton>
        );
    }

    render() {
        const {key, id, item_id, control} = this.props;
        return (
            <Styled.Container>
                {this.deleteButton(item_id)}
                {this.inputField()}
                {this.ghostField()}
            </Styled.Container>
        );
    }
}
