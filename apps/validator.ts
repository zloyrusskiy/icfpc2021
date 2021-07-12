// import {distance, calcStretchFactor} from "../src/PointOperations";
import {validateStretch} from "../src/Validator";
import {Edge, Point} from "../src/types";

// import Ajv, {JSONSchemaType} from 'ajv'
//
// interface Problem {
//     hole:
// }
//
// interface ProblemSolution {
//
// }
//
// class InputValidator {
//     const PROBLEM_SCHEMA: JSONSchemaType<MyData> = {
//         type: "object",
//         properties: {
//             hole: {type: "integer"},
//             epsilon: {type: "string"},
//             figure: {type: "object", required: ["edges", "vertices"], additionalProperties: false}
//         },
//         required: ["hole", "epsilon", "figure"],
//         additionalProperties: false,
//     }
// }

const [PROBLEM_DATA, SOLUTION_DATA] = process.argv.slice(2, 3)

if (!PROBLEM_DATA) {
    console.log("no problem given (filename in first arg)")
}

if (!SOLUTION_DATA) {
    console.log("no solution given (filename in second arg)")
}

const edges: Edge[] = [
    [
        7,
        6
    ],
    [
        6,
        3
    ],
    [
        3,
        7
    ],
    [
        3,
        4
    ],
    [
        4,
        7
    ],
    [
        7,
        8
    ],
    [
        8,
        5
    ],
    [
        5,
        4
    ],
    [
        8,
        9
    ],
    [
        9,
        10
    ],
    [
        10,
        7
    ],
    [
        7,
        11
    ],
    [
        11,
        10
    ],
    [
        11,
        6
    ],
    [
        9,
        12
    ],
    [
        12,
        8
    ],
    [
        5,
        1
    ],
    [
        1,
        2
    ],
    [
        2,
        8
    ],
    [
        2,
        0
    ],
    [
        0,
        1
    ]
]

const problem_vertexes: Point[] = [
    [
        0,
        48
    ],
    [
        9,
        34
    ],
    [
        14,
        34
    ],
    [
        27,
        41
    ],
    [
        30,
        53
    ],
    [
        33,
        68
    ],
    [
        44,
        0
    ],
    [
        44,
        58
    ],
    [
        44,
        63
    ],
    [
        56,
        68
    ],
    [
        59,
        53
    ],
    [
        61,
        41
    ],
    [
        89,
        21
    ]
]

const solution_vertices: Point[] = [[11,48],[19,34],[24,34],[37,41],[40,53],[43,68],[53,0],[54,58],[54,63],[66,68],[69,53],[71,41],[100,22]]


const epsilon = 40000

for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        console.log(x,y)
        const new_solution = [...solution_vertices]
        new_solution[0] = [x,y]
        const isGood = validateStretch(
            edges,
            problem_vertexes,
            new_solution,
            epsilon,
            ({edge, curEpsilon, isValid}) => {
                if (!isValid) {
                    if (curEpsilon < 10000) {
                        console.log('*** good epsilon ***')
                        console.log(`problem with edge [${edge[0] + 1}, ${edge[1] + 1}] epsilon ${curEpsilon} > ${epsilon}`)
                    }
                }
            }
        )

        if (isGood) {
                console.log("****** BINGO *********")
                // process.exit(0)
        }

    }
}


