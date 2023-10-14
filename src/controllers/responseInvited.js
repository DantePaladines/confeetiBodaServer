const { Response } = require("../db.js")
const transport = require('../config/mailer.js')


//const Responses = async (req, res) => {
//    try {
//        const {accept, numberGuests, nameGuests, allergies, meatDishes, chickenDishes, fishDishes, name, phone, email} = req.body
//
//        if ( name === "" || phone === "" || email === "") {
//            res.status(500).json("Datos Incompletos")
//        }else{
//            const response = await Response.create({
//                accept : accept,
//                numberGuests : numberGuests,
//                nameGuests : nameGuests,
//                allergies : allergies,
//                meatDishes : meatDishes,
//                chickenDishes : chickenDishes,
//                fishDishes : fishDishes,
//                name : name,
//                phone : phone,
//                email : email
//            })
//
//            //console.log(accept, "ver que me marca")
//
//            //console.log(io)
//
//            if (!accept) {
//                await transport.sendMail({
//                    from: '"Evento de Boda Confeeti" <djkmecdgm65@gmail.com>', // sender address cuenta de administrador de gmail
//                    to: `${email}`, // list of receivers
//                    subject: "Respuesta a la Invitación de Boda", // Subject line
//                    //text: "Estamos agradecidos por estar presente en un dia muy importante", // plain text body
//                    html: `
//                    <h2> Querido ${name},</h2>
//                    <p>
//                        Esperamos que te encuentres bien. Queremos agradecerte por tomarte el tiempo de respondernos y hacernos saber que lamentablemente no podrás asistir a nuestra boda.
//
//                        Entendemos completamente que las circunstancias personales y los compromisos pueden hacer que no sea posible asistir, y queremos que sepas que no hay ningún problema en ello. Lo más importante para nosotros es que te sientas cómodo y que estés bien.
//
//                        Apreciamos mucho tus buenos deseos y tu cariño, y estamos agradecidos de haberte tenido en cuenta para este día tan especial en nuestras vidas. Aunque no puedas estar físicamente presente, tu apoyo significa mucho para nosotros.
//
//                        Esperamos que podamos encontrarnos en el futuro y celebrar juntos. ¡No dudes en ponerte en contacto en cualquier momento!
//
//                        Una vez más, gracias por ser parte de nuestras vidas y por compartir este momento con nosotros, aunque sea en espíritu.
//
//                        Con cariño,
//                        [Tus Nombres]
//                        Este mensaje muestra comprensión y agradecimiento hacia el invitado que no asistirá, y también deja abierta la posibilidad de futuros encuentros. Los novios pueden personalizar el mensaje según su relación con el invitado.
//
//                    </p>
//                    <div>
//                        <img src="https://demo2.confeeti.com//Images/invite.png" alt="banner de la boda" />
//                    </div>
//                    `, // html body
//                });
//
//                //io.on('nuevo-dato', response);
//
//                //res.status(201).json("Respuesta enviada")
//
//            }else{
//
//                await transport.sendMail({
//                    from: '"Evento de Boda Confeeti" <djkmecdgm65@gmail.com>', // sender address cuenta de administrador de gmail
//                    to: `${email}`, // list of receivers
//                    subject: "Confirmación de Asistencia a tu Boda", // Subject line
//                    //text: "Estamos agradecidos por estar presente en un dia muy importante", // plain text body
//                    html: `
//                    <h2> Querido ${name},</h2>
//                    <p>
//                        Esperamos que se encuentren muy bien. Queremos agradecerles sinceramente por invitarnos a ser parte de uno de los días más importantes de sus vidas. Es un honor y una alegría para nosotros.
//                    
//                        Con gran entusiasmo. Estamos ansiosos por compartir este día especial con ustedes y celebrar su amor.
//                        
//                        Por favor, háganos saber si hay algún detalle adicional que debamos tener en cuenta o si necesitan nuestra ayuda para cualquier preparativo. Estamos disponibles para colaborar en lo que necesiten.
//                        
//                        Una vez más, gracias por estar presentes en este momento único de nuestras vidas. Esperamos con alegría el día de la boda y estamos seguros de que será un evento inolvidable.
//                        
//                        Con cariño,
//                        [Nombre del cliente]
//                    </p>
//                    <div>
//                        <img src="https://demo2.confeeti.com//Images/invite.png" alt="banner de la boda" />
//                    </div>
//                    `, // html body
//                });
//            }
//
//            //io.on('nuevo-dato', response);
//
//            res.status(201).json("Respuesta enviada")
//        }
//    } catch (error) {
//        res.status(500).json(error.message)
//    }
//}

