import { NodeId } from "../model/enum/node-id";
import * as nm from "../model/interface/node-model";

export function getNodeDatabase(): Map<NodeId, nm.NodeModel> {
    const map: Map<NodeId, nm.NodeModel> = new Map<NodeId, nm.NodeModel>();

    map.set(NodeId.MARIANA, nm.newNode(NodeId.MARIANA));
    map.set(NodeId.E_PRIME, nm.newNode(NodeId.E_PRIME));
    map.set(NodeId.LITH, nm.newNode(NodeId.LITH));
    map.set(NodeId.ERPO, nm.newNode(NodeId.ERPO));
    map.set(NodeId.EVEREST, nm.newNode(NodeId.EVEREST));
    map.set(NodeId.GAIA, nm.newNode(NodeId.GAIA));
    map.set(NodeId.MANTLE, nm.newNode(NodeId.MANTLE));
    map.set(NodeId.CAMBRIA, nm.newNode(NodeId.CAMBRIA));
    map.set(NodeId.EURASIA, nm.newNode(NodeId.EURASIA));
    map.set(NodeId.PACIFIC, nm.newNode(NodeId.PACIFIC));
    map.set(NodeId.CERVANTES, nm.newNode(NodeId.CERVANTES));
    map.set(NodeId.COBA, nm.newNode(NodeId.COBA));
    map.set(NodeId.TIKAL, nm.newNode(NodeId.TIKAL));
    map.set(NodeId.ORO, nm.newNode(NodeId.ORO));

    return map;
}