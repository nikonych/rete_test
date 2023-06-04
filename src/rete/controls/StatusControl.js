// import React from "react";
// import styled from "styled-components";
// import { Control } from "rete";
// import { ReactControl } from "./ReactControl";
//
// const Styled = {
//     StatusContainer: styled.div`
//       height: 72px;
//     `
// };
//
// export class StatusControl extends Control {
//     constructor(emitter, data, id, elementType, readonly = false) {
//         super(id);
//
//         this.render = "react";
//         this.component = ReactControl;
//         this.props = {
//             emitter,
//             id,
//             data,
//             readonly,
//             name: elementType,
//             onChange: event => {
//                 this.putData(event.target.id, event.target.value);
//                 this.update();
//             },
//             putData: () => this.putData.apply(this, arguments),
//             render: () => this.renderControl()
//         };
//     }
//
//     renderControl() {
//         return (
//             <Styled.StatusContainer>
//                 <BotIndicator awaitingInput={this.props.data === ""} />
//             </Styled.StatusContainer>
//         );
//     }
// }