const Responses = async (datos) => {

    try {
        //const {accept, numberGuests, nameGuests, allergies, meatDishes, chickenDishes, fishDishes, name, phone, email} = req.body

        if ( datos.name === "" || datos.phone === "" || datos.email === "") {
            //res.status(500).json("Datos Incompletos")
            return "Datos Incompletos"

        }else{

            const nombre = await capitalizeFirstLetterName(datos.name)

            const response = await Response.create({
                accept : datos.accept,
                numberGuests : datos.numberGuests,
                nameGuests : datos.nameGuests,
                allergies : datos.allergies,
                meatDishes : datos.meatDishes,
                chickenDishes : datos.chickenDishes,
                fishDishes : datos.fishDishes,
                name : nombre,
                phone : datos.phone,
                email : datos.email
            })

            //console.log(accept, "ver que me marca")

            //console.log(io)

            if (!datos.accept) {
                await transport.sendMail({
                    from: '"Evento de Boda Confeeti" <djkmecdgm65@gmail.com>', // sender address cuenta de administrador de gmail
                    to: `${datos.email}`, // list of receivers
                    subject: "Respuesta a la Invitación de Boda", // Subject line
                    //text: "Estamos agradecidos por estar presente en un dia muy importante", // plain text body
                    html: `
                    <h2> Querid@ ${datos.name},</h2>
                    <p>
                        Esperamos que te encuentres bien. Queremos agradecerte por tomarte el tiempo de respondernos y hacernos saber que lamentablemente no podrás asistir a nuestra boda.

                        Entendemos completamente que las circunstancias personales y los compromisos pueden hacer que no sea posible asistir, y queremos que sepas que no hay ningún problema en ello. Lo más importante para nosotros es que te sientas cómodo y que estés bien.

                        Apreciamos mucho tus buenos deseos y tu cariño, y estamos agradecidos de haberte tenido en cuenta para este día tan especial en nuestras vidas. Aunque no puedas estar físicamente presente, tu apoyo significa mucho para nosotros.

                        Esperamos que podamos encontrarnos en el futuro y celebrar juntos. ¡No dudes en ponerte en contacto en cualquier momento!

                        Una vez más, gracias por ser parte de nuestras vidas y por compartir este momento con nosotros, aunque sea en espíritu.

                        Con cariño,
                        [Tus Nombres]
                        Este mensaje muestra comprensión y agradecimiento hacia el invitado que no asistirá, y también deja abierta la posibilidad de futuros encuentros. Los novios pueden personalizar el mensaje según su relación con el invitado.

                    </p>
                    <div>
                        <img src="https://demo2.confeeti.com//Images/invite.png" alt="banner de la boda" />
                    </div>
                    `, // html body
                });

                //io.on('nuevo-dato', response);

                //res.status(201).json("Respuesta enviada")
                return response

            }else{

                await transport.sendMail({
                    from: '"Evento de Boda Confeeti" <djkmecdgm65@gmail.com>', // sender address cuenta de administrador de gmail
                    to: `${datos.email}`, // list of receivers
                    subject: "Confirmación de Asistencia a tu Boda", // Subject line
                    //text: "Estamos agradecidos por estar presente en un dia muy importante", // plain text body
                    html: `
                    <h2> Querid@ ${datos.name},</h2>
                    <p>
                        Esperamos que se encuentren muy bien. Queremos agradecerles sinceramente por invitarnos a ser parte de uno de los días más importantes de sus vidas. Es un honor y una alegría para nosotros.
                    
                        Con gran entusiasmo. Estamos ansiosos por compartir este día especial con ustedes y celebrar su amor.
                        
                        Por favor, háganos saber si hay algún detalle adicional que debamos tener en cuenta o si necesitan nuestra ayuda para cualquier preparativo. Estamos disponibles para colaborar en lo que necesiten.
                        
                        Una vez más, gracias por estar presentes en este momento único de nuestras vidas. Esperamos con alegría el día de la boda y estamos seguros de que será un evento inolvidable.
                        
                        Con cariño,
                        [Nombre del cliente]
                    </p>
                    <div>
                        <img src="https://demo2.confeeti.com//Images/invite.png" alt="banner de la boda" />
                    </div>
                    `, // html body
                });
            }

            //io.on('nuevo-dato', response);

            //res.status(201).json("Respuesta enviada")
            return response
        }
    } catch (error) {
        //res.status(500).json(error.message)

        return error.message
    }
}

function capitalizeFirstLetterName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

module.exports = {
    Responses
}
