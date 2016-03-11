/**
 * Represents a flow in a network.
 * @constructor
 * @param {String} flowId
 * @param {Number} startTime - units of ms
 * @param {Number} dataSize - units of Mb
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 */
var Flow = function( flowId, startTime, dataSize, sourceNode, destinationNode ) {
    this.id = flowId;
    this.startTime = startTime;
    this.dataSize = dataSize;
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
}

/**
 * Adds a source node to a flow.
 * @param {Node} sourceNode
 */
Flow.prototype.addSourceNode = function ( sourceNode ) {
    this.sourceNode = sourceNode;
}

/**
 * Adds a destination node to a flow.
 * @param {Node} destinationNode
 */
Flow.prototype.addDestinationNode = function ( destinationNode ) {
    this.destinationNode = destinationNode;
}

module.exports = Flow;
