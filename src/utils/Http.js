import superagent from 'superagent';


/**
 * @desc Http class - implementation for superagent library
 * @example Http.get(url, params)
 */
export default class Http {

    /**
     * @desc accepts objects, which when used with the GET method will form a query-string
     * @param {string} url
     * @param {object | string | number} params
     * @returns {Promise<any>}
     */

    static get(url, params) {

        return new Promise((resolve, reject) => {
            superagent
                .get(url)
                .set('Accept', 'application/json')
                .query(params)
                .end((error, res) => {
                    if (error) {
                        if (error.status > 400) {
                            console.log(`request status code ${error.status}`)
                        } else if (error.status === 0 || res === undefined) {
                            console.log(`request canceled on client side with status code ${error.status}`)
                            reject(error);
                        } else {
                            reject(res.body);
                        }
                    } else {
                        resolve(res.body)
                    }
                });
        });
    }


    /**
     * @desc A typical JSON POST request, send routing as application/x-www-form-urlencoded
     * @param {string} url
     * @param {object | string | number} params
     * @returns {Promise<any>}
     */
    static post(url, params) {
        return new Promise((resolve, reject) => {
            superagent
                .post(url)
                .type('form')
                .send(params)
                .end((error, res) => {
                    if (error) {
                        if (error.status > 400) {
                            console.log(`request status code ${error.status}`)

                        } else if (error.status === 0 || res === undefined) {
                            console.log(`request canceled on client side with status code ${error.status}`)
                            reject(error);
                        } else {
                            reject(res.body);
                        }
                    } else {
                        resolve(res.body)
                    }
                });
        });
    }
}