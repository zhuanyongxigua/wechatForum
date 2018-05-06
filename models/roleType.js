import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let RoleTypeSchema = new Schema({
    code: String,
    id: Number,
    name: String,
    pcode: Object,
    status: Boolean,
    type: String,
    isDel: Boolean
}, {
    timestamps: true
});

let RoleTypeModel = mongoose.model('RoleType', RoleTypeSchema);

export default RoleTypeModel;