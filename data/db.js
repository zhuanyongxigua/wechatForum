import R from 'ramda';

export const find = R.curry(function(model, conditions, options) {
    return model.find(conditions).setOptions(options).exec();
})

export const findById = R.curry(function(model, conditions) {
    return model.findById(conditions).exec();
})

export const remove = R.curry(function(model, conditions) {
    return model.remove(conditions).exec();
})

export const update = R.curry(function(model, conditions, data) {
    return model.update(conditions, data).exec();
})
