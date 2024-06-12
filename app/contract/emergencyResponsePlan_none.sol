// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2;

contract EmergencyResponsePlan {
    event functionDone(string);
    enum State {DISABLED, ENABLED, DONE} State s;

    struct Element {
        string ID;
        State status;
    }

    struct StateMemory {
        string envionrment_data;
        string data;
        string report;
        bool real;
        string area;
        string operational_report;
        bool emergency_decision;
        string areaToMitigate;
        string areaToRescue;
    }

    Element[17] elements;
    StateMemory currentMemory;

    address[5] participants = [0x7A224d367EB99e849dC80F3d7b9FAC9E03Fe8Be0, 0x7A224d367EB99e849dC80F3d7b9FAC9E03Fe8Be0, 0x7A224d367EB99e849dC80F3d7b9FAC9E03Fe8Be0,
    0x7A224d367EB99e849dC80F3d7b9FAC9E03Fe8Be0, 0x7A224d367EB99e849dC80F3d7b9FAC9E03Fe8Be0];
    mapping(address => string) roles;
  
    constructor() {
        elements[1] = Element("StartEvent_0krg75r", State.ENABLED);

        StartEvent_0krg75r();
        emit functionDone("Contract creation");
    }

     modifier checkParticipant(uint8 index){
        require(msg.sender == participants[index]);
        _;
    } 
    


    fallback() external payable {    }

    receive() external payable  {    }

    function StartEvent_0krg75r() private {
        require(elements[1].status == State.ENABLED);
        done(1);
        enable("Message_1o8gxqk", 2);

    }

    function possible_emergency(string memory envionrment_data) public checkParticipant(0) {
        require(elements[2].status == State.ENABLED);
        done(2);
        currentMemory.envionrment_data = envionrment_data;
        enable("incident_notification", 3);
    }

    function incident_notification(string memory data) public checkParticipant(1) {
        require(elements[3].status == State.ENABLED);
        done(3);
        enable("incident_report", 4);
        currentMemory.data = data;
    }

    function incident_report(string memory report, bool real) public checkParticipant(2) {
        require(elements[4].status == State.ENABLED);
        done(4);
        currentMemory.report = report;
        currentMemory.real = real;
        enable("ExclusiveGateway_1c7o0uq", 5);
        ExclusiveGateway_1c7o0uq();
    }

    function ExclusiveGateway_1c7o0uq() private {
        require(elements[5].status == State.ENABLED);
        done(5);
        if (currentMemory.real == true) {enable("evacuate", 6);
        }
        else if (currentMemory.real == false) {enable("EndEvent_0dwaxy7", 7);
            EndEvent_0dwaxy7();
        }
    }

    function evacuate(string memory area) public checkParticipant(1) {
        require(elements[6].status == State.ENABLED);
        done(6);
        currentMemory.area = area;
        enable("ExclusiveGateway_0lceem4", 8);
        ExclusiveGateway_0lceem4();
    }

    function ExclusiveGateway_0lceem4() private {
        require(elements[8].status == State.ENABLED);
        done(8);
        enable("notification", 9);
    }

    function notification(string memory operational_report) public checkParticipant(2) {
        require(elements[9].status == State.ENABLED);
        done(9);
        enable("evaluation", 10);
        currentMemory.operational_report = operational_report;
    }

    function evaluation(bool emergency_decision) public checkParticipant(1) {
        require(elements[10].status == State.ENABLED);
        done(10);
        currentMemory.emergency_decision = emergency_decision;
        enable("ExclusiveGateway_136gbik", 11);
        ExclusiveGateway_136gbik();
    }

    function ExclusiveGateway_136gbik() private {
        require(elements[11].status == State.ENABLED);
        done(11);
        if (currentMemory.emergency_decision == true) {enable("EndEvent_004h30l", 12);
            EndEvent_004h30l();
        }else if(currentMemory.emergency_decision == false) {
            enable("parallelGatewaySplit1", 13);
            parallelGatewaySplit1();
        }
       
    }

    function parallelGatewaySplit1() private {
        require(elements[13].status == State.ENABLED);
        done(13);
        enable("mitigate", 14);
        enable("rescue", 15);
    }

    function mitigate(string memory area) public checkParticipant(1) {
        require(elements[14].status == State.ENABLED);
        done(14);
        currentMemory.area = area;
        enable("parallelGatewayJoin1", 16);
        parallelGatewayJoin1();
    }

    function rescue(string memory area) public checkParticipant(1) {
        require(elements[15].status == State.ENABLED);
        done(15);
        currentMemory.area = area;
        enable("parallelGatewayJoin1", 16);
        parallelGatewayJoin1();
    }

    function parallelGatewayJoin1() private {
        require(elements[16].status == State.ENABLED);
        if(elements[15].status == State.DONE && elements[14].status == State.DONE){
            done(16);
            enable("ExclusiveGateway_0lceem4", 8);
            ExclusiveGateway_0lceem4();
        }
    }


    function EndEvent_004h30l() private {
        require(elements[12].status == State.ENABLED);
        done(12);}

    function EndEvent_0dwaxy7() private {
        require(elements[7].status == State.ENABLED);
        done(7);}

 

   

    function enable(string memory _taskID, uint position) internal {
        elements[position] = Element(_taskID, State.ENABLED);
    }


    function disable(uint elementNum) internal {
        elements[elementNum].status = State.DISABLED;}

    function done(uint elementNum) internal {
        elements[elementNum].status = State.DONE;
        emit functionDone(elements[elementNum].ID);
    }

    function getCurrentState() public view returns (Element[17] memory, StateMemory memory){
        return (elements, currentMemory);
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encode(a)) == keccak256(abi.encode(b));
    }
}