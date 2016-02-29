var Node = require( './Node' );
var Link = require( './Link' );

var nodeTable = {};
var linkTable = {};

var nodeCounter = 0;
var linkCounter = 0;

/**
 * Represents a network.
 * @constructor
 */
var Network = function() {
}

/**
 * Adds a node to the network.
 * @returns {Number} nodeId
 */
Network.prototype.addNode = function() {
    nodeTable[ nodeCounter ] = new Node( nodeCounter );
    linkTable[ nodeCounter ] = [];

    return nodeCounter++;
}

/**
 * Adds a bidirectional link between two nodes.
 * @param {Number} nodeId1
 * @param {Number} nodeId2
 * @param {Number} rate - units of Mb/s
 */
Network.prototype.addLink = function( nodeId1, nodeId2, rate ) {
    var link = new Link( linkCounter, nodeId1, nodeId2, rate );

    linkTable[ nodeId1 ].push( link );
    linkTable[ nodeId2 ].push( link );

    return linkCounter++;
}

/**
 * Prints the network for debugging purposes.
 */
Network.prototype.printNetwork = function() {
    console.log( linkTable );
    console.log( nodeTable );
}

module.exports = Network;
