const uuid = require('uuid/v4');
const moment = require('moment');

export const headers = [{
	name: "relation",
	displayName: "Device/Users",
	pivotBy: ["deviceId", "userEmail"],
	fields: [{
		"accessor": "deviceId",
		"aggregate": false,
		"minWidth": 200
	}, {
		"accessor": "userEmail",
		"aggregate": false,
		"show": false
	}, {
		"accessor": "uuid",
		"aggregate": true
	}, {
		"accessor": "email",
		"aggregate": true
	}, {
		"accessor": "deviceName",
		"aggregate": true
	}, {
		"accessor": "registered",
		"aggregate": true,
		filterable: false
	}, {
		"accessor": "sessionCookie",
		"aggregate": true
	}, {
		"accessor": "expiredAt",
		"aggregate": true,
		"filterable": false
	}, {
		"accessor": "createdAt",
		"aggregate": true,
		"filterable": false
	}, {
		"accessor": "updatedAt",
		"aggregate": true,
		filterable: false
	}, {
		"accessor": "id",
		"show": false
	}, {
		"accessor": "accessToken",
		"show": false
	}, {
		"accessor": "userId",
		"show": false
	}, {
		"accessor": "serviceType",
		"show": false
	}, {
		"accessor": "tokenExpiredAt",
		"show": false
	}, {
		"accessor": "tokenCreatedAt",
		"show": false
	}, {
		"accessor": "tokenUpdatedAt",
		"show": false
	}, {
		"accessor": "type",
		"show": false
	}, {
		"accessor": "refreshToken",
		"show": false
	}],
	subFields: [{
		"accessor": "type"
	}, {
		"accessor": "id"
	}, {
		"accessor": "accessToken"
	}, {
		"accessor": "refreshToken"
	}, {
		"accessor": "serviceType"
	}, {
		"accessor": "tokenExpiredAt"
	}, {
		"accessor": "tokenCreatedAt"
	}, {
		"accessor": "tokenUpdatedAt"
	}]
}, {
	name: "device",
	displayName: "device",
	fields: [{
		accessor: "deviceId"
	}, {
		accessor: "uuid"
	}, {
		accessor: "email"
	}, {
		accessor: "deviceName"
	}, {
		accessor: "registered",
		filterable: false
	}, {
		accessor: "sessionCookie"
	}, {
		accessor: "expiredAt",
		filterable: false
	}, {
		accessor: "createdAt",
		filterable: false
	}, {
		accessor: "updatedAt",
		filterable: false
	}]
}, {
	name: "devicecode",
	displayName: "device code",
	fields: [{
		accessor: "codeId"
	}, {
		accessor: "code"
	}, {
		accessor: "deviceId"
	}, {
		accessor: "expiredAt",
		filterable: false
	}, {
		accessor: "createdAt",
		filterable: false
	}, {
		accessor: "updatedAt",
		filterable: false
	}]
}, {
	name: "oauth",
	displayName: "Oauth",
	fields: [{
		accessor: "id"
	}, {
		accessor: "accessToken"
	}, {
		accessor: "userId"
	}, {
		accessor: "serviceType"
	}, {
		accessor: "refreshToken"
	}, {
		accessor: "expiredAt",
		filterable: false
	}, {
		accessor: "createdAt",
		filterable: false
	}, {
		accessor: "updatedAt",
		filterable: false
	}]
}, {
	name: "session",
	displayName: "Session",
	fields: [{
		accessor: "id"
	}, {
		accessor: "accessToken"
	}, {
		accessor: "userId"
	}, {
		accessor: "serviceType"
	}, {
		accessor: "expiredAt",
		filterable: false
	}, {
		accessor: "createdAt",
		filterable: false
	}, {
		accessor: "updatedAt",
		filterable: false
	}]
}, {
	name: "userdevice",
	displayName: "User-device",
	fields: [{
		accessor: "id"
	}, {
		accessor: "userId"
	}, {
		accessor: "deviceId"
	}, {
		accessor: "createdAt",
		filterable: false
	}, {
		accessor: "updatedAt",
		filterable: false
	}]
}, {
	name: "users",
	displayName: "Users",
	fields: [{
		accessor: "userId"
	}, {
		accessor: "email"
	}, {
		accessor: "createdAt",
		filterable: false
	}, {
		accessor: "updatedAt",
		filterable: false
	}]
}, {
	name: "clients",
	displayName: "Clients",
	fields: [{
		accessor: "_id",
		filterable: false
	}, {
		accessor: "registrationId"
	}]
}];

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

