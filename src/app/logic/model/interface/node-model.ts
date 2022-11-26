import { cloneObject } from "src/app/utils/data-manipulation";
import { NodeId } from "../enum/node-id";

export interface NodeModel {
    nodeId: NodeId,
    name: string
}

export const defaultValue: Readonly<NodeModel> = {
    nodeId: NodeId.NO_ID,
    name: ""
}

export function cloneDefaultValue(): Readonly<NodeModel> {
    return cloneObject<Readonly<NodeModel>>(defaultValue);
}