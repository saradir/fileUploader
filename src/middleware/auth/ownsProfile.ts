export function ownsProfile(req, res, next) {
    const requestedUserId = Number(req.params.id);

    if(requestedUserId !== req.user.id){
        return res.status(403).send("Access denied");
    }

    next();
}