const device = () => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"deviceId": uuid(),
		"uuid": uuid(),
		"email": `${makeid()}@example.com`,
		"deviceName": `${makeid()}`,
		"registered": (Math.random() >= 0.5),
		"sessionCookie": uuid(),
		"expiredAt": date,
		"createdAt": date,
		"updatedAt": date
	};
};

const devicecode = () => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"codeId": uuid(),
		"code": uuid(),
		"deviceId": uuid(),
		"expiredAt": date,
		"createdAt": date,
		"updatedAt": date
	};
};

const clients = () => {
	return {
		"_id": uuid(),
		"registrationId": uuid()
	};
};

const oauth = () => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"id": uuid(),
		"accessToken": uuid(),
		"userId": uuid(),
		"serviceType": `${makeid()}`,
		"refreshToken": uuid(),
		"expiredAt": date,
		"createdAt": date,
		"updatedAt": date
	};
};

const session = () => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"id": uuid(),
		"accessToken": uuid(),
		"userId": uuid(),
		"serviceType": "common",
		"expiredAt": date,
		"createdAt": date,
		"updatedAt": date
	};
};

const userdevice = () => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"id": uuid(),
		"userId": uuid(),
		"deviceId": uuid(),
		"createdAt": date,
		"updatedAt": date
	};
};

const users = () => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"userId": uuid(),
		"email": `${makeid()}@example.com`,
		"createdAt": date,
		"updatedAt": date
	};
};

const relation = (user, token) => {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	return {
		"deviceId": uuid(),
		"userEmail": user.email,
		"uuid": uuid(),
		"email": `${makeid()}@example.com`,
		"deviceName": `${makeid()}`,
		"registered": (Math.random() >= 0.5),
		"sessionCookie": uuid(),
		"expiredAt": date,
		"createdAt": date,
		"updatedAt": date,
		"id": token.id,
		"accessToken": token.accessToken,
		"userId": user.userId,
		"serviceType": token.serviceType,
		"tokenExpiredAt": token.expiredAt,
		"tokenCreatedAt": token.createdAt,
		"tokenUpdatedAt": token.updatedAt,
		"type": (token.refreshToken ? "oauth" : "session"),
		"refreshToken": token.refreshToken ||  null
	};
};

const range = len => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

export function generateRelation(len = 200) {
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	var userTable = range(len).map(d => {
		return {
			...users()
		};
	});
	var stokens = range(len).map(d => {
		return {
			...session()
		};
	});
	var otokens = range(len).map(d => {
		return {
			...oauth()
		};
	});
	var arr = range(len / 2).map(d => {
		if (d % 2 === 0) {
			return {
				...relation(userTable[d], stokens[d])
			};
		} else {
			return {
				...relation(userTable[d], otokens[d])
			};
		}
	});
	for (var i = arr.length - 1; i >= 0; i--) {
		if (i % 2 === 0) {
			var obj = {
				...arr[i]
			};
			obj.userId = uuid();
			obj.userEmail = `${makeid()}@example.com`;
			arr.push(obj);
			var obj2 = {
				...obj
			};
			obj2.id = uuid();
			obj2.accessToken = uuid();
			obj2.userId = uuid();
			obj2.refreshToken = uuid();
			obj2.type = "oauth";
			obj2.serviceType = "common";
			obj2.expiredAt = date;
			obj2.createdAt = date;
			obj2.updatedAt = date;
			arr.push(obj2);
		}
	}
	return arr;
}

export function generateData(len = 200, dataObj) {
	return range(len).map(d => {
		return {
			...dataObj()
		};
	});
}

export const data = {
	relation: generateRelation(35),
	device: generateData(200, device),
	devicecode: generateData(200, devicecode),
	clients: generateData(200, clients),
	oauth: generateData(200, oauth),
	session: generateData(200, session),
	userdevice: generateData(200, userdevice),
	users: generateData(200, users)
};