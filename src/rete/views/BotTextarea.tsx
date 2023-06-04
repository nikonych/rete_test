import React from "react";
import styled from "styled-components";

// MARK: Constants

const FontSize = 24;
const MinHeight = FontSize + 18;
const BottomPadding = 2;
const DefaultHeight = MinHeight * 2;

// MARK: Types

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace BotText {
    export type Props = {
        value: string;
        height: number;
    };

    export type State = {
        height: number;
        value?: string;
    };
}

// MARK: Styles

const Styled = {
    ExpandingTextarea: styled.textarea`
      border-style: none;
      box-shadow: none;
      background-color: transparent;
      display: block;
      font-family: "Roboto", sans-serif;
      font-size: ${FontSize}px;
      font-weight: lighter;
      margin: 8px 0;
      min-height: ${MinHeight}px;
      outline: none;
      overflow: auto;
      padding: 0;
      text-align: left;
      width: 100%;
    `,
    UpText: styled.text`
      color: black;

    `,
    GhostArea: styled.div`
      border-style: none;
      box-shadow: none;
      display: block;
      font-family: "Roboto", sans-serif;
      font-size: ${FontSize + BottomPadding}px;
      font-weight: lighter;
      margin: 0;
      opacity: 0.3;
      outline: none;
      overflow: hidden;
      padding: 0;
      position: absolute;
      text-align: left;
      top: 0;
      visibility: hidden;
      width: 100%;
    `,
    TextContainer: styled.div`
      position: relative;
    `
};

// MARK: Component

export class BotTextarea extends React.Component<BotText.Props, BotText.State> {
    mounted: boolean;
    // ghost: any;
    state: { value: string; height: number } = {
        height: null,
        value: null
    };

    constructor(props: BotText.Props) {
        super(props);

        this.state = {
            height: DefaultHeight,
            value: props.value
        };

        this.setValue = this.setValue.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        window.setTimeout(() => this.setHeight(), 1);
    }

    setHeight() {
        if (!this.mounted) {
            return;
        }
        // this.setState({ height: this.ghost.clientHeight });
    }

    setValue(event: { target: { value: any } }) {
        const { value } = event.target;
        // this.setState({value: value });
    }

    expandableField() {
        const isOneLine = this.state.height <= DefaultHeight;
        console.log(this.state.height)
        const { height, value } = this.state;

        return (
            <Styled.ExpandingTextarea

                key={this.state.value + "BotTextArea"}
                autoFocus={true}
                defaultValue={value}
                style={{
                    height,
                    resize: isOneLine ? "none" : null
                }}
                // onChange={this.setValue}
                onKeyUp={this.setHeight}
            />
        );
    }

    // ghostField() {
    //     return (
    //         <Styled.GhostArea
    //             ref={c => (this.ghost = c)}
    //             // aria-hidden="true"
    //             key={this.state.value + "BotTextArea-Ghost"}>
    //             {this.state.value}
    //         </Styled.GhostArea>
    //     );
    // }

    upTextField() {
        return (
            <Styled.UpText>
                Вопрос
            </Styled.UpText>
        );
    }



    render() {
        return (
            <Styled.TextContainer
                key={this.state.value + "BotTextArea-Container"}>
                {this.upTextField()}
                {this.expandableField()}
                {/*{this.ghostField()}*/}
            </Styled.TextContainer>
        );
    }
}