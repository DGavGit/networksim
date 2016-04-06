var Node = require( './Node' );
var Link = require( './Link' );
var Flow = require( './Flow' );
var Packet = require( './Packet' );
var crypto = require( 'crypto' );

var generateBytes = function(size) {
    return crypto.randomBytes(size * 3 / 4).toString('base64');
};

/**
 * Represents a network.
 * @constructor
 */
var Network = function() {
    this.nodeTable = {};
    this.linkTable = {};
    this.flowTable = {};

    this.nodeCounter = 0;
    this.linkCounter = 0;
    this.flowCounter = 0;
}

/**
 * Adds a node to the network.
 * @returns {Number} nodeId
 */
Network.prototype.addNode = function() {
    this.nodeTable[ this.nodeCounter ] = new Node( this.nodeCounter );
    this.linkTable[ this.nodeCounter ] = [];

    return this.nodeCounter++;
}

/**
 * Adds a bidirectional link between two nodes.
 * @param {Number} nodeId1
 * @param {Number} nodeId2
 * @param {Number} rate - units of Mb/s
 * @param {Number} bufferSize - units of Kb (default 100)
 */
Network.prototype.addLink = function( nodeId1, nodeId2, rate, bufferSize ) {
    var link = new Link( this.linkCounter, nodeId1, nodeId2, rate, bufferSize || 100 );

    this.linkTable[ nodeId1 ].push( link );
    this.linkTable[ nodeId2 ].push( link );

    return this.linkCounter++;
}

/**
 * Adds a directed flow from one node to another.
 * @param {Number} startTime - units of ms (default 0)
 * @param {Number} dataSize - units of Mb (default 10)
 * @param {Number} sourceNodeId
 * @param {Number} destinationNodeId
 */
Network.prototype.addFlow = function( startTime, dataSize, sourceNodeId, destinationNodeId ) {
    var flow = new Flow( this.flowCounter, startTime || 0, dataSize || 10, this.nodeTable[ sourceNodeId ], this.nodeTable[ destinationNodeId ] );

    this.flowTable[ this.flowCounter ] = flow;

    return this.flowCounter++;
}

/**
 * Prints the network for debugging purposes.
 */
Network.prototype.printNetwork = function() {
    console.log( this.linkTable );
    console.log( this.nodeTable );
    console.log( this.flowTable );
}

/**
 * Sends data along a flow in the network.
 * @param {Number} flowId
 * @param {Number} dataSize - units of Mb
 */
Network.prototype.sendData = function( flowId, dataSize ) {
    var flow = this.flowTable[ flowId ];
    flow.sendData( dataSize );

    /*var packets = createPackets( dataSize, flow.dataSize, flow.sourceNode, flow.destinationNode );
    console.log(packets);

    flow.destinationNode.on( 'messageArrived', function( packet ) {
        console.log( 'Message arrived' );
        console.log( 'id: ' + packet.id + '\nsize: ' + packet.size );
        flow.sourceNode.emit( 'ack', packet.id );
    });

    flow.sourceNode.on( 'ack', function( ackNum ) {
        console.log( 'Ack ' + ackNum );
    }, false );

    for (var i = 0; i < packets.length; ++i) {
        flow.destinationNode.emit( 'messageArrived', packets[i] );
    }*/
}

/**
 * Helper function to divide data into packets based on flow size.
 * @param {Number} dataSize - units of Mb
 * @param {Number} flowSize - units of Mb
 * @param {Node} sourceNode
 * @param {Node} destinationNode
 */
var createPackets = function( dataSize, flowSize, sourceNode, destinationNode ) {
    var packets = [];
    for (var i = 0; i < dataSize; i += flowSize) {
        // TODO: Should we pad the last packet to fit dataSize?
        var packet = new Packet( i / flowSize, (flowSize > (dataSize - i) ? (dataSize - i) : flowSize), sourceNode, destinationNode );
        packets.push( packet );
    }
    return packets;
}

module.exports = Network;
