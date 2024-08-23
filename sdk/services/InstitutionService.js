/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Search for institutions
* Returns a JSON response containing details for institutions that match the query parameters, up to a maximum of ten institutions per query
*
* query String Search query to filter institutions.
* countryUnderscorecodes List Specify which country or countries to include institutions from. Possible values include US, GB, ES, NL, FR, IE, CA, DE, IT, PL, DK, NO, SE, EE, LT, LV, PT, BE.
* products List Filter the Institutions based on whether they support all products listed in products. Possible values include assets, auth, balance, employment, identity, income_verification, investments, liabilities, identity_verification, payment_initiation, standing_orders, transactions, transfer. (optional)
* options String An optional stringified object to filter /institutions/search results. Example: ```json {   \"oauth\": true,   \"include_optional_metadata\": true,   \"include_auth_metadata\": false,   \"include_payment_initiation_metadata\": false,   \"payment_initiation\": {     \"payment_id\": \"some_payment_id\",     \"consent_id\": \"some_consent_id\"   } } ```  (optional)
* returns _institutions_search_get_200_response
* */
const institutionsSearchGET = ({ query, countryUnderscorecodes, products, options }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        query,
        countryUnderscorecodes,
        products,
        options,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  institutionsSearchGET,
};
