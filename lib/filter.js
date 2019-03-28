module.exports = {
    /*@summary Verify incoming object by fields and values according
     * verify object conditions,
     * @data - Object consisted by fields and searching values,
     * @return Object {
     * error - String, including wrong field,
     * result - Boolean, appear prccess completion result
     * }
     */
    validate: (data) => {
        const verify = {
            title: (value) => {
                return typeof (value) === 'string'
                    && value.length < 255;
            },
            category: (value) => {
                return typeof (value) === 'string'
                    && value.length < 255;
            },
            description: (value) => {
                return typeof (value) === 'string'
                    && value.length < 255;
            },
            file: (value) => {
                return typeof (value) === 'object';
            },
            id: (value) => {
                return typeof (value) === 'string'
                    && value.length === 24;
            },
            price: (value) => {
                return Number(value) > 0 && Number(value) < 1e9;
            } 
        }
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            if (!verify[keys[i]] || !verify[keys[i]](data[keys[i]])) {
                return {
                    error: 'Wrong field: ' + keys[i],
                    result: false
                };
            }
        }
        return {
            result: true
        };
    },
    /*@summary Convert incoming object with fields values to 
     * regexes according database search conditions,
     * @data - Object consisted by fields and searching values,
     * @return - Object
     */
    filter: (data) => {
        console.dir(data);
        const fields = {
            title: (value) => {
                return new RegExp(value, 'i');
            }
        }
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            data[keys[i]] = fields[keys[i]](data[keys[i]])
        }
        return data;
    }
};