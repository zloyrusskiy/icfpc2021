// hole
function renderHole(d3el, { holePoints }) {

    const HOLE_CONTAINER = d3el.select("#hole")

    const polygon = HOLE_CONTAINER.selectAll('polygon').data([holePoints])
    const polygonEnter = polygon.enter()
        .append('polygon')
    polygonEnter.merge(polygon)
        .attr('points', (points) => points.map(p => getCoordWithGap(p).join(',')).join(' '))
        .style("fill", "#dadada")
    polygon.exit().remove()

    const vertexGroup = HOLE_CONTAINER
        .selectAll('.vertex')
        .data(getLabeledPoints(holePoints))
    const vertex = vertexGroup.enter().append('g')
    vertex
        .merge(vertexGroup)
        .attr('class', 'vertex')
    vertexGroup.exit().remove()

    vertex
        .append('circle')
        .merge(vertexGroup.select('circle'))
        .attr('cx', point => point.x)
        .attr('cy', point => point.y)
        .attr('r', 3)
        .attr('stroke', 'black')
        .attr('fill', '#dadada')

    vertex.append('text')
        .merge(vertexGroup.select('text'))
        .attr('x', point => point.x + 4)
        .attr('y', point => point.y + 6)
        .attr('font-size', '0.5rem')
        .text(point => point.label)
}


// figure
function renderFigure(d3el, { figure: { edges, vertices } }) {
    const FIGURE_CONTAINER = d3el.select('g.figure')

    const edgeGroup = FIGURE_CONTAINER
        .selectAll('.edge')
        .data(edges)
    const edge = edgeGroup.enter().append('g')
    edge.merge(edgeGroup)
        .attr('class', 'edge')
    edgeGroup.exit().remove()

    edge
        .append('line')
        .merge(edgeGroup.select('line'))
        .attr('x1', edge => getCoordWithGap(vertices[edge[0]])[0])
        .attr('x2', edge => getCoordWithGap(vertices[edge[1]])[0])
        .attr('y1', edge => getCoordWithGap(vertices[edge[0]])[1])
        .attr('y2', edge => getCoordWithGap(vertices[edge[1]])[1])
        .attr('stroke', 'blue')

    const vertexGroup = FIGURE_CONTAINER
        .selectAll('.vertex')
        .data(getLabeledPoints(vertices))
    const vertex = vertexGroup.enter().append('g')
    vertex
        .merge(vertexGroup)
        .attr('class', 'vertex')
    vertexGroup.exit().remove()

    vertex
        .append('circle')
        .merge(vertexGroup.select('circle'))
        .attr('cx', point => point.x)
        .attr('cy', point => point.y)
        .attr('stroke', 'blue')
        .attr('fill', 'white')
        .attr('r', 3)

    vertex.append('text')
        .merge(vertexGroup.select('text'))
        .attr('x', point => point.x + 4)
        .attr('y', point => point.y + 6)
        .attr('font-size', '0.5rem')
        .text(point => point.label)
}