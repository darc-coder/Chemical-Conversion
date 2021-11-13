const data = [
    {
        "from": "CH3COOH",
        "to": "CH3COCl",
        "reagent": "PCl5"
    },
    {
        "from": "CH3COCl",
        "to": "CH3CONH2",
        "reagent": "NH3"
    },
    {
        "from": "CH3CONH2",
        "to": "CH3NH2",
        "reagent": "BR2"
    },
    {
        "from": "CH3CONH2", "to": "CH3NHX", "reagent": "BRX"
    },
    {
        "from": "CH3NH2", "to": "CH3OH", "reagent": "HNO2"
    },
    {
        "from": "CH3NHX",
        "to": "CH3OH",
        "reagent": "HNOX"
    },
    {
        "from": "CH3CH2OH",
        "to": "CH3CH2Cl",
        "reagent": "PCl5"
    },
    {
        "from": "CH3CH2Cl",
        "to": "CH2CH2",
        "reagent": "KOH"
    },
    {
        "from": "CH2CH2",
        "to": "HCHO",
        "reagent": "O3,Zn,H2O"
    }
]

class reactions {
    found = false;

    constructor(from_elem, to_elem, reagent) {
        this.from_elem = from_elem
        this.to_elem = to_elem
        this.reagent = reagent
    }

    findNext(from_elem, to_elem, to_find) {

        data.forEach((item, index) => {
            if (item['from'].includes(to_elem)) {
                const temp_step = new reactions(to_elem, item['to'], item['reagent']);
                console.log(temp_step.from_elem, temp_step.to_elem, temp_step.reagent);
                temp_step.findNext(from_elem, item['to'], to_find)
            }
            if (item['from'].includes(to_elem) && item['to'].includes(to_find))
                console.log("found!")
        });
        if (!reactions.found) {
            console.log("Not found! wein! wein!")
            reactions.found = true;
        }
    }
}

