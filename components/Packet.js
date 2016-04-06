/**
 * Represents a packet in a network.
 * @constructor
 * @param {Number} id
 * @param {String} type
 * @param {Number} size
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 * @param {function} callback - for acking packets
 */
var Packet = function( id, type, size, sourceNode, destinationNode, callback ) {
    this.id = id;
    this.type = type;
    this.size = size;
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
    this.callback = callback;
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

/**
 * @returns packet size
 */
Packet.prototype.getSize = function() {
    return this.size;
}

/**
 * @returns packet id 
 */
Packet.prototype.getId = function() {
    return this.id;
}

module.exports = Packet;
