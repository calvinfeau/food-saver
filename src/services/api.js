export function getMyFoodItems() {
    return fetch('/api/myfood').then((res) => res.json())
}

export function getMyListItems() {
    return fetch('/api/mylist').then((res) => res.json())
}

export function createItem(item) {
    return fetch('/api/item/create', {
        method: 'POST',
        body: JSON.stringify({
            name: item.name,
            category: item.category,
            storage: item.storage,
            quantity: item.quantity
        }),
        headers: {'content-type': 'application/json'}
    })
}

export function editItem(item) {
    return fetch(`/api/item/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: item.name,
            category: item.category,
            storage: item.storage,
            quantity: item.quantity
        }),
        headers: {'content-type': 'application/json'}
    })
}

export function deleteItem(item) {
    return fetch(`/api/item/delete/${item.id}`, {
        method: 'DELETE'}).then((res) => res.json())
}