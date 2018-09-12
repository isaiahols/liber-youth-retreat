module.exports = {
    addToReqestList: (req, res) => {
        const { first, last, email } = req.body

        req.app.get('db').add_to_mail_list([first, last, email])
            .then(resp => {
                res.status(200).send(resp)
            })
            .catch(err => {
                console.log(err);
            })
    }
}