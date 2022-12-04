import { ucwords } from "src/app/utils/html-utils";

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

export function nodeIdLabelToBaseId(nodeIdLabel: string): string {
    return nodeIdLabel.toLowerCase().replace("_", "-");
}

export function baseIdToNodeIdLabel(baseId: string): string {
    return baseId.toUpperCase().replace("-", "_");
}

export function nodeIdToBaseId(nodeId: NodeId): string {
    return nodeIdLabelToBaseId(nodeId.toString());
}

export function nodeIdToName(nodeId: NodeId): string {
    return ucwords(nodeId.toLowerCase().replace("_", " "));
}

export function baseIdToNodeId(baseId: string): NodeId {
    const nodeIdLabel: string = baseIdToNodeIdLabel(baseId);

    return (<any>NodeId)[nodeIdLabel];
}