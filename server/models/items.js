module.exports = function (orm, db) {
	db.define('items', {
		id:{type:'serial',key:true},
		name: { type: 'text' },
		});
	};