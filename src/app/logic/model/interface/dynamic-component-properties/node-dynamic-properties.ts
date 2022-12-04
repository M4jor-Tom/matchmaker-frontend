import { cloneObject } from "src/app/utils/data-manipulation"

export interface NodeComponentDynamicProperties {
    baseId: string | undefined,
    waitingPlayersCount: number | undefined,
    isPlayerSubscribed: boolean
}

export const defaultValue: Readonly<NodeComponentDynamicProperties> = {
    baseId: undefined,
    waitingPlayersCount: undefined,
    isPlayerSubscribed: false
};

export function cloneDefaultValue(): Readonly<NodeComponentDynamicProperties> {
    return cloneObject<Readonly<NodeComponentDynamicProperties>>(defaultValue);
}