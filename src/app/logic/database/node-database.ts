import { cloneObject } from "src/app/utils/data-manipulation";
import { NodeId } from "../model/enum/node-id";
import * as nm from "../model/interface/node-model";

export const nodeDatabase: nm.NodeModel[] = cloneObject<nm.NodeModel[]>([
    nm.newNode(NodeId.MARIANA),
    nm.newNode(NodeId.E_PRIME),
    nm.newNode(NodeId.LITH),
    nm.newNode(NodeId.ERPO),
    nm.newNode(NodeId.EVEREST),
    nm.newNode(NodeId.GAIA),
    nm.newNode(NodeId.MANTLE),
    nm.newNode(NodeId.CAMBRIA),
    nm.newNode(NodeId.EURASIA),
    nm.newNode(NodeId.PACIFIC),
    nm.newNode(NodeId.CERVANTES),
    nm.newNode(NodeId.COBA),
    nm.newNode(NodeId.TIKAL),
    nm.newNode(NodeId.ORO)
]);