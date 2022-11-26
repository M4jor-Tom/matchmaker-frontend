import { cloneObject } from "src/app/utils/data-manipulation";
import * as nm from "./node-model";

export interface SolStarChartModel {
    nodes: nm.NodeModel[]
}

const defaultValue: Readonly<SolStarChartModel> = {
    nodes: []
}

export function cloneDefaultValue(): Readonly<SolStarChartModel> {
    return cloneObject<Readonly<SolStarChartModel>>(defaultValue);
}