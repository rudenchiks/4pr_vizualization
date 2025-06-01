// document.addEventListener("DOMContentLoaded", function() {
//     showTable('build', films);
//     const btnSwitchTable=document.getElementById('bthSwitchTable')
//     btnSwitchTable.addEventListener('click', ()=>{
//         if(btnSwitchTable.innerHTML==='Скрыть таблицу'){
//             btnSwitchTable.innerHTML='Показать таблицу';
//             hideTable('build')
//         } else{
//             btnSwitchTable.innerHTML='Скрыть таблицу';
//             showTable('build', films)
//         }
//     })
//     document.getElementById('bthCrateGraph').addEventListener('click', ()=>{
//         drawGraph(films);
//     })
// })

// document.getElementById('bthSwitchTable').addEventListener('click', ()=>{

// })

document.addEventListener("DOMContentLoaded", function() {
    // 1. Показываем таблицу с фильмами при загрузке
    showTable('build', films);

    // 2. Обработчик кнопки "Скрыть/Показать таблицу"
    const btnSwitchTable = document.getElementById('bthSwitchTable');
    btnSwitchTable.addEventListener('click', () => {
        if (btnSwitchTable.textContent === 'Скрыть таблицу') {
            btnSwitchTable.textContent = 'Показать таблицу';
            hideTable('build');
        } else {
            btnSwitchTable.textContent = 'Скрыть таблицу';
            showTable('build', films);
        }
    });

    // 3. Обработчик кнопки "Построить график"
    document.getElementById('bthCrateGraph').addEventListener('click', () => {
        // Проверяем, что данные загружены
        if (!films || films.length === 0) {
            console.error("Нет данных для построения графика!");
            document.getElementById('error').textContent = "Ошибка: нет данных о фильмах";
            return;
        }
        
        // Запускаем построение графика
        drawGraph(films);
    });
});