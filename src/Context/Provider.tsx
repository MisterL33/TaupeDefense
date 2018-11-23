import React, { Component } from "react";


export interface IClient {
    nom: string
    score: number;
}
interface IState {
    clients: IClient[];
}

export interface IContext {
    state: IState;
    actions: {
        updateName: (text: string) => void
    };
}

const StateContext = React.createContext<IContext>({} as IContext);
const initialClient = [
    { nom: 'Julienne', score: 0 },
    { nom: 'Cesar', score: 1 },
    { nom: 'Flemme', score: 2 },
    { nom: 'Quatrieme', score: 3 }
];




class StateContainer extends Component<{}, IState> {
    state = {
        clients: initialClient
    };
    updateName = (text: string) => {
        this.setState(prevState => {
            const client: IClient = {
                nom: 'lol',
                score: 2
            };
            return {
                clients: [client, ...prevState.clients]
            };
        });
    };
    render() {
        const context = {
            state: this.state,
            actions: {
                updateName: this.updateName
            }
        };
        return (
            <StateContext.Provider value={context}>
                {this.props.children}
            </StateContext.Provider>
        );
    }
}
export default StateContainer;
export const StateConsumer = StateContext.Consumer;