import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class SelectionStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable selected = ''

    @action setSelected = (id: string) => {
        this.selected = id
    }
}