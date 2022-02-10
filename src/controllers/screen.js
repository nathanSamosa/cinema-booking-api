const { screen } = require('../utils/prisma');
const prisma = require('../utils/prisma');

const createScreen = async (req, res) => {

    const {
        screenNum,
        movieId,
        startsAt
    } = req.body

    const createdScreen = await prisma.screen.create({
        data: {
            id: screenNum,
            number: screenNum,
            screenings: {
                create: {
                    movieId: movieId,
                    startsAt: startsAt
                }
            }
        },
        include: { screenings: true }
    })

    res.json({ data: createdScreen })
}


module.exports = {
    createScreen
};