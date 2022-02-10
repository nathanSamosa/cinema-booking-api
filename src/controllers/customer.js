const { customer } = require('../utils/prisma');
const prisma = require('../utils/prisma');

const createCustomer = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body;

    const createdCustomer = await prisma.customer.create({
        data: {
            name,
            contact: {
                create: {
                    phone,
                    email
                }
            }
        },
        include: { 
            contact: true
        }
    })

    res.json({ data: createdCustomer });
}

const updateCustomer = async (req, res) => {

    const { id } = req.params
    const {
        name,
        phone,
        email
    } = req.body

    var customerData = {
            name
    }

    if (phone || email) {
        customerData = {
            ...customerData.data,
            contact: {
                update: {
                    phone: phone,
                    email: email
                }
            }
        }
    }

    const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: customerData,
        include: { contact: true }
    })

    res.json({ data: customer })
}



module.exports = {
    createCustomer,
    updateCustomer
};
