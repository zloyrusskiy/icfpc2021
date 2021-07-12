import {Edge, Point} from "./types";
import {calcStretchFactor, distance} from "./PointOperations";

interface ValidateStretchCbArgs {
    edge: Edge
    distance1: number
    distance2: number
    curEpsilon: number
    isValid: boolean
}

const validateStretch = (edges: Edge[], vertices1: Point[], vertices2: Point[], epsilon: number, cb: (args: ValidateStretchCbArgs) => void): boolean => {
    return edges.every(([pi1, pi2]) => {
        const distance1 = distance(vertices1[pi1], vertices1[pi2])
        const distance2 = distance(vertices2[pi1], vertices2[pi2])
        const curEpsilon = calcStretchFactor(distance1, distance2)
        const isValid = curEpsilon <= epsilon

        cb({ edge: [pi1, pi2], distance1, distance2, curEpsilon, isValid })

        return isValid
    })
}

export { validateStretch }