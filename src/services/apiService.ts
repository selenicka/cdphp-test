import * as apiConstants from '../constants/apiConstants';
import * as apiConfig from '../configs/apiConfig';

export const getSearchResult = (
    category: string,
    searchString: string
) => {
    const urlAPI = apiConstants.API_ENDPOINT + '/search'
        + '?categories=' + category
        + '&search=' + searchString;

    return fetch(urlAPI).then(r => r.json());
};

export const getNamesListByIds = async (
    idList: number[],
    categoryName: string
): Promise<{}> => {
    let categoryConfig = apiConfig.urlAPIStorage[categoryName];
    let categoryIdTemplate = '{' + categoryName + '_id}';
    let url = '';

    if (categoryConfig.searchPattern.indexOf(categoryIdTemplate) !== -1) {
        let requests = idList.map((item: number) => {
            let searchTemplate = categoryConfig.searchPattern
                .replace(categoryIdTemplate, item);

            url = apiConstants.API_ENDPOINT + searchTemplate;

            return fetch(url)
                .then(r => r.json())
                .then((response) => {
                    response['id'] = item;
                    return response;
                });
        });

        return Promise.all(requests);
    }

    if (categoryConfig.requestType === 'post') {
        return fetch(apiConstants.API_ENDPOINT + categoryConfig.searchPattern, {
            method: 'POST',
            body: JSON.stringify(idList)
        })
            .then(r => r.json());
    }

    return fetch(url);
};

export const getNameById = async (
    categoryName: string,
    id?: number
): Promise<{}> => {
    let categoryConfig = apiConfig.urlAPIStorage[categoryName];
    let categoryIdTemplate = '{' + categoryName + '_id}';
    let url = '';

    if (id && categoryConfig.searchPattern.indexOf(categoryIdTemplate) !== -1) {
        let searchTemplate = categoryConfig.searchPattern
            .replace(categoryIdTemplate, id);

        url = apiConstants.API_ENDPOINT + searchTemplate;
    } else {
        url = apiConstants.API_ENDPOINT + categoryConfig.searchPattern;
    }

    return fetch(url)
        .then(r => r.json());
};
