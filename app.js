var Network = require( './components/Network' );
var Runner = require( './components/Runner' );

// Create test network
var testingNetwork = new Network();

var nodeId1 = testingNetwork.addNode();
var nodeId2 = testingNetwork.addNode();
var nodeId3 = testingNetwork.addNode();
var nodeId4 = testingNetwork.addNode();

testingNetwork.addLink( nodeId1, nodeId2, 10 );
testingNetwork.addLink( nodeId1, nodeId4, 10 );
testingNetwork.addLink( nodeId2, nodeId3, 10 );
testingNetwork.addLink( nodeId3, nodeId4, 10 );

//testingNetwork.printNetwork();

// Run the test simulation
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

/*
 * Test Case 1
 */
var case1Network = new Network();

var c1NodeId1 = case1Network.addNode();
var c1NodeId2 = case1Network.addNode();

var c1LinkId1 = case1Network.addLink( c1NodeId1, c1NodeId2, 10, 64 );
var case1Flow = case1Network.addFlow( 0, 1, c1NodeId1, c1NodeId2 );
case1Network.printNetwork();
