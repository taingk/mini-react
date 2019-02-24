export default function type_check(check, type) {
    switch (true) {
        case check === null && type === 'null':
        case Array.isArray(check) && type === 'array':
        case check === undefined && type === 'undefined':
        case typeof check === type && check !== null && !Array.isArray(check):
            return true;
        default:
            return false;
    }
}
