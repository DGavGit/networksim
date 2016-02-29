/**
 * Represents a link in a network.
 * @constructor
 * @param {String} linkId
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 * @param {Number} rate - units of Mb/s
 */
var Link = function( linkId, sourceNode, destinationNode, rate ) {
    this.id = linkId;
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
    this.addRate( rate );
    this.buffer = [];
    this.setBufferSize( 100 );
}

/**
 * Adds a source node to a link.
 * @param {Node} sourceNode
 */
Link.prototype.addSourceNode = function( sourceNode ) {
    this.sourceNode = sourceNode;
}

/**
 * Adds a destination node to a link.
 * @param {Node} destinationNode
 */
Link.prototype.addDestinationNode = function( destinationNode ) {
    this.destinationNode = destinationNode;
}

/**
 * Adds a data rate to a link.
 * @param {Number} rate - units of Mbps
 */
Link.prototype.addRate = function( rate ) {
    this.rate = rate;
}

/**
 * Sets the buffer size of a link.
 * @param {Number} bufferSize - units of KB
 */
Link.prototype.setBufferSize = function( bufferSize ) {
    this.bufferSize = bufferSize;
}

/**
 * Returns the id of a link.
 * @returns {String} id
 */
Link.prototype.getLinkId = function() {
    return this.id;
}

module.exports = Link;
