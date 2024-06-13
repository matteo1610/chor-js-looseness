/**
 * @file Contract.js
 * @description This file contains the ABI and address of the EmergencyResponsePlan smart contract on the blockchain.
 */

export const contractAbi = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'name': 'functionDone',
    'type': 'event'
  },
  {
    'stateMutability': 'payable',
    'type': 'fallback'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'area',
        'type': 'string'
      }
    ],
    'name': 'evacuate',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bool',
        'name': 'emergency_decision',
        'type': 'bool'
      }
    ],
    'name': 'evaluation',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'getCurrentState',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'string',
            'name': 'ID',
            'type': 'string'
          },
          {
            'internalType': 'enum EmergencyResponsePlan.State',
            'name': 'status',
            'type': 'uint8'
          }
        ],
        'internalType': 'struct EmergencyResponsePlan.Element[17]',
        'name': '',
        'type': 'tuple[17]'
      },
      {
        'components': [
          {
            'internalType': 'string',
            'name': 'envionrment_data',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'data',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'report',
            'type': 'string'
          },
          {
            'internalType': 'bool',
            'name': 'real',
            'type': 'bool'
          },
          {
            'internalType': 'string',
            'name': 'area',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'operational_report',
            'type': 'string'
          },
          {
            'internalType': 'bool',
            'name': 'emergency_decision',
            'type': 'bool'
          },
          {
            'internalType': 'string',
            'name': 'areaToMitigate',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'areaToRescue',
            'type': 'string'
          }
        ],
        'internalType': 'struct EmergencyResponsePlan.StateMemory',
        'name': '',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'data',
        'type': 'string'
      }
    ],
    'name': 'incident_notification',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'report',
        'type': 'string'
      },
      {
        'internalType': 'bool',
        'name': 'real',
        'type': 'bool'
      }
    ],
    'name': 'incident_report',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'area',
        'type': 'string'
      }
    ],
    'name': 'mitigate',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'operational_report',
        'type': 'string'
      }
    ],
    'name': 'notification',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'envionrment_data',
        'type': 'string'
      }
    ],
    'name': 'possible_emergency',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'area',
        'type': 'string'
      }
    ],
    'name': 'rescue',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'stateMutability': 'payable',
    'type': 'receive'
  }
];

export const contractAddress = '0xC35127d8DF3044F46a553ABcA34e84aCDE6b6Bb4';