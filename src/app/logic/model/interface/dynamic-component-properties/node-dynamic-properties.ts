import { cloneObject } from "src/app/utils/data-manipulation"

export interface NodeComponentDynamicProperties {
    waitingPlayersCount: number | undefined
}

export const defaultValue: Readonly<NodeComponentDynamicProperties> = {
    waitingPlayersCount: undefined
};

export function cloneDefaultValue(): Readonly<NodeComponentDynamicProperties> {
    return cloneObject<Readonly<NodeComponentDynamicProperties>>(defaultValue);
}