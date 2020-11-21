export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function MD5(string) {
    return CryptoJS.MD5(string).toString();
}
// trả về 1 mảng gồm nhiều object
export function getDataFromDocs(docs) {
    let data = [];
    docs.forEach(function(doc){
        data.push(getDataFromDoc(doc));
    });
    return data;
}
export function getDataFromDoc(doc) {
    let data = doc.data();
    data.id = doc.id;
    return data;
}