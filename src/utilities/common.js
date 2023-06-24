export function isValidURL(value) {
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
}