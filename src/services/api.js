import tokenService, {getToken} from '../utils/tokenService'


export function getMyFoodItems() {
    return fetch('/api/myfood', {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => res.json())
}

export function getMyListItems() {
    return fetch('/api/mylist', {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function createItem(item) {
    // console.log('item being created: ', item)
    return fetch('/api/create', {
        method: 'POST',
        headers: {  
            'content-type': 'application/json',
            'Authorization': "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(item)
    }).then(res => res.json())
}

export function getItem(itemId) {
    // console.log('getItem reached, itemId: ', itemId)
    return fetch(`/api/item/${itemId}`, {
        headers: {
            'Authorization': "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json())

}

export function editItem(item, itemId) {
    // console.log('item passed into api: ', item)
    // console.log('item ID passed into api: ', itemId)
    return fetch(`/api/item/${itemId}/edit`, {
        method: 'PUT',
        headers: {  
            'content-type': 'application/json',
            'Authorization': "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(item)
    }).then(res => {
        console.log('response used in jsx: ', res);
        return res.json()})
}

export function deleteItem(itemId) {
    console.log('item ID passed into api: ', itemId)
    return fetch(`/api/item/delete/${itemId}`, {
        method: 'DELETE',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    }).then(res => res.json())
}