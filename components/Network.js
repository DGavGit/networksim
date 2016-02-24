var Node = require( './Node' );

var nodeTable = {};
var linkTable = {};

var nodeTableLength = 0;

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
    nodeTable[ nodeTableLength ] = new Node( nodeTableLength );
    linkTable[ nodeTableLength ] = [];

    return nodeTableLength++;
}

/**
 * Adds a bidirectional link between two nodes.
 * @param {Number} nodeId1
 * @param {Number} nodeId2
 */
Network.prototype.addLink = function( nodeId1, nodeId2 ) {
    linkTable[ nodeId1 ].push( nodeId2 );
    linkTable[ nodeId2 ].push( nodeId1 );
}

/**
 * Prints the network for debugging purposes.
 */
Network.prototype.printNetwork = function() {
    console.log( linkTable );
    console.log( nodeTable );
}

module.exports = Network;
