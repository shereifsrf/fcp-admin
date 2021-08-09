import { omit } from "lodash";
import { stringify } from "querystring";
import { fetchUtils } from "react-admin";
import { getLocalStorage } from "../utils";

const mode = process.env.NODE_ENV;
const serverUrl = process.env.REACT_APP_SERVER_URL;
const localUrl = process.env.REACT_APP_LOCAL_URL;
let apiUrl = mode === "production" ? serverUrl : localUrl;
apiUrl += "/v1";

const fetchJson = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    const token = getLocalStorage("token");
    // console.log(token);
    options.headers.set("Authorization", `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const httpClient = fetchJson;

const MyProviders = {
    getList: (resource: any, params: any) => {
        const { page, perPage } = params.pagination;
        let { field, order } = params.sort;
        switch (field.toString()) {
            case "limit.$numberDecimal":
                field = "limit";
                break;
            case "id":
                field = "_id";
                break;
        }

        const query = {
            sortBy: field + ":" + order,
            page: JSON.stringify(page),
            limit: JSON.stringify(perPage),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.results,
            total: json.totalResults,
        }));
    },

    getOne: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({ id: { $in: [...params.ids] } }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.results }));
    },

    getManyReference: (resource: any, params: any) => {
        const { page, perPage } = params.pagination;
        let { field, order } = params.sort;

        switch (field.toString()) {
            case "limit.$numberDecimal":
                field = "limit";
                break;
            case "id":
                field = "_id";
                break;
        }
        const query = {
            sortBy: field + ":" + order,
            page: JSON.stringify(page),
            limit: JSON.stringify(perPage),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        // const query = {
        //     sortBy: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify({
        //         ...params.filter,
        //         [params.target]: params.id,
        //     }),
        // };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.results,
            total: json.totalResults,
        }));
    },

    update: (resource: any, params: any) => {
        let newParams: any = omit(params!.data, ["id"]);
        if (["campaigns", "campaignapprovals"].includes(resource)) {
            newParams.limit = newParams.limit.$numberDecimal;
        }
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(newParams),
        })
            .then(({ json }) => ({ data: json }))
            .catch((e) => {
                console.log(e);
                return e;
            });
    },

    updateMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({ id: { $in: [...params.ids] } }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.results }));
    },

    create: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: params.previousData })),

    deleteMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({ id: { $in: [...params.ids] } }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json.results }));
    },
};

export default MyProviders;
