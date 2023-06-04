import Rete from 'rete';

export const numSocket = new Rete.Socket("Number value");
export const audioNodeSocket = new Rete.Socket('AudioNode');

export var actionSocket = new Rete.Socket("Action");