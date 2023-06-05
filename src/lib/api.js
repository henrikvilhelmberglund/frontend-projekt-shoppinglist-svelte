export const API_BASE = "/api";

export async function filterByName(name) {
	let json = await getAllLists();
	let ids = [];
	// borde vara custom thingy sen istället för listname
	let result = json.filter((list) => list.listname.includes(name) === true);
	result.forEach((list) => {
		ids.push(list._id);
	});
	console.log(ids);
	return ids;
}

export async function getAllLists() {
	const res = await fetch(`${API_BASE}/lists`);
	let data = await res.json();

	// ser finare ut men kanske inte nödvändigtvis bättre
	let stringifiedData = JSON.stringify(data);
	// console.log(stringifiedData);

	// om man vill loopa
	for (const list of data) {
		// console.log(list.listname);
	}
	return data;
}

// funktion som hämtar en lista med ett speciellt värde
export async function getListUsingID(username, id) {
	const res = await fetch(`${API_BASE}/${username}/lists/${id}`);
	let data = await res.json();

	let stringifiedData = JSON.stringify(data);

	return data;
}

export async function getListsUsingCustomField() {
	const res = await fetch(`${API_BASE}/findlistbykey?key=customfield&value=grupp_e`);
	let data = await res.json();

	let stringifiedData = JSON.stringify(data);

	return data;
}

//  funktion som deletear list-item

export async function deleteListItem(username, listId, listItemId) {
	await fetch(`${API_BASE}/${username}/lists/${listId}/items/${listItemId}`, {
		method: "DELETE",
	});
}

export async function updateListItem(username, itemTitle, listId, listItemId) {
	await fetch(`${API_BASE}/${username}/lists/${listId}/items/${listItemId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: itemTitle,
		}),
	});
}

export async function updateListTitle(listTitle, listId) {
	await fetch(`${API_BASE}/lists/${listId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			listname: listTitle,
		}),
	});
	console.log("updateListTitle() done");
}

//Funktion för att lägga till nytt listitem i befintlig lista
export async function addNewListItem(username, listId, listiteminput) {
	const title = listiteminput;
	const res = await fetch(`${API_BASE}/${username}/lists/${listId}/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: title,
			checked: false,
		}),
	});
	const { list } = await res.json();
}

export async function updateColor(username, color, listId) {
	await fetch(`${API_BASE}/${username}/lists/${listId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			color: color,
		}),
	});
	console.log("updateColor() done");
	return color;
}

export async function createCustomList(listname, color) {
	const customfield = "grupp_e";
	const res = await fetch(`${API_BASE}/lists`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			listname: listname,
			customfield: customfield,
			color: color,
		}),
	});
	// const { list } = await res.json();
}

export async function updateCheckedState(username, currentListId, item_id, checked_state) {
	await fetch(`${API_BASE}/${username}/lists/${currentListId}/items/${item_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			checked: checked_state,
		}),
	});
}
