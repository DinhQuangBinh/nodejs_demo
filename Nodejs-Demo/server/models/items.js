module.exports = function (orm, db) {
	db.define('items', {
		id:{type:'serial',key:true},
		name: { type: 'text' },
		itemtype_id: { type: 'number' },
		ccomment: { type: 'number' },
		cview: { type: 'number' },
		cshare: { type: 'number' },
        price: { type: 'number' },
        cost: { type: 'number' },
        clike: { type: 'integer' },
        unit: { type: 'text' },
        user_id: { type: 'number' },
		created: { type: 'date',time:true },
        modified: { type: 'date',time:true }
		});
	};