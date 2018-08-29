module.exports = {
    giveSessionData: (req, res) => {
        let info = req.session;
        res.status(200).send(info)
    },
    registerPart1: async (req,res) => {
        const { first_name, last_name, birthday, gender } = req.body

        let camper = await req.app.get('db').register_part1([first_name, last_name, birthday, gender])
        res.status(200).send(camper)
    }
}