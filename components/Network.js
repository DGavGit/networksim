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

    this.flowTable[ this.linkCounter ]  = [];

    return this.linkCounter++;
}

/**
 * Adds a directed flow along a link, starting at one of the nodes.
 * @param {Number} linkId
 * @param {Number} startingNodeId
 * @param {Number} startTime - units of ms (default 0)
 * @param {Number} dataSize - units of Mb
 */
Network.prototype.addFlow = function( linkId, startingNodeId, startTime, dataSize ) {
    var flow = new Flow( this.flowCounter, linkId, startingNodeId, startTime || 0, dataSize );

    this.flowTable[ linkId ].push( flow );

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

module.exports = Network;
