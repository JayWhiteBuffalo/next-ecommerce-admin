// const {Category} = require("./models/Category");


const categoryData = [
    {
        name: 'Crystals',
        parent: null,
        properties: [
            {
                name: "size",
                values: [
                    "small",
                    "medium",
                    "large",
                    "x-large",
                ]
            },
            {
                name: "color",
                values:[
                    "red",
                    "yellow",
                    "green",
                    "blue",
                    "purple",
                    "dark",
                    "pink",
                    "white",
                    "clear",
                    "multi-colored",
                    "other"
                ]
            },
            {
                name: "second_color",
                values:[
                    "red",
                    "yellow",
                    "green",
                    "blue",
                    "purple",
                    "dark",
                    "pink",
                    "white",
                    "clear",
                    "multi-colored",
                    "other"
                ]
            },
            {
                name: "primary",
                values:[
                    "creativity",
                    " protection",
                    " health",
                    " abundance",
                    " confidence",
                    " power",
                    " courage",
                    " fortitude",
                    " love",
                    " forgiveness",
                    " growth",
                    " prosperity",
                    " manifestation",
                    " grounding",
                    " calming",
                    " focus",
                    " new beginnings",
                    " balance",
                    " purification",
                    " uplifting",
                    " magic",
                    " hope",
                    " destiny",
                    " stability",
                    " healing",
                    " vitality",
                    " truth",
                    " angles",
                    " past life",
                    " psychic gifts",
                    " intuition"
                ]
            },
            {
                name: "secondary",
                values:[
                    "creativity",
                    " protection",
                    " health",
                    " abundance",
                    " confidence",
                    " power",
                    " courage",
                    " fortitude",
                    " love",
                    " forgiveness",
                    " growth",
                    " prosperity",
                    " manifestation",
                    " grounding",
                    " calming",
                    " focus",
                    " new beginnings",
                    " balance",
                    " purification",
                    " uplifting",
                    " magic",
                    " hope",
                    " destiny",
                    " stability",
                    " healing",
                    " vitality",
                    " truth",
                    " angles",
                    " past life",
                    " psychic gifts",
                    " intuition"
                ]
            },
            {
                name: "third",
                values:[
                    "creativity",
                    " protection",
                    " health",
                    " abundance",
                    " confidence",
                    " power",
                    " courage",
                    " fortitude",
                    " love",
                    " forgiveness",
                    " growth",
                    " prosperity",
                    " manifestation",
                    " grounding",
                    " calming",
                    " focus",
                    " new beginnings",
                    " balance",
                    " purification",
                    " uplifting",
                    " magic",
                    " hope",
                    " destiny",
                    " stability",
                    " healing",
                    " vitality",
                    " truth",
                    " angles",
                    " past life",
                    " psychic gifts",
                    " intuition"
                ]
            },
            {
                name: "chakra",
                values:[
                    "root",
                    "sacral",
                    "solar plexus",
                    "heart",
                    "throat",
                    "third eye",
                    "crown",
                    "multiple",
                    "all"
                ]
            },
            {
                name:"state",
                values:[
                    "raw",
                    "rough",
                    "cut",
                    "tumbled",
                    "natural",
                    "unknown",
                ]
            }

        ]
    },
    {
        name: "Jewlery",
        parent: null,
        properties: [],
    },
    {
        name: "Energy Tools",
        parent: null,
        properties: [],
    },
    {
        name: "Kits",
        parent: null,
        properties: [],
    }
    
]


// const seedCategories = () => Category.bulkWrite(categoryData);

// module.exports = seedCategories;

module.exports = categoryData;