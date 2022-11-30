import { cloneObject } from "src/app/utils/data-manipulation";
import { NodeId } from "../enum/node-id";
import { NodeComponentDynamicProperties } from "./dynamic-component-properties/node-dynamic-properties";

export interface NodeModel {
    nodeId: NodeId,
    name: string,
    waitingPlayersCount: number | undefined,
    isPlayerSubscribed: boolean
}

export const defaultValue: Readonly<NodeModel> = {
    nodeId: NodeId.NO_ID,
    name: "",
    waitingPlayersCount: undefined,
    isPlayerSubscribed: false
}

export function cloneDefaultValue(): Readonly<NodeModel> {
    return cloneObject<Readonly<NodeModel>>(defaultValue);
}

export function updateWithDynamicProperties(nodeModel: NodeModel, nodeComponentDynamicProperties: NodeComponentDynamicProperties): NodeModel {
    nodeModel.waitingPlayersCount = nodeComponentDynamicProperties.waitingPlayersCount;
    return nodeModel;
}