var Network = require( './components/Network' );
var Runner = require( './components/Runner' );

// Create network
var testingNetwork = new Network();

var nodeId1 = testingNetwork.addNode();
var nodeId2 = testingNetwork.addNode();
var nodeId3 = testingNetwork.addNode();
var nodeId4 = testingNetwork.addNode();

testingNetwork.addLink( nodeId1, nodeId2, 10 );
testingNetwork.addLink( nodeId1, nodeId4, 10 );
testingNetwork.addLink( nodeId2, nodeId3, 10 );
testingNetwork.addLink( nodeId3, nodeId4, 10 );

testingNetwork.printNetwork();

// Run the simulation
var runner = new Runner( testingNetwork );

var test1 = function() {
    console.log( 'Run: 1' );
}
var test2 = function() {
    console.log( 'Run: 2' );
}

runner.addEvent( test1 );
runner.addEvent( test2 );

runner.run();
