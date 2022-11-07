const capitalize = (s) => s.length ? (s.charAt (0).toUpperCase () + s.slice (1)) : s;
const apis = [];
export const defineRestApi = (instance, api:any=null, methodName = "request", paths = []) => {
    if(!api){
        api = instance.api;
    }
    const keys = Object.keys (api)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = api[key]
        const uppercaseMethod = key.toUpperCase ()
        const lowercaseMethod = key.toLowerCase ()
        const camelcaseMethod = capitalize (lowercaseMethod)
        if (Array.isArray (value)) {
            for (let k = 0; k < value.length; k++) {
                const path = value[k].trim ()
                const a = defineRestApiEndpoint (instance, methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths)
                // @ts-ignore
                apis.push(a);
            }
        // the options HTTP method conflicts with the 'options' API url path
        // } else if (key.match (/^(?:get|post|put|delete|options|head|patch)$/i)) {
        } else if (key.match (/^(?:get|post|put|delete|head|patch)$/i)) {
            const endpoints = Object.keys (value);
            for (let j = 0; j < endpoints.length; j++) {
                const endpoint = endpoints[j]
                const path = endpoint.trim ()
                const config = value[endpoint]
                if (typeof config === 'object') {
                    const a = defineRestApiEndpoint (instance, methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, config)
                    // @ts-ignore
                    apis.push(a);
                } else if (typeof config === 'number') {
                    const a = defineRestApiEndpoint (instance, methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, { cost: config })
                    // @ts-ignore
                    apis.push(a);
                } else {
                    console.error('defineRestApi() API format is not supported, API leafs must strings, objects or numbers');
                }
            }
        } else {
            // @ts-ignore
            defineRestApi (instance, value, methodName, paths.concat ([ key ]))
        }
    }
    // @ts-ignore
    return apis.reduce((prev, curr) => ({...prev, ...curr}),{});
}
export const defineRestApiEndpoint = (instance, methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, config = {}) => {
    const splitPath = path.split (/[^a-zA-Z0-9]/)
    const camelcaseSuffix  = splitPath.map (capitalize).join ('');
    const camelcasePrefix = [ paths[0] ].concat (paths.slice (1).map (capitalize)).join ('');
    const camelcase  = camelcasePrefix + camelcaseMethod + capitalize (camelcaseSuffix);
    const typeArgument = (paths.length > 1) ? paths : paths[0];
    // handle call costs here
    const options = {};
    const partial = async (params = {}, context = {}) => instance[methodName](path, typeArgument, uppercaseMethod, params, undefined, undefined, config, context)
    // const partial = async (params) => this[methodName] (path, typeArgument, uppercaseMethod, params || {})
    options[camelcase]  = partial;
    return options;
}