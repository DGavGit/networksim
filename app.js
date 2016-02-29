var Network = require( './components/Network.js' );

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
