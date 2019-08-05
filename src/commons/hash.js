import crypto from 'crypto'

export const encrypt = (text) => {
    return new Promise((resolve,reject) => {
        let cipherKey = crypto.createCipher('aes-256-gcm',process.env.REACT_APP_HASH_PASSWORD)
        let hash = cipherKey.update(text,'utf8','base64')
        // let hash = cipherKey.update(text,'utf8','hex')
        // hash += hash.update.final('hex')
        hash += cipherKey.final('base64')

        if(hash.length !== 0){
            resolve(hash)
        }else{
            reject('Hash Not Found')
        }
    })
}