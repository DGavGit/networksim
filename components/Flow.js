var TCP_SLOW_START = 'SLOW_START';
var TCP_CONGESTION_AVOIDANCE = 'CONGESTION_AVOIDANCE';
var TCP_FAST_RECOVERY = 'FAST_RECOVERY';

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
    this.packetCount = dataSize * 1024;
    this.packets = [];
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
    this.tcp = {
        cWin: 1,
        ssThresh: 1,
        growthMode: TCP_SLOW_START
    };
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

Flow.prototype.sendData = function() {
    // Generate packets
    for( var i = 0; i < this.packetCount; i++ )
        this.packets.push(new Packet( i, 1024, this.sourceNode, this.destinationNode, this.sendCallback ));

    this.sendMorePackets();
}

Flow.prototype.sendCallback = function( ackNumber ) {
    if( this.outstandingPackets[ackNumber] ) {
        delete this.outstandingPackets[ackNumber];
        this.outstandingPackets.count--;

        if( this.outstandingPackets.count == 0 )
            this.sendMorePackets();

        return true;
    }

    return false;
}

Flow.prototype.updateWindowSize = function( type ) {
    switch( type ) {
        case 'success':
            this.tcp.cWin *= 2;
            return this.tcp.cWin;
            break;
        default:
            break;
    }

    return false;
}

Flow.prototype.sendMorePackets = function() {
    this.updateWindowSize( 'success' );

    this.outstandingPackets = {
        count: 0
    };

    var newPackets = [];
    for( var i = 0; i < Math.min( this.tcp.cWin, this.packets.length ), i++ ) {
        var packet = this.packets.shift();
        this.outstandingPackets.count++;
        this.outstandingPackets[packet.getId()] = packet;
        newPackets.push(packet);
    }
    this.sourceNode.send( newPackets );
};

module.exports = Flow;
