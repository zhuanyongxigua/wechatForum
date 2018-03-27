import R from 'ramda';

export const find = R.curry(function(model, conditions) {
    return model.find(conditions).exec();
})

export const findById = R.curry(function(model, conditions) {
    return model.findById(conditions).exec();
})

export const remove = R.curry(function(model, conditions) {
    return model.remove(conditions).exec();
})

export const save = R.curry(function(model) {
    return model.save();
})