// Configuration
import config from "../config";
import TokenService from "./token-service";

const CategoryApiService = {
    async getCategories() {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/categories`, {
                headers: {
                    Authorization: `bearer ${TokenService.getAuthToken()}`,
                },
            });
            // if (!res.ok) {
            //     const error = await res.json();
            //     Promise.reject(error);
            // }
            return await res.json();
        } catch (error) {
            throw new Error(error);
        }
    },
    getCategory(categoryId) {
        return fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        }).then((res) => {
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
        });
    },
    async postCategory(category) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/categories`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify(category),
            });

            return {
                category: await res.json(),
                path: res.headers.get("Location"),
            };
        } catch (error) {
            throw new Error(error);
        }
        //     !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
        // });
    },
    // updateCategory(category) {
    //     return fetch(`${config.API_ENDPOINT}/categories`, {
    //         method: "PATCH",
    //         headers: {
    //             "content-type": "application/json",
    //             authorization: `bearer ${TokenService.getAuthToken()}`,
    //         },
    //         body: JSON.stringify({ category }),
    //     }).then((res) =>
    //         !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    //     );
    // },
    async updateCategory(category) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/categories/${category.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                    body: JSON.stringify(category),
                }
            );
            if (!res.ok) {
                const response = await res.json();
                throw new Error(response.error.message);
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default CategoryApiService;
