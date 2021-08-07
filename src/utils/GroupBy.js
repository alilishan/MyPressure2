
// https://gist.github.com/mikaello/06a76bca33e5d79cdd80c162d7774e9c

const groupBy = keys => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = keys.map(key => obj[key]).join('-');
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

export default groupBy;

/* 
    USAGE

    const groupByBrand = groupBy(['brand']);
    const groupByColor = groupBy(['color']);
    const groupByBrandAndYear = groupBy(['brand', 'produced']);

*/