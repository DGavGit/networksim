/**
 * Represents a packet in a network.
 * @constructor
 * @param {String} data
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 */
var Packet = function( data, sourceNode, destinationNode ) {
    this.data = data;
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
}

/**
 * Adds a source node to a packet.
 * @param {Node} sourceNode
 */
Packet.prototype.addSourceNode = function( sourceNode ) {
    this.sourceNode = sourceNode;
}

/**
 * Adds a destination node to a packet.
 * @param {Node} destinationNode
 */
Packet.prototype.addDestinationNode = function( destinationNode ) {
    this.destinationNode = destinationNode;
}

module.exports = Packet;
