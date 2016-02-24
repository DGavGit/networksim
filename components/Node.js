var Node = function( ID ) {
    this.ID = ID;
}

Node.prototype.printId = function() {
    console.log( this.ID );
}

module.exports = Node;
