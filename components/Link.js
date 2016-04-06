/**
 * Represents a link in a network.
 * @constructor
 * @param {String} linkId
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 * @param {Number} rate - units of Mb/s
 * @param {Number} bufferCapacity - units of Kb
 */
var Link = function( linkId, sourceNode, destinationNode, rate, bufferCapacity ) {
    this.id = linkId;
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
    this.addRate( rate );
    this.buffer = [];
    this.bufferCapacity = bufferCapacity;
    this.bufferSize = 0;
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
 * Returns the id of a link.
 * @returns {String} id
 */
Link.prototype.getLinkId = function() {
    return this.id;
}

/**
 * Adds a packet to the buffer
 * @param {Packet} packet
 * @returns true if packet is added to buffer
 *          false if buffer is full
 */
Link.prototype.addPacket = function(packet) {
    var packetSize = packet.getSize();
    if (this.bufferSize + packetSize > this.bufferCapacity) {
        return false;
    }

    this.buffer.push(packet);
    this.bufferSize += packetSize;
    return true;
}

/**
 * Removes a packet from the buffer
 * @returns packet if packet is removed from buffer
 *          false if buffer is already empty
 */
Link.prototype.removePacket = function() {
    if (buffer.length == 0) {
        return false;
    }

    var packet = buffer.shift();
    this.bufferSize -= packet.getSize();
    return packet;
}

module.exports = Link;
