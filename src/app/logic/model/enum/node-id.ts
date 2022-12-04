export enum NodeId {
    NO_ID = "NO_ID",
    MARIANA = "MARIANA",
    E_PRIME = "E_PRIME",
    LITH = "LITH",
    ERPO = "ERPO",
    EVEREST = "EVEREST",
    GAIA = "GAIA",
    MANTLE = "MANTLE",
    CAMBRIA = "CAMBRIA",
    EURASIA = "EURASIA",
    PACIFIC = "PACIFIC",
    CERVANTES = "CERVANTES",
    COBA = "COBA",
    TIKAL = "TIKAL",
    ORO = "ORO"
}

export function nodeIdToBaseId(nodeId: NodeId): string {
    return nodeId.toLowerCase().replace("_", "-");
}

export function nodeIdToName(nodeId: NodeId): string {
    return nodeId.toLowerCase().replace("_", " ");
}