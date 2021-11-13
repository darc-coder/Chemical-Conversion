let frominput = document.querySelector('#frominput');
let toinput = document.querySelector('#toinput');
let fromDataList = document.querySelector('.from-datalist');
let toDataList = document.querySelector('.to-datalist');

function search(query) {
    let result = new Set();
    query = query.toUpperCase()

    data.forEach((reaction) => {
        if (reaction.from.includes(query))
            result.add(reaction.from);
        if (reaction.to.includes(query))
            result.add(reaction.to);
    });


    const from_elem = "CH3COOH"
    const to_elem = "CH3OH"

    data.forEach((i, index) => {
        if (i['from'].includes(from_elem)) {
            console.log("Found source element")
            const step1 = new reactions(from_elem, i['to'], i['reagent'])
            console.log(step1.from_elem, step1.to_elem, step1.reagent)
            step1.findNext(from_elem, i['to'], to_elem)
        }
    });
    result = Array.from(result).sort();
    return result;
}

function subscriptParser(text = 'a') {
    let textArray = Array.from(text);
    let elementString = '';
    textArray.forEach((element) => {
        if (element.match(/[0-9]/)) {
            elementString += `<sub>${element}</sub>`;
        }
        else
            elementString += element;
    });

    return elementString;
}
function buildDataListOption(array = [], dataList) {
    fromDataList.innerHTML = '';
    toDataList.innerHTML = '';

    if (dataList == fromDataList)
        fromDataList.classList.remove('hidden');
    else
        toDataList.classList.remove('hidden');

    array.forEach((item) => {
        let newdiv = document.createElement('div');
        let newspan1 = document.createElement('span');
        let newspan2 = document.createElement('span');

        newdiv.className = 'options';
        newdiv.setAttribute('value', item);
        newspan1.className = 'value';
        newspan1.innerText = item;
        newspan2.className = 'text';
        newspan2.innerHTML = subscriptParser(item);

        newdiv.onclick = (ev) => { clickOption(ev, dataList) };
        newdiv.append(newspan1, newspan2);
        dataList.append(newdiv);
    });
}

function clickOption(ev, dataList) {
    dataList.innerHTML = '';
    fromDataList.classList.add('hidden');
    toDataList.classList.add('hidden');

    if (dataList == fromDataList)
        frominput.value = ev.currentTarget.getAttribute('value');
    else if (dataList == toDataList)
        toinput.value = ev.currentTarget.getAttribute('value');
}

frominput.onkeyup = (e) => {
    if (frominput.value)
        buildDataListOption(search(frominput.value), fromDataList);
}

toinput.onkeyup = (e) => {
    if (toinput.value)
        buildDataListOption(search(toinput.value), toDataList);
}