function isUserLogged(req, res, next) {
	if (req.user) {
		next();
	} else {
		return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
	}
}

function isUserGuest(req, res, next) {
	if (req.user) {
		return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
	} else {
		next();
	}
}

function isOwner(req, res, next) {
	if (req.user._id == res.locals.preload.owner?._id) {
		next();
	} else {
		return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
	}
}

function userRole(role) { 
	return (req, res, next) => {
		if (req.user.role === role) {
			next();
		} else {
			return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
		}
	}
}

// TODO... another guards

export {
	isUserLogged,
	isUserGuest,
	isOwner,
	userRole
};
