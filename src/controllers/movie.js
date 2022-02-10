const { movie } = require('../utils/prisma');
const prisma = require('../utils/prisma');

const getMovies = async (req, res) => {

    const movies = await prisma.movie.findMany({})

    console.log("test")
    res.json({ data: movies })
}

const getAllScreenings = async (req, res) => {

    const movies = await prisma.movie.findMany({
        include: { screenings: true }
    })

    console.log(movies);
    res.json({ data: movies })
}

const getRuntimes = async (req, res) => {

    console.log(req.query)
    const runtimeParam = {};

    if (req.query["lessthan"]) { runtimeParam.lt = parseInt(req.query.lessthan) };
    if (req.query["greaterthan"]) { runtimeParam.gt = parseInt(req.query.greaterthan) };

    const reqParam = {
        where: {
            runtimeMins: {
                ...runtimeParam
            }
        }
    }
    const movies = await prisma.movie.findMany(reqParam)

    console.log(movies);
    res.json({ data: movies })
}

const getMovieBy = async (req, res) => {

    console.log(req.params)
    const movieProp = Object.getOwnPropertyNames(req.params)[0]
    const moviePropValue = movieProp == "id"
        ? parseInt(Object.values(req.params)[0])
        : Object.values(req.params)[0]

    const movie = await prisma.movie.findFirst({
        where: {
           [movieProp]: moviePropValue
        }
    })

    
    movie ? console.log(movie) : console.log("ERROR: no movie found");
    res.json({ data: movie })
    
}

const updateMovie = async (req, res) => {

    const { id } = req.params
    const {
        title,
        runtimeMins,
        startsAt,
        screeningId
    } = req.body

    var updatedObject = {
        where: { id: Number(id) },
        data: {
            title,
            runtimeMins
        } 
    }

    if ( startsAt && screeningId ) {
        updatedObject = {
            where: { id: Number(id) },
            data: {
                ...updatedObject.data,
                screenings: {
                    update: {
                        where: { id: screeningId },
                        data: {
                            startsAt: startsAt
                        }
                    }
                }
            },
            include: {
                screenings: true
            }
        }
    }

    const movie = await prisma.movie.update(
        updatedObject
    );
    res.json({ data: movie });
}

const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins,
        startsAt,
        screenId
    } = req.body

    let createObject = {
        data: { 
            title,
            runtimeMins
        }
    }

    if ( startsAt && screenId ) {
        createObject = { 
            data: {
                ...createObject.data,
                screenings: {
                    create: {
                        startsAt,
                        screen: {
                            connect: {
                                id: screenId
                            }
                        }
                    }
                }
            },
            include: {
                screenings: true
            }
        }
    }

    const movie = await prisma.movie.create(createObject);
    res.json({ data: movie });
}

module.exports = {
    getMovies,
    getAllScreenings,
    getRuntimes,
    getMovieBy,
    updateMovie,
    createMovie
};
