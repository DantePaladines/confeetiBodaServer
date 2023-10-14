const { UserBossAdmin } = require("../db.js")
const bcrypt = require("bcryptjs");
const transport = require("../config/mailer.js")

const CreateBossUserAdmin = async (datos) => {
    try {

        //const { name, lastName, password, email } = req.body

        const existUser = await UserBossAdmin.findOne({
            where: {
              email: datos.email,
            },
        });
    
        if (existUser) {
          return "El usuario ya existe con este email";
        }

        const nombre = await capitalizeFirstLetterName(datos.name)
        const apellido = await capitalizeFirstLetterLastName(datos.lastName)
    
        const salt = await bcrypt.genSalt(12);
        const criptPassword = await bcrypt.hash(datos.password, salt);
    
        const adminCreate = await UserBossAdmin.create({
          name: nombre,
          lastName: apellido,
          email: datos.email,
          password: criptPassword,
          bossAdmin: true,
        });
      
        await transport.sendMail({
          from: '"Evento de Boda Confeeti Admin" <djkmecdgm65@gmail.com>',
          to: `${datos.email}`,
          subject: "Respuesta a la Invitación de Boda",
          html: `
              <h2> Querid@ ${datos.name} ${datos.lastName}</h2>
              <p>
                  Palabras de bienvenida
              </p>
              <div>
                  <a href="http://localhost:3000/loginBossAdmin" target="__BLANK">
                      LOGIN
                  </a>
              </div>
          `,
        });
      
        return "Admin creado exitosamente";
        
        //if (datos.name.length === 0 || datos.lastName.length === 0 || datos.password.length === 0 || datos.password.length < 8 || datos.email.length === 0 || !datos.name || !datos.password || !datos.lastName || !datos.email) {
//
        //    //res.status(400).json("Datos Incompletos")
        //    return "Datos Incompletos"
        //}else{
//
        //    const existUser = await UserBossAdmin.findOne({
        //        where : {
        //            email : datos.email
        //        }
        //    })
//
        //    if (existUser) {
        //        //res.status(400).json("El usuario ya existe con este email")
        //        
        //        return "El usuario ya existe con este email"
//
        //    } else {
//
        //        const salt = await bcrypt.genSalt(12) // y cuando se crean las mismas contrasenas??
//
        //        const criptPassword = await bcrypt.hashSync(datos.password, salt)
//
        //        const adminCreate = await UserBossAdmin.create({
        //            name : datos.name,
        //            lastName : datos.lastName,
        //            email : datos.email,
        //            password : criptPassword,
        //            bossAdmin : true
        //        })
//
        //        await transport.sendMail({
        //            from: '"Evento de Boda Confeeti Admin" <djkmecdgm65@gmail.com>', // sender address cuenta de administrador de gmail
        //            to: `${datos.email}`, // list of receivers
        //            subject: "Respuesta a la Invitación de Boda", // Subject line
        //            //text: "Estamos agradecidos por estar presente en un dia muy importante", // plain text body
        //            html: `
        //            <h2> Querid@ ${datos.name} ${datos.lastName}</h2>
        //            <p>
        //                Palabras de bienvenida
        //            </p>
        //            <div>
        //                <a href="http://localhost:3000/loginAdmin" target="__BLANK">
        //                    LOGIN
        //                </a>
        //            </div>
        //            `, // html body
        //        });
        //        //res.status(201).json("Admin Creado")
        //    
        //        return adminCreate
//
        //    }
        //}
        
    } catch (error) {
        //console.log(error.message)
        //res.status(500).json(error.message)
        return error.message
    }
}

function capitalizeFirstLetterName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function capitalizeFirstLetterLastName(lastName) {
    return lastName.charAt(0).toUpperCase() + lastName.slice(1);
}

module.exports = { 
    CreateBossUserAdmin
}