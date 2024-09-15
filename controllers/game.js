async function getGameDetails(req, res) {
    const { gameId } = req.params;
    res.send(`Game: ${gameId}} page`)
};

async function addGame(req, res) {
    const { gameId } = req.params;
    res.send(`Game: ${gameId}} page`)
};

async function deleteGame(req, res) {
    const { gameId } = req.params;
    res.send(`Game: ${gameId}} has been deleted`)
};

module.exports = {
    getGameDetails,
    addGame,
    deleteGame,
}