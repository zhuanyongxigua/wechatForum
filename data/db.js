import R from 'ramda';

export const find = R.curry(function(model, conditions, options) {
    conditions.isDel = false;
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

export const findOneById = R.curry(function(model, id) {
    return model.findOne({_id: id, isDel: false}).exec();
});
