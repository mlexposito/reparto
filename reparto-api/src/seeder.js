const db = require('./database')
const DeliveryPoint = require('./models/DeliveryPoint')
const NewspaperProps = require('./models/NewspaperProps')

/* DeliveryPoint.find({})
    .then( (result) => {
        result.forEach((deliveryPoint) => {
            const newspaper = {
                name: 'Voz',
                quantity: 1,
                dayOfWeek: [0, 1, 2, 3, 4, 5, 6],
                holidays: true,
                active: true
            }
            deliveryPoint.newspapers.push(newspaper)

            deliveryPoint.save()

            console.log(deliveryPoint._id + ' saved')
        })
        console.log('finished')
        //process.exit() 
    }) */

 const NewspaperPropsSeeder = [
     {
         name: 'Voz',
         color: 'red'
     },
     {
         name: 'Nos',
         color: 'blue'
     }
 ]   