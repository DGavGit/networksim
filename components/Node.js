var util = require('util');
var events = require('events');

/**
 * Represents a node in a network.
 * @constructor
 * @param {Number} ID
 */
var Node = function( ID ) {
    this.ID = ID;
}

// Inherit from EventEmitter
util.inherits(Node, events.EventEmitter);

module.exports = Node;
