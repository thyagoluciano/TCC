var DataBase = function(){
    var npc = [
        {
            name: "NPC 1",
            id: 1,
            room: 'praia',
            position:{
                x: 100,
                y: 200
            },
            tile: 7
        },
        {
            name: "NPC 2",
            id: 1,
            room: 'praia',
            position:{
                x: 300,
                y: 400
            },
            tile: 10
        },
    ];

    var db = [
                {
                    "name" : "thyago",
                    "id": null,
                    "attributes" : {
                        "for" : 33,
                        "agi" : 4,
                        "vit" : 2,
                        "int" : 1,
                        "des" : 8,
                        "sor" : 99
                    },
                    equipment: {
                        weapon: {type: "dagger"},
                        torso: {},
                        legs: {},
                        head: {},
                        hands: {},
                        feet: {},
                        belt: {}
                    },
                    "gender" : "M",
                    position: {
                        x: 300,
                        y: 200
                    },
                    direction: false,
                    velocity: 200,
                    frame: 151,
                    room: 'praia'
                },

                {
                    "name" : "karina",
                    "id": null,
                    "attributes" : {
                        "for" : 33,
                        "agi" : 4,
                        "vit" : 2,
                        "int" : 1,
                        "des" : 8,
                        "sor" : 99
                    },
                    equipment: {
                        weapon: {type: "dagger"},
                        torso: {},
                        legs: {},
                        head: {},
                        hands: {},
                        feet: {},
                        belt: {}
                    },
                    "gender" : "M",
                    position: {
                        x: 100,
                        y: 100
                    },
                    direction: false,
                    velocity: 200,
                    frame: 151,
                    room: 'floresta'
                },

                {
                    "name" : "luzia",
                    "id": null,
                    "attributes" : {
                        "for" : 33,
                        "agi" : 4,
                        "vit" : 2,
                        "int" : 1,
                        "des" : 8,
                        "sor" : 99
                    },
                    equipment: {
                        weapon: {type: "dagger"},
                        torso: {},
                        legs: {},
                        head: {},
                        hands: {},
                        feet: {},
                        belt: {}
                    },
                    "gender" : "M",
                    position: {
                        x: 0,
                        y: 0
                    },
                    direction: false,
                    velocity: 200,
                    frame: 151,
                    room: 'praia'
                },

                {
                    "name" : "vense",
                    "id": null,
                    "attributes" : {
                        "for" : 33,
                        "agi" : 4,
                        "vit" : 2,
                        "int" : 1,
                        "des" : 8,
                        "sor" : 99
                    },
                    equipment: {
                        weapon: {type: "dagger"},
                        torso: {},
                        legs: {},
                        head: {},
                        hands: {},
                        feet: {},
                        belt: {}
                    },
                    "gender" : "M",
                    position: {
                        x: 0,
                        y: 0
                    },
                    direction: false,
                    velocity: 200,
                    frame: 151,
                    room: 'floresta'
                }
            ];

    var getDB = function(){
        return db;
    };

    var getNpc = function(){
        return npc;
    }

    return {
        getDb: getDB(),
        getNpc: getNpc()
    }
};

exports.DataBase = DataBase;
