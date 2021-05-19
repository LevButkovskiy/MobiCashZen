import { getToken } from './UserUtil';
import { Response, CreateError } from './ResponseUtil';

export const saveImage = (imageData, callback) => {
    let formData = new FormData();
    formData.append("file", imageData);
    formData.append("name", "image");
    
    getToken(function(success, data) {
        if (success) {
            fetch('/api/v1/uploads/save/image', {
                method: 'POST',
                body: formData,
                headers: {
                    'api-token': data.token
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.error == null) {
                    Response(callback, data.imagePath)
                }
                else {
                    Response(callback, data)
                }
            }).catch(function (error) {
                Response(callback, CreateError("ERROR_TRY_AGAIN_LATER", error))
            });
        }
        else {
            Response(callback, CreateError(data.error.key, data.error.message))
        }
    })
}

// export const saveParticipantImage = (imageData, callback) => {
//     let formData = new FormData();
//     formData.append("file", imageData);
//     formData.append("name", "image");
    
//     getToken(function(success, data) {
//         if (success) {
//             fetch('/api/v1/uploads/save/participant', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'api-token': data.token
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.error == null) {
//                     Response(callback, data.imagePath)
//                 }
//                 else {
//                     Response(callback, data)
//                 }
//             }).catch(function (error) {
//                 Response(callback, CreateError("ERROR_TRY_AGAIN_LATER", error))
//             });
//         }
//         else {
//             Response(callback, CreateError(data.error.key, data.error.message))
//         }
//     })
// }

// export const saveFile = (item, callback) => {
//     let formData = new FormData();
//     formData.append("file", item);
//     formData.append("name", "file");
    
//     getToken(function(success, data) {
//         if (success) {
//             fetch('/api/v1/uploads/save/file', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'api-token': data.token
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.error == null) {
//                     Response(callback, data)
//                 }
//                 else {
//                     Response(callback, data)
//                 }
//             }).catch(function (error) {
//                 Response(callback, CreateError("ERROR_TRY_AGAIN_LATER", error))
//             });
//         }
//         else {
//             Response(callback, CreateError(data.error.key, data.error.message))
//         }
//     })
// }