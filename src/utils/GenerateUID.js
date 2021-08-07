

const getUID = () => {
    return Math.floor(50 * Math.random()) + "" + (new Date()).getTime();
}

export default getUID;