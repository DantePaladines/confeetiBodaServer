const ExcelJS = require('exceljs');
const { UserAdmin, Response } = require("../db")

const Excel = async (req, res) => {
    try {

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Invitados');

        const Datos = await Response.findAll()

        // Agregar datos a la hoja de cálculo (puedes personalizar esto según tus datos)
        worksheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'NAME', key: 'name' },
            { header: 'PHONE', key: 'phone' },
            { header: 'EMAIL', key: 'email' },
            { header: 'ACCEPT', key:'accept' },
            { header: 'NAME GUESTS', key: 'nameGuests' },
            { header: 'NUMBER GUESTS', key: 'numberGuests' },
            { header: 'ALLERGIES', key: 'allergies' },
            { header: 'MEATDISHES', key: 'meatDishes' },
            { header: 'CHICKENDISHES', key: 'chickenDishes' },
            { header: 'FISHDISHES', key: 'fishDishes' },
            // Agregar más columnas según tus necesidades
        ];
  
      // Obtener los datos de tus usuarios (reemplaza esto con tus datos)
      //const usersData = [
      //  {id: Datos.id, name: Datos.name, phone: Datos.phone, email: Datos.email, accept: Datos.accept, nameGuests: Datos.nameGuests, numberGuests: Datos.numberGuests, allergies: Datos.allergies, meatDishes: Datos.meatDishes, chickenDishes: Datos.chickenDishes, fishDishes: Datos.fishDishes}
      //  // Agregar más datos según tus necesidades
      //];
  
      //Datos.forEach((row) => {
      //  worksheet.addRow(row);
      //});

        Datos.forEach((row) => {
          // Modificar el valor de la columna "accept"
          row.accept = row.accept ? 'Aceptado' : 'No Aceptado';
          worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Invitados.xlsx');

        // Enviar el archivo Excel como una respuesta
        await workbook.xlsx.write(res);

        res.end();
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error generando el archivo Excel' });

    }
}

const ExcelDrive = async (req, res) => {
    try {

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Invitados');

        const Datos = await Response.findAll()

        // Agregar datos a la hoja de cálculo (puedes personalizar esto según tus datos)
        worksheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'NAME', key: 'name' },
            { header: 'PHONE', key: 'phone' },
            { header: 'EMAIL', key: 'email' },
            { header: 'ACCEPT', key:'accept' },
            { header: 'NAME GUESTS', key: 'nameGuests' },
            { header: 'NUMBER GUESTS', key: 'numberGuests' },
            { header: 'ALLERGIES', key: 'allergies' },
            { header: 'MEATDISHES', key: 'meatDishes' },
            { header: 'CHICKENDISHES', key: 'chickenDishes' },
            { header: 'FISHDISHES', key: 'fishDishes' },
            // Agregar más columnas según tus necesidades
        ];
  
      // Obtener los datos de tus usuarios (reemplaza esto con tus datos)
      //const usersData = [
      //  {id: Datos.id, name: Datos.name, phone: Datos.phone, email: Datos.email, accept: Datos.accept, nameGuests: Datos.nameGuests, numberGuests: Datos.numberGuests, allergies: Datos.allergies, meatDishes: Datos.meatDishes, chickenDishes: Datos.chickenDishes, fishDishes: Datos.fishDishes}
      //  // Agregar más datos según tus necesidades
      //];
  
      Datos.forEach((row) => {
        worksheet.addRow(row);
      });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Invitados.xlsx');

        // Enviar el archivo Excel como una respuesta
        await workbook.xlsx.write(res);

        res.end();
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error generando el archivo Excel' });

    }
}

module.exports = {
    Excel,
    ExcelDrive
}