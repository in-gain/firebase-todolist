export enum State { All, Working, Done }

export interface TodoItem {
    id: number;
    name: string;
    state: State.Working | State.Done;
}