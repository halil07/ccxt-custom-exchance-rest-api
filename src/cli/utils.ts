const capitalize = (s) => s.length ? (s.charAt (0).toUpperCase () + s.slice (1)) : s;

export const defineRestApi = async (api:any=null, methodName = "request", paths = [], apis= []) => {
    const keys = Object.keys (api)
    for (const key of keys) {
        let i = keys.indexOf(key);
        const value = api[key]
        const uppercaseMethod = key.toUpperCase ()
        const lowercaseMethod = key.toLowerCase ()
        const camelcaseMethod = capitalize (lowercaseMethod)
        if (Array.isArray (value)) {
            for (let k = 0; k < value.length; k++) {
                const path = value[k].trim ()
                const a = defineRestApiEndpoint (methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths)
                // @ts-ignore
                apis.push(a);
            }
            // the options HTTP method conflicts with the 'options' API url path
            // } else if (key.match (/^(?:get|post|put|delete|options|head|patch)$/i)) {
        }
        else if (key.match (/^(?:get|post|put|delete|head|patch)$/i)) {
            const endpoints = Object.keys (value);
            for (let j = 0; j < endpoints.length; j++) {
                const endpoint = endpoints[j]
                const path = endpoint.trim ()
                const config = value[endpoint]
                if (typeof config === 'object') {
                    const a = defineRestApiEndpoint (methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, config)
                    // @ts-ignore
                    apis.push(a);
                } else if (typeof config === 'number') {
                    const a = defineRestApiEndpoint (methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, { cost: config })
                    // @ts-ignore
                    apis.push(a);
                } else {
                    console.error('defineRestApi() API format is not supported, API leafs must strings, objects or numbers');
                }
            }
        } else {
            // @ts-ignore
            await defineRestApi (value, methodName, paths.concat ([ key ]), apis)
        }
    }
    // @ts-ignore
    return apis.reduce((prev, curr) => ({...prev, ...curr}), {});
}

export const defineRestApiEndpoint = (methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, config = {}) => {
    const splitPath = path.split (/[^a-zA-Z0-9]/)
    const camelcaseSuffix  = splitPath.map (capitalize).join ('');
    const camelcasePrefix = [ paths[0] ].concat (paths.slice (1).map (capitalize)).join ('');
    const camelcase  = camelcasePrefix + camelcaseMethod + capitalize (camelcaseSuffix);
    return {[camelcase]: null};
}
