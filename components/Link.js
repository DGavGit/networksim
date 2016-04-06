/**
 * Represents a link in a network.
 * @constructor
 * @param {String} linkId
 * @param {Number} rate - units of Mb/s
 * @param {Number} bufferCapacity - units of Kb
 */
var Link = function( linkId, rate, bufferCapacity ) {
    this.id = linkId;
    this.addRate( rate );
    this.buffer = [];
    this.bufferCapacity = bufferCapacity;
    this.bufferSize = 0;
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
