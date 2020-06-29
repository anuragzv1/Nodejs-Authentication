
module.exports.profile = function (req, res) {
    if (req.user.verified == 0) {
        return res.redirect('users/verify/notverified');
    }
    return res.render('profile');
};
