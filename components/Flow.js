var Packet = require( './Packet' );

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
    this.outstandingPackets = {
        count: 0
    };
    this.addSourceNode( sourceNode );
    this.addDestinationNode( destinationNode );
    this.tcp = {
        //cWin: 1,
        cWin: 3,
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
    for( var i = 0; i < this.packetCount; i++ ) {
            this.packets.push(new Packet( i, 'data', 1024, this.sourceNode, this.destinationNode, this.sendCallback.bind(this) ));
    }

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
};

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
    //this.updateWindowSize( 'success' );

    var newPackets = [];
    var pLength = ( this.tcp.cWin < this.packets.length ) ? this.tcp.cWin : this.packets.length;
    for( var i = 0; i < pLength; i++ ) {
        var packet = this.packets.shift();
        this.outstandingPackets.count++;
        this.outstandingPackets[packet.getId()] = packet;
        newPackets.push(packet);
    }
    this.sourceNode.send( newPackets );
};

module.exports = Flow;
