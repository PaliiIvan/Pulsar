


/**
 * @param { String } str String for formating
 * @param { any[] } params Values to insert into a string
 */
function validateString(str: string, params: any[]) {
    const re = /{[0-9]}/g;
    let patternsCount;
    try {
         patternsCount = str.match(re).length;
    } catch(err) {
        throw new Error("String Format Error, string should have: {0} {2} ... {99}");
    }
    

    if(params.length !== patternsCount) {
        throw new Error(`The string expected ${patternsCount} parameters but received ${params.length} parameters`);
    }
}

/**
 * @param { String } str String for formating
 * @param { any[] } params Values to insert into a string
 */
function formatString(str: string, params: any[]) {
    validateString(str, params);
    for (let i = 0; i < params.length; i++) {     
        str = str.replace(`\{${i}\}`, params[i]);
    }
    return str;
}

const _formatString = formatString;
export { _formatString as formatString };