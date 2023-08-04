module.exports.home = (req,res) => {
    return res.status(200).json({
        api: [
            {
                url: "/questions/create",
                type: "POST",
                
            }
        ]
    });
}