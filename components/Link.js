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
 * Adds a packet array to the buffer
 * @param {Array[Packet]} packets
 * @returns true if packets are added to buffer
 *          false if buffer is full
 */
Link.prototype.addPackets = function(packets) {
    for (var i = 0; i < packets.length; ++i) {
        var packet = packets[i];
        var packetSize = packet.getSize();
        if (this.bufferSize + packetSize > this.bufferCapacity) {
            return false;
        }

        this.buffer.push(packet);
        this.bufferSize += packetSize;
    }

    return true;
}

/**
 * Removes as many packets from the buffer as possible (in a row)
 * @param {Node} destination - to know if we can remove a packet
 * @returns {Array[Packet]} array of packets that were removed
 */
Link.prototype.removePackets = function( destination ) {
    var packets = [];
    for (var i = 0; i < this.buffer.length; ++i) {
        if (this.buffer[0].destinationNode == destination) {
            packets.push(this.buffer.shift());
            this.bufferSize -= packet.getSize();
        } else {
            break;
        }
    }

    return packets;
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
