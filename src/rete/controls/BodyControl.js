import React from "react";
import styled from "styled-components";
import {Control} from "rete";
import {ReactControl} from "./ReactControl";
import {BotTextarea} from "../views/BotTextarea.tsx";
import {EnumOptionControl} from "../views/EnumOptions.tsx";
import {Action} from "../model/Action"

const Styled = {
    BotText: styled.div`
      text-align: left;
      margin: 0;
      padding: 0;
    `,
    Divider: styled.hr`
      border: 1px solid #bbbbbb;
      border-radius: 2px;
      width: 25%;
      position: absolute;
    `
};

export class BodyControl extends Control {
    constructor(emitter, data, id, elementType, readonly = false) {
        super(id);

        this.render = "react";
        this.component = ReactControl;
        this.state = {
            data: data || [],
        };
        this.props = {
            emitter,
            id,
            data, // Используем состояние data из локального состояния
            readonly,
            name: elementType,
            onChange: event => {
                this.putData(event.target.id, event.target.value);
                this.update();
            },
            putData: () => this.putData.apply(this, arguments),
            render: () => this.renderControl()
        };
    }


    addAnswerButton(){
        console.log(this.props.data)
        console.log(this.component)
        let id = 0;
        if(this.props.data && this.props.data.length > 0){
            id = this.props.data.length
            this.props.data.push(new Action(id, "ANSWER", null))
        } else {
            this.props.data = [new Action(id, "ANSWER", null)]
        }
        this.update()
    }

    removeAnswerButton(id) {
        console.log(this.props.data)
        const index = this.props.data.findIndex(action => action.id === id);
        if (index !== -1) {
            this.props.data.splice(index, 1);
        }
        this.update()
    }


    generateBody() {
        var unique = 0;
        return (
                <BotTextarea
                    key={this.props.id + "_TEXT_" + unique++}
                    id={this.props.id}
                    // readOnly={this.props.readonly}
                    // value={"gggggg"}
                    onChange={e => this.props.onChange(e)}
                />
            // <></>
        );
    }
    generateButtons(){
        console.log(this.props.data)
        if (this.props.data && this.props.data.length > 0) {
            var unique = 0;
            return this.props.data.map(item => {
                console.log(item)
                return (
                    <EnumOptionControl
                        key={this.props.id + "_TEXT_" + unique++}
                        id={this.props.id}
                        item_id={item.id}
                        onDeleteClick= {() => this.removeAnswerButton(item.id)}
                        // readOnly={this.props.readonly}
                        // value={"gggggg"}
                        // onChange={e => this.props.onChange(e)}
                    />
                );
            });
        } else {
            return <></>;
        }
    }

    renderControl() {
        return (
            <Styled.BotText key={this.props.id}>
                {this.generateBody()}
                <Styled.Divider/>
                {this.generateButtons()}
            </Styled.BotText>
        );
    }
}
