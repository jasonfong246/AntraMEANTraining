const names = [
    { userid: 2, name: "Velen" },
    { userid: 56, name: "Illidan" },
    { userid: 23, name: "Muradin" },
    { userid: 12, name: "Sylvanas" },
    { userid: 44, name: "Cenarius" },
    { userid: 4, name: "Gul'Dan" },
  ];
  
const roles = [
    { userid: 2, role: "Mage" },
    { userid: 4, role: "Worlock" },
    { userid: 56, role: "Demon Hunter" },
    { userid: 66, role: "Druid" },
    { userid: 87, role: "Shaman" },
    { userid: 12, role: "Hunter" },
  ];
//expect
//[
// {
//       userid: 2, name:  "Velen", role: "Mage"
//      },
//      {
//        userid: 44, name:  "Cenarius", role: null
//      },
//      ...
//    ]

const result1 = names.map(name => {
    const roleObj = roles.find(role => role.userid === name.userid);
    return {
      userid: name.userid,
      name: name.name,
      role: roleObj ? roleObj.role : null
  };
  });
  
  console.log(result1);
///////////////////////////////////////////////////

const callback1 = (a) => a + 2; // 6
const callback2 = (b) => b * 2; // 12
const callback3 = (c) => c - 2; // 10

function createSequence(initialValue) {
    return function(...callbacks) {
      return callbacks.reduce((acc, callback) => callback(acc), initialValue);
    };
  }
const sequence = createSequence(4); 
const result2 = sequence(callback1, callback2, callback3);

console.log(result2);

/////////////////////////////////////////////////////////////////
  source = [
    ['Foley', 'Chemicals', 'CHEM'],
    ['Foley', 'Chemicals', 'CTO'],
    ['Foley', 'Chemicals', 'LK'],
    ['Foley', 'Chemicals', 'R8'],
    ['Foley', 'Chemicals', 'WT'],
    ['Foley', 'Finishing', 'LB2'],
    ['Foley', 'Finishing', 'LB4'],
    ['Foley', 'Finishing', 'RW1'],
    ['Foley', 'Finishing', 'RW2'],
    ['Foley', 'Line 3', 'LN3'],
    ['Foley', 'Line 3', 'Production Process'],
    ['Foley', 'Line 4', 'LN4'],
    ['Foley', 'Line 4', 'Prod Process'],
    ['Foley', 'Mill General', 'Wastewater Treatment'],
    ['Foley', 'Powerhouse', 'BB1'],
    ['Foley', 'Powerhouse', 'BB2'],
    ['Foley', 'Powerhouse', 'EV5'],
    ['Foley', 'Powerhouse', 'FWE'],
    ['Foley', 'Powerhouse', 'PB1'],
    ['Foley', 'Powerhouse', 'PB2'],
    ['Foley', 'Powerhouse', 'RB2'],
    ['Foley', 'Powerhouse', 'RB3'],
    ['Foley', 'Powerhouse', 'RB4'],
    ['Foley', 'Powerhouse', 'TG2'],
    ['Foley', 'Powerhouse', 'TG3'],
    ['Foley', 'Powerhouse', 'TG4'],
  ];

//change to 
// question3
// hw3: change the data to:
// example: [['Foley', 'Powerhouse', 'TG3', 'Bright']...] --->
// [{
//   name:'Foley',
//   children: [
//     {
//       name: 'Powerhouse',
//       children: [
//         {
//           name: 'TG3',
//           children: [
//             {name: 'Bright', children: []}
//           ]
//         }
//       ]
//     }
//   ] 
// },
// ...] (edited) 

function buildHierarchy(data) {
    const root = [];
    
    data.forEach(path => {
      let currentLevel = root;
      path.forEach((name, index) => {
        let existingPath = currentLevel.find(item => item.name === name);
        if (!existingPath) {
          existingPath = { name, children: [] };
          currentLevel.push(existingPath);
        }
        currentLevel = existingPath.children;
      });
    });
    
    return root;
  }
  
  const result3 = buildHierarchy(source);
  
  console.log(JSON.stringify(result3, null, 2));