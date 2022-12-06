import { NodeId } from "../../enum/node-id";
import { ActionType } from "./action-type";

export interface Action {
    nodeId: NodeId;
    actionType: ActionType;
}