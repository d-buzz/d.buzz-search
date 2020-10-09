let config = {
    port: 3030,
    primary_tag: 'hive-193084',
    search_sort: 'newest', 
    search_url: 'https://api.hivesearcher.com/search',
    search_api_key: 'KE1IQAII4KJQT9ATSWMFCEJRWF7XQGSYPKQHKVR7KFK3HXEAIZGZ7UIZG4HU',
    search_api_is_private: false, // if true, need to validate jwt 
    jwt_secret_key: 'dbuzz-hivesearcher-secret',
    jwt_app_signature: 'DbuzzHiveSearcherSign'
}

module.exports = config;

// search_sort: popularity | newest | relevance
// refer to https://hivesearcher.com/api-docs