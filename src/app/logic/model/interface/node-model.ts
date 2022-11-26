import { cloneObject } from "src/app/utils/data-manipulation";

export interface NodeModel {
    name: string
}

export const defaultValue: Readonly<NodeModel> = {
    name: ""
}

export function cloneDefaultValue(): Readonly<NodeModel> {
    return cloneObject<Readonly<NodeModel>>(defaultValue);
}