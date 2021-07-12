const WIDTH = 2000
const HEIGHT = 2000
const GRID_GAP = 10
const GRID_SIZE = Math.ceil(Math.min(WIDTH, HEIGHT) / GRID_GAP)
const CONTAINER = d3.select("#vis-container")

var problem = {}

initInterface()
initVisualization()
devActions()

function devActions() {
    const problem = '{\n' +
        '  "bonuses": [\n' +
        '    {\n' +
        '      "bonus": "GLOBALIST",\n' +
        '      "problem": 41,\n' +
        '      "position": [\n' +
        '        16,\n' +
        '        28\n' +
        '      ]\n' +
        '    }\n' +
        '  ],\n' +
        '  "hole": [\n' +
        '    [\n' +
        '      15,\n' +
        '      0\n' +
        '    ],\n' +
        '    [\n' +
        '      35,\n' +
        '      20\n' +
        '    ],\n' +
        '    [\n' +
        '      20,\n' +
        '      44\n' +
        '    ],\n' +
        '    [\n' +
        '      0,\n' +
        '      24\n' +
        '    ]\n' +
        '  ],\n' +
        '  "epsilon": 1250,\n' +
        '  "figure": {\n' +
        '    "edges": [\n' +
        '      [\n' +
        '        0,\n' +
        '        1\n' +
        '      ],\n' +
        '      [\n' +
        '        0,\n' +
        '        2\n' +
        '      ],\n' +
        '      [\n' +
        '        1,\n' +
        '        3\n' +
        '      ],\n' +
        '      [\n' +
        '        2,\n' +
        '        3\n' +
        '      ],\n' +
        '      [\n' +
        '        2,\n' +
        '        4\n' +
        '      ],\n' +
        '      [\n' +
        '        3,\n' +
        '        4\n' +
        '      ]\n' +
        '    ],\n' +
        '    "vertices": [\n' +
        '      [\n' +
        '        0,\n' +
        '        20\n' +
        '      ],\n' +
        '      [\n' +
        '        20,\n' +
        '        0\n' +
        '      ],\n' +
        '      [\n' +
        '        20,\n' +
        '        40\n' +
        '      ],\n' +
        '      [\n' +
        '        40,\n' +
        '        20\n' +
        '      ],\n' +
        '      [\n' +
        '        49,\n' +
        '        45\n' +
        '      ]\n' +
        '    ]\n' +
        '  }\n' +
        '}'

    $('.problem__problem-input').val(problem).trigger('change')
}

function initVisualization() {
    CONTAINER
        .attr('width', WIDTH)
        .attr('height', HEIGHT)

    const grid_container = CONTAINER.append('g').attr('id', 'grid')
    for (let row = 1; row <= GRID_SIZE; row++) {
        for (let col = 1; col <= GRID_SIZE; col++) {
            grid_container
                .append("circle")
                .attr("cx", col * GRID_GAP)
                .attr("cy", row * GRID_GAP)
                .attr("r", 1)
                .style("fill", "#ccc");
        }
    }

    CONTAINER.append('g').attr('id', 'hole')
    CONTAINER.append('g').attr('class', 'figure')
}

function initInterface() {
    // section collapsing
    $('.errors-section .section-content').hide()

    $('body > section h2 a').click(event => {
        let qSection = $(event.target).closest("section")
        if (qSection.hasClass("errors-section")) {
            $('body').toggleClass('error-section_visible')
        }
        qSection.find(".section-content").toggle()
    })

    // keyboard control
    $('html').on('keypress', (event) => {
        if (event.target == $('body').get(0)) {
            let new_solution
            let degree

            switch (event.key) {
                case 'q':
                    console.log("rotate left")
                    degree = -30 * Math.PI / 180
                    new_solution = getSolution().vertices.map(([x, y]) => [
                        Math.round(x * Math.cos(degree) - y * Math.sin(degree)),
                        Math.round(x * Math.sin(degree) + y * Math.cos(degree))
                    ])
                    updateSolution({ vertices: new_solution })
                    break;
                case 'w':
                    console.log("move up")
                    new_solution = getSolution().vertices.map(([x,y]) => [x, y - 1])
                    updateSolution({ vertices: new_solution })
                    break;
                case 'e':
                    console.log("rotate right")
                    degree = 30 * Math.PI / 180
                    new_solution = getSolution().vertices.map(([x, y]) => [
                        Math.round(x * Math.cos(degree) - y * Math.sin(degree)),
                        Math.round(x * Math.sin(degree) + y * Math.cos(degree))
                    ])
                    updateSolution({ vertices: new_solution })
                    break;
                case 'a':
                    console.log("move left")
                    new_solution = getSolution().vertices.map(([x,y]) => [x - 1, y])
                    updateSolution({ vertices: new_solution })
                    break;
                case 's':
                    console.log("move down")
                    new_solution = getSolution().vertices.map(([x,y]) => [x, y + 1])
                    updateSolution({ vertices: new_solution })
                    break;
                case 'd':
                    console.log("move right")
                    new_solution = getSolution().vertices.map(([x,y]) => [x + 1, y])
                    updateSolution({ vertices: new_solution })
                    break;
                case 'z':
                    console.log('mirror image horizontal')
                    new_solution = getSolution().vertices.map(([x,y]) => [-x, y])
                    updateSolution({ vertices: new_solution })
                    break;
                case 'x':
                    console.log('mirror image vertical')
                    new_solution = getSolution().vertices.map(([x,y]) => [x, -y])
                    updateSolution({ vertices: new_solution })
                    break;
            }

            event.preventDefault()
            event.stopPropagation()
        }
    })

    // problem handlers
    $('.problem__problem-input').on('change', (event) => {
        problem = JSON.parse(event.target.value)

        handleProblemUpdated()
    })

    $('.problem__solution-input').on('change', (event) => {
        updateSolution(JSON.parse(event.target.value))
    })

}

function handleProblemUpdated() {
    console.log('updating problem', problem)

    renderHole(CONTAINER, { holePoints: problem.hole })
    updateSolution({ vertices: problem.figure.vertices})
}

function getSolution() {
    return JSON.parse($('.problem__solution-input').val())
}

function updateSolution(new_solution) {
    console.log('updating solution', new_solution)

    $('.problem__solution-input').val(JSON.stringify(new_solution))

    renderFigure(CONTAINER, { figure: { edges: problem.figure.edges, vertices: new_solution.vertices } })
}

function getCoordWithGap(point) {
    return point.map(coord => (coord + 1) * GRID_GAP)
}

function getLabeledPoints(points) {
    return points.map((point, index) => {
        const pointWithGap = getCoordWithGap(point)

        return {
            label: `${index + 1}`,
            x: pointWithGap[0],
            y: pointWithGap[1]
        }
    })
}