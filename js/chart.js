function createArrGraph(data, key) {
    groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    for (let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Рейтинг'])); // Используем 'Рейтинг'
        arrGraph.push({ labelX: entry[0], values: minMax });
    }
    console.log("Массив для графика:", arrGraph); // Отладка
    return arrGraph;
}


function drawGraph(data) {
    console.log("Данные для графика:", data); // Проверим, что приходит
    // значения по оси ОХ
    let keyX=''
    if(document.getElementById('cityRadio').checked) {
        keyX="Страна";
    }
    if(document.getElementById('yearRadio').checked){
        keyX="Год"
        data.sort((first, second) =>{
            let firstNum=Number(first["Год"]);
            let secondNum=Number(second["Год"]);
            return firstNum-secondNum;
        })
    }
    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    let svg = d3.select("svg")
    svg.selectAll('*').remove();
    document.getElementById('error').innerHTML=''

    // создаем словарь с атрибутами области вывода графика
    attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area);
    const select=document.getElementById('selectTypeGraph');
    const value=select.value
    let flag=true
    // рисуем график
    if(document.getElementById('selectTypeGraph').value==1){
    if(document.getElementById('chbMax').checked){
    createChart(svg, arrGraph, scX, scY, attr_area, "red", 1)
        flag=false
    }
    if(document.getElementById('chbMin').checked){
        createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0)
        flag=false
    } /*else{
        svg.selectAll('*').remove();
        document.getElementById('error').innerHTML='Ошибочка!'
    }*/
    } else{
        if(document.getElementById('chbMax').checked){
            createGist(svg, arrGraph, scX, scY, attr_area, "red", 1)
            flag=false
        }
        if(document.getElementById('chbMin').checked){
            createGist(svg, arrGraph, scX, scY, attr_area, "blue", 0)
            flag=false
        }
    }
    if(flag){
        svg.selectAll('*').remove();
        document.getElementById('error').innerHTML='Ввыберите значение по ОСИ OY!'
    }
}


function createAxis(svg, data, attr_area) {
    const min = 0;  // Минимальный рейтинг
    const max = 10; // Максимальный рейтинг

    // Создаем шкалы
    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.1); // Добавляем отступ между столбцами

    let scaleY = d3.scaleLinear()
        .domain([min, max])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // Создаем оси
    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    // Отрисовываем ось X
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX);

    // Отрисовываем ось Y
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, k) {
    const r = 4;
    console.log(data)
    const shift= (k===1)? 1:-1
    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) +shift + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[k]))
        .attr("transform", `translate(${attr_area.marginX},
${attr_area.marginY})`)
        .style("fill", color)
}

function createGist(svg, data, scaleX, scaleY, attr_area, color, k) {
    const shift = (k === 1) ? 2 : -2;
    
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("line")
        .attr('x1', d => scaleX(d.labelX) + shift + scaleX.bandwidth() / 2)
        .attr('y1', d => scaleY(0))  // Начинаем с нижней точки (Y = 0)
        .attr('x2', d => scaleX(d.labelX) + shift + scaleX.bandwidth() / 2)
        .attr('y2', d => scaleY(d.values[k]))  // Заканчиваем на значении рейтинга
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("stroke", color)
        .style("stroke-width", 3);
}