const states = [
    {
        name: 'acadiana',
        metro1: 'new orleans',
        metro2: 'baton rouge',
        states: ['LA'],
        code: 'AC'
    },
    {
        name: 'alabama',
        metro1: 'birmingham',
        metro2: 'huntsville',
        city2: 'montgomery',
        states: ['AL'],
        code: 'AL'
    },
    {
        name: 'alta sonora',
        states: ['AZ', 'CA', 'NV'],
        metro1: 'tucson',
        metro2: 'yuma',
        city2: 'lancaster',
        code: 'AS'
    },
    {
        name: 'altamaha',
        metro1: 'augusta',
        city2: 'savannah',
        metro2: 'macon',
        states: ['GA'],
        code: 'AM'
    },
    {
        name: 'apalachicola',
        metro1: 'pensacola',
        city1: 'tallahassee',
        metro2: 'mobile',
        states: ['AL', 'FL', 'MS'],
        code: 'AP'
    },
    {
        name: 'apopka',
        metro1: 'orlando',
        metro2: 'ocala',
        city2: 'kissimmee',
        states: ['FL'],
        code: 'AO'
    },
    {
        name: 'atlanta',
        metro1: 'atlanta',
        metro2: 'N/A',
        city2: 'sandy springs',
        states: ['GA']
    },
    {
        name: 'big sky',
        states: ['ID', 'MT', 'ND', 'OR', 'WA'],
        city1: 'spokane',
        metro1: 'spokane',
        metro2: 'kennewick',
        city2: 'billings'
    },
    {
        name: 'calistoga',
        states: ['CA'],
        metro1: 'sacramento',
        metro2: 'santa rosa'
    },
    {
        name: "cascadia",
        city1: "anchorage",
        city2: "tacoma",
        metro1: "anchorage",
        metro2: "olympia",
        states: ['AK', 'OR', 'WA']
    },
    {
        name: 'chatohuchi',
        metro1: 'columbus',
        metro2: 'gainesville',
        city2: 'albany',
        states: ['GA']
    },
    {
        name: 'cosoy',
        metro1: 'san diego',
        metro2: 'N/A',
        city2: 'chula vista',
        states: ['CA']
    },
    {
        name: 'delta',
        metro1: 'memphis',
        metro2: 'jackson, tn',
        states: ['AR', 'KY', 'MS', 'TN']
    },
    {
        name: 'denver',
        states: ['CO'],
        metro1: 'denver',
        metro2: 'boulder',
        city2: 'aurora'
    },
    {
        name: 'east piedmont',
        metro1: 'raleigh',
        metro2: 'durham',
        states: ['NC']
    },
    {
        name: 'estacado',
        metro1: 'colorado springs',
        metro2: 'lubbock',
        states: ['CO', 'KS', 'OK', 'NM', 'TX']
    },
    {
        name: 'glades',
        metro1: 'north port',
        metro2: 'cape coral',
        city1: 'cape coral',
        city2: 'lakeland',
        states: ['FL']
    },
    {
        name: 'inland empire',
        metro1: 'riverside',
        metro2: 'N/A',
        city2: 'san bernadino',
        states: ['CA']
    },
    {
        name: 'laramidia',
        states: ['CO', 'NV', 'UT', 'WY'],
        metro1: 'salt lake city',
        metro2: 'ogden',
        city2: 'fort collins'
    },
    {
        name: 'mojave',
        states: ['AZ', 'CA', 'NV', 'UT'],
        metro1: 'las vegas',
        metro2: 'prescott',
        city2: 'henderson'
    },
    {
        name: 'navajo',
        states: ['CO', 'NM', 'UT'],
        metro1: 'albuquerque',
        metro2: 'santa fe',
        city2: 'mesa'
    },
    {
        name: 'north tequesta',
        metro1: '[miami]',
        metro2: 'N/A',
        city1: 'ft. lauderdale',
        city2: 'pompano beach',
        states: ['FL']
    },
    {
        name: 'oklahoma',
        metro1: 'oklahoma city',
        metro2: 'tulsa',
        states: ['OK']
    },
    {
        name: 'ouachita',
        metro1: 'little rock',
        metro2: 'jackson',
        city2: 'shreveport',
        states: ['AR', 'LA', 'TX']
    },
    {
        name: 'orange',
        metro1: '[los angeles]',
        metro2: 'N/A',
        city1: 'anaheim',
        city2: 'santa ana',
        states: ['CA']
    },
    {
        name: 'pacifica',
        metro1: 'honolulu',
        metro2: 'oxnard',
        states: ['AS', 'CA', 'GU', 'HI', 'MP']
    },
    {
        name: 'pamlico',
        metro1: 'virginia beach',
        metro2: 'greenville',
        city2: 'chesapeake',
        states: ['NC', 'VA']
    },
    {
        name: 'phoenix',
        metro1: 'phoenix',
        metro2: 'N/A',
        city2: 'scottsdale',
        states: ['AZ']
    },
    {
        name: 'puvunga',
        metro1: 'los angeles',
        metro2: 'N/A',
        city2: 'long beach',
        states: ['CA']
    },
    {
        name: 'rocky top',
        metro1: 'knoxville',
        metro2: 'asheville',
        states: ['NC', 'TN', 'WV']
    },
    {
        name: 'santee',
        states: ['CO', 'IA', 'MN', 'MT', 'NE', 'ND', 'SD'],
        metro1: 'sioux falls',
        metro2: 'fargo'
    },
    {
        name: "seattle",
        states: ["WA"],
        city1: 'seattle',
        city2: 'bellevue',
        metro1: 'seattle',
        metro2: 'N/A'
    },
    {
        name: 'shoshoni',
        states: ['CA', 'ID', 'MT', 'NV', 'OR', 'WY'],
        city1: 'reno',
        metro2: 'reno',
        metro1: 'boise',
        city2: 'reno'
    },
    {
        name: 'shevaanga',
        states: ['CA'],
        metro1: '[los angeles]',
        metro2: 'N/A',
        city1: 'pomona',
        city2: 'pasadena'
    },
    {
        name: 'sierra oeste',
        metro1: 'san francisco',
        metro2: 'san jose',
        city1: 'san jose',
        city2: 'san francisco',
        states: ['CA']
    },
    {
        name: 'south tequesta',
        metro1: 'miami',
        metro2: 'N/A',
        city2: 'hialeah',
        states: ['FL']
    },
    {
        name: 'suisun',
        states: ['CA'],
        metro1: '[san francisco]',
        metro2: 'vallejo',
        city1: 'oakland',
        city2: 'fremont'
    },
    {
        name: 'superior',
        states: ['IA', 'MI', 'MN', 'WI'],
        metro1: 'green bay',
        metro2: 'duluth',
        city2: 'green bay',
        city1: 'rochester'
    },
    {
        name: 'tampa bay',
        metro1: 'tampa',
        metro2: 'N/A',
        city2: 'st. petersburg',
        states: ['FL']
    },
    {
        name: 'tennessee',
        metro1: 'nashville',
        metro2: 'chattanooga',
        states: ['TN']
    },
    {
        name: 'three coasts',
        metro1: 'jacksonville',
        metro2: 'deltona',
        city2: 'port st. lucie',
        states: ['FL']
    },
    {
        name: 'tulare',
        states: ['CA'],
        metro1: 'fresno',
        metro2: 'bakersfield'
    },
    {
        name: 'twin cities',
        states: ['MN'],
        metro1: 'minneapolis',
        metro2: 'N/A',
        city2: 'st. paul'
    },
    {
        name: 'west piedmont',
        metro1: 'charlotte',
        metro2: 'hickory',
        city2: 'concord',
        states: ['NC']
    },
    {
        name: 'willamette',
        states: ['OR'],
        city1: 'portland',
        city2: 'salem',
        metro1: 'portland',
        metro2: 'salem'
    }
]

export default states