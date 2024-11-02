export const convertToDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toISOString().split('T')[0];
}