reactions = {
    1: {
        "from": "CH3COOH", "to": "CH3COCl", "reagent": "PCl5"
    },
    2: {
        "from": "CH3COCl", "to": "CH3CONH2", "reagent": "NH3"
    },
    3: {
        "from": "CH3CONH2", "to": "CH3NH2", "reagent": "BR2"
    },
    31: {
        "from": "CH3CONH2", "to": "CH3NHX", "reagent": "BRX"
    },
    4: {
        "from": "CH3NH2", "to": "CH3OH", "reagent": "HNO2"
    },
    41: {
        "from": "CH3NHX", "to": "CH3OH", "reagent": "HNOX"
    },
    5: {
        "from": "CH3CH2OH", "to": "CH3CH2Cl", "reagent": "PCl5"
    },
    6: {
        "from": "CH3CH2Cl", "to": "CH2CH2", "reagent": "KOH"
    },
    7: {
        "from": "CH2CH2", "to": "HCHO", "reagent": "O3,Zn,H2O"
    }
}

class Node:
    def __init__(self, reactionObj, next1, next2=None):
        self.reaction = reactionObj
        self.next1 = next1
        self.nex2 = next2
        
    def __repr__(self):
        if (self != None):
            return str([self.reaction.from_elem, self.reaction.to_elem, self.next1])

class reaction:
    found = False
    chain = []
    lastReaction = None

    def __init__(self, from_elem, to_elem, reagent):
        self.from_elem = from_elem
        self.to_elem = to_elem
        self.reagent = reagent

    def findNext(self, from_elem, to_elem, to_find):
        reaction.found = False
        for i in reactions.values():
            if to_elem in i['from']:
                
                temp_step = reaction(to_elem, i['to'], i['reagent'])
                temp_Node = Node(temp_step, None)
                reaction.lastReaction.next1 = temp_Node
                reaction.chain.append(temp_Node)
                reaction.lastReaction = temp_Node
                
                print(temp_step.from_elem, temp_step.to_elem, temp_step.reagent)
                temp_step.findNext(from_elem, i['to'], to_find)
            if to_elem is i['from'] and to_find is i['to']:
                print("found!")
                reaction.found = True


from_elem = "CH3COOH"
to_elem = "CH3OX"

for i in reactions.values():
    if from_elem in i['from']:
        print("Found source element")
        step1 = reaction(from_elem, i['to'], i['reagent'])
        first_Node = Node(step1, None)
        reaction.chain.append(first_Node)
        reaction.lastReaction = first_Node
        print(step1.from_elem, step1.to_elem, step1.reagent)
        step1.findNext(from_elem, i['to'], to_elem)
        print(reaction.chain)
        if(not reaction.found):
            print("Not found! woan! woan!")
