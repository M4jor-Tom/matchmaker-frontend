export enum NodeId {
    NO_ID = "NO_ID"
}

export function nodeIdToBaseId(nodeId: NodeId): string {
    return nodeId.toLowerCase().replace("_", "-");    
}