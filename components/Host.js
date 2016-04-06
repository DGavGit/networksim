var Packet = require( './Packet' );

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

Host.prototype.send = function( packets ) {
    var destination = packets[0].destinationNode; // Choosing the first destination since they should all be the same
    // TODO: get link from router using destination
    var link = this.links[ 0 ].link; // TODO: THIS IS BAD GET RID OF IT

    if ( link.addPackets(packets) ) {
        destination.receivePackets( link );
    }
    
    // TODO: timing stuff


}

Host.prototype.receivePackets = function( link ) {
    var acks = [];
    var packets = link.removePackets( this );

    for( var i = 0; i < packets.length; i++ ) {
        if( packets[i].type == 'ack' ) {
            packets[i].callback( packets[i].id );
        } else { // Packet meant for this destination, create ack with reversed source nad destiation, then send back
            var ack = new Packet( packets[i].id, 'ack', 64, packets[i].destinationNode, packets[i].sourceNode, packets[i].callback );
            acks.push( ack );
        }
    }

    if ( acks.length ) {
        this.send( acks );
    }
}

module.exports = Host;
