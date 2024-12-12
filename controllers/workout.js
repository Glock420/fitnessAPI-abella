const bcrypt = require('bcryptjs');
const Workout = require('../models/Workout.js');
const { errorHandler } = require('../auth.js');

module.exports.addWorkout = (req, res) => {
	let newWorkout = new Workout({
		userId: req.user.id,
		name: req.body.name,
		duration: req.body.duration
	});

	return newWorkout.save()
	.then(result => res.status(201).send(result))
	.catch(err => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
    return Workout.find({ userId: req.user.id })
    .then(result => {
        if(!result) {
            return res.status(404).send({ error: 'No workouts found' });
        } else {
            return res.status(200).send({ workouts: result });
        }  
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.updateWorkout = (req, res) => {
	let updatedWorkout = {
		name: req.body.name,
		duration: req.body.duration
	};

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout)
    .then(result => {
        if(!result) {
            return res.status(404).send({ error: 'Workout not found' });
        } else {
            return res.status(200).send({
            	message: 'Workout updated successfully',
            	updatedWorkout: result
            });
        }  
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteWorkout = (req, res) => {
    return Workout.findByIdAndDelete(req.params.workoutId)
    .then(result => {
        if(!result) {
            return res.status(404).send({ error: 'Workout not found' });
        } else {
            return res.status(200).send({ message: 'Workout deleted successfully' });
        }  
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.completeWorkoutStatus = (req, res) => {
	let updatedStatus = {
		status: 'completed'
	};

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedStatus)
    .then(result => {
        if(!result) {
            return res.status(404).send({ error: 'Workout not found' });
        } else {
            return res.status(200).send({
            	message: 'Workout status updated successfully',
            	updatedWorkout: result
            });
        }  
    })
    .catch(error => errorHandler(error, req, res));
};