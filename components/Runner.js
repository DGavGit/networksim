/**
 * Represents a runner, the object that deals with the timing and execution of the simulation.
 * @constructor
 * @param {Runner} network
 */
var Runner = function( network ) {
    this.network = network;
    this.eventQueue = [];
}

/**
 * Adds an event to the event queue.
 * @param {Function} e - event
 */
Runner.prototype.addEvent = function( e ) {
    this.eventQueue.push( e );
}

/**
 * Runs the events in the event queue.
 */
Runner.prototype.run = function() {
    for( var i = 0; i < this.eventQueue.length; i++ )
        this.eventQueue[i]();
}

module.exports = Runner;
