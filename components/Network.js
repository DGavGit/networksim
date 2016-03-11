var Node = require( './Node' );
var Link = require( './Link' );
var Flow = require( './Flow' );

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
 * @param {Number} dataSize - units of Kb (default 100)
 * @param {Number} sourceNodeId
 * @param {Number} destinationNodeId
 */
Network.prototype.addFlow = function( startTime, dataSize, sourceNodeId, destinationNodeId ) {
    var flow = new Flow( this.flowCounter, startTime || 0, dataSize || 100, this.nodeTable[ this.sourceNodeId ], this.nodeTable[ destinationNodeId ] );

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
 * @param {String} data
 */
Network.prototype.sendData = function( flowId, data ) {
    var flow = this.flowTable[ flowId ];
    var packets = createPackets( data, flow.dataSize );
    console.log(packets);
}

/**
 * Helper function to divide data into packets based on flow size.
 * @param {String} data
 * @param {Number} dataSize - units of Kb
 */
var createPackets = function( data, dataSize ) {
    var packets = [];
    dataSize *= 1024;
    for (var i = 0; i < data.length; i += dataSize) {
        var p = data.substring(i, i + dataSize);
        packets.push(p);
    }
    return packets;
}

module.exports = Network;
