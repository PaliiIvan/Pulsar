/**
 * @param { String } str String for formating
 * @param { any[] } params Values to insert into a string
 */
function formatString(str, params) {
    validateString(str, params);
    for (let i = 0; i < params.length; i++) {     
        str = str.replace(`\{${i}\}`, params[i]);
    }
    return str;
}


/**
 * @param { String } str String for formating
 * @param { any[] } params Values to insert into a string
 */
function validateString(str, params) {
    const re = /{[0-9]}/g;
    let patternsCount;
    try {
         patternsCount = str.match(re).length;
    } catch(err) {
        throw new Error(`String Format Error, string should have: {0} {2} ... {99}`);
    }
    

    if(params.length !== patternsCount) {
        throw new Error(`The string expected ${patternsCount} parameters but received ${params.length} parameters`);
    }
}

module.exports.formatString = formatString;