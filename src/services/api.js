import tokenService, {getToken} from '../utils/tokenService'


export function getMyFoodItems() {
    return fetch('/api/myfood', {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => res.json())
}

export function getMyListItems() {
    return fetch('/api/mylist').then((res) => res.json())
}

export function createItem(item) {
    console.log('api service reached')
    console.log(item)
    return fetch('/api/item/create', {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(item)
    }).then(res => res.json())
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
        headers: {
            'content-type': 'application/json',
            'Authorization': "Bearer " + tokenService.getToken()}
    })
}

export function deleteItem(item) {
    return fetch(`/api/item/delete/${item.id}`, {
        method: 'DELETE'}).then((res) => res.json())
}