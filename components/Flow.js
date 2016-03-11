/**
 * Represents a flow in a network.
 * @constructor
 * @param {String} flowId
 * @param {Number} linkId
 * @param {Number} sourceNodeId
 * @param {Number} startTime - units of ms
 * @param {Number} dataSize - units of Mb
 */
var Flow = function( flowId, linkId, sourceNodeId, startTime, dataSize ) {
    this.id = flowId;
    this.linkId = linkId;
    this.sourceNodeId = sourceNodeId;
    this.startTime = startTime;
    this.dataSize = dataSize;
}

module.exports = Flow;
