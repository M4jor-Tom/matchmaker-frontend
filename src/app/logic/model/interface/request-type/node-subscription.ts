import { NodeId } from "../../enum/node-id";

export interface NodeSubscription {
    nodeId: NodeId;
    ifTrueAddElseRemove: boolean;
}