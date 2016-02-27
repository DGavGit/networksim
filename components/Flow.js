/**
 * Represents a flow in a network.
 * @constructor
 * @param {String} flowId
 * @param {Number} startTime - units of ms
 * @param {Number} dataSize - units of KB
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 */
var Flow = function( flowId, startTime, dataSize, sourceNode, destinationNode ) {
    this.id = flowId;
    this.setStartTime( startTime );
    this.setDataSize( dataSize );
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
}

/**
 * Adds a source node to a flow.
 * @param {Node} sourceNode
 */
Flow.prototype.addSourceNode = function( sourceNode ) {
    this.sourceNode = sourceNode;
}

/**
 * Adds a destination node to a flow.
 * @param {Node} destinationNode
 */
Flow.prototype.addDestinationNode = function( destinationNode ) {
    this.destinationNode = destinationNode;
}

/**
 * Sets the start time of a flow.
 * @param {Number} startTime - units of ms
 */
Flow.prototype.setStartTime = function( startTime ) {
    this.startTime = startTime;
}

/**
 * Sets the size of a flow.
 * @param {Number} dataSize - units of MB
 */
Flow.prototype.setDataSize = function( dataSize ) {
    this.dataSize = dataSize;
}

module.exports = Flow;
