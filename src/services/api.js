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
        // console.log('response used in jsx: ', res);
        return res.json()
    })
}

export function deleteItem(itemId) {
    // console.log('item ID passed into api: ', itemId)
    return fetch(`/api/item/delete/${itemId}`, {
        method: 'DELETE',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    })
}

export function addToList(itemId) {
    return fetch(`/api/mylist/add/${itemId}`, {
        method: 'PUT',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    }).then(res => {
        // console.log('response used in jsx: ', res);
        return res.json()
    })
}

export function addOne(itemId) {
    return fetch(`api/mylist/${itemId}/add`, {
        method: 'PUT',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    }).then(res => {
        console.log('response used in jsx: ', res);
        return res.json()
    })
}

export function subOne(itemId) {
    return fetch(`api/mylist/${itemId}/sub`, {
        method: 'PUT',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    }).then(res => {
        console.log('response used in jsx: ', res);
        return res.json()
    })
}

export function addAllItems() {
    console.log('addAllItems api reached')
    return fetch('api/myfood', {
    method:'PUT',
    headers: {'Authorization': "Bearer " + tokenService.getToken()}
    })
    // .then(res => {
    //     console.log('response used in jsx: ', res);
    //     return res.json()
    // })
}

export function editSelectedItem(itemId) {
    console.log('editSelectedItem api reached')
    return fetch(`api/mylist/${itemId}/edit`, {
        method:'PUT',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    })
}

export function addSelectedItems() {
    console.log('editSelectedItem api reached')
    return fetch('api/myfood/add', {
        method:'PUT',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}
    })
}

export function saveItems(choice) {
    console.log('editSelectedItem api reached')
    return fetch(`api/mylist/save/${choice}`, {
        method: 'PUT',
        headers: {'Authorization': "Bearer " + tokenService.getToken()}      
    })
}