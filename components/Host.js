/**
 * Represents a host in a network.
 * @constructor
 * @param {Number} ID
 */
var Host = function( id ) {
    this.id = id;
    this.links = {};
}

/**
 * Adds a link to a host with a specified destination
 * @param {Link} link
 * @param {Node} destinationNode
 */
Host.prototype.addLink = function( link, destinationNode ) {
    this.links[ link.id ] = {
        link: link,
        destination: destinationNode
    };
}

Host.prototype.send = function( packet, callback ) {

}

module.exports = Host;
