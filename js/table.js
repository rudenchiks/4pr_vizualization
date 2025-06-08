// создание таблицы
let showTable = (idTable, data) => {
    let table = d3.select("#" + idTable);
    console.log(table);
    // создание строк таблицы (столько, сколько элементов в массиве)
    let rows = table
        .selectAll("tr")
        .data(data)
        .enter()
        .append('tr')
        .style("display", "");
    // создание ячеек каждой строки на основе каждого элемента массива
    let cells = rows
        .selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);
    // создание шапки таблицы
    let head = table
        .insert("tr", "tr")
        .selectAll("th")
        .data(d => Object.keys(data[0]))
        .enter()
        .append("th")
        .text(d => d);
}

let hideTable=(idTable) =>{
    let table = d3.select("#" + idTable);
    console.log(table);
    let rows = table
        .selectAll('tr')
        .remove()
}


let createTable = (data, idTable) => {
	// находим таблицу
	let table = document.getElementById(idTable);
	
	// формируем заголовочную строку из ключей нулевого элемента массива
	let tr = document.createElement('tr');

	for(key in data[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}

	table.append(tr);	
	
	// самостоятельно сформировать строки таблицы на основе массива data
	data.forEach((item) => {
		// создать новую строку таблицы tr
		let row = document.createElement('tr');
		
		// перебрать ключи очередного элемента массива
		for(key in item) {
			// создать элемент td
			let cell = document.createElement('td');
			
			// занести в него соответствующее значение из массива 
			cell.innerHTML = item[key];
			
			// добавить элемент td к строке
			row.append(cell);
		}
		
		// строку добавить в таблицу
		table.append(row);
	});	
}

let clearTable = (idTable) => {
    // Находим таблицу по id
    let table = document.getElementById(idTable);

    // Проверяем, существует ли таблица
    if (!table) {
        console.error("Таблица с id '" + idTable + "' не найдена.");
        return;
    }

    // Удаляем все строки, начиная с последней
    while (table.rows.length > 0) {
        table.deleteRow(0); // Удаляем первую строку (индекс 0)
    }
};