import { isEmpty } from "lodash";
import { Buffer } from "buffer";

export const getLocalStorage = (item: string) => {
    const auth = localStorage.getItem("auth");

    if (!isEmpty(auth)) {
        const authObj = JSON.parse(auth!);
        if (item === "token") {
            // console.log(authObj.tokens.access.token);
            return authObj.tokens.access.token;
        } else if (item === "user") {
            return authObj.user;
        }
    }
    return null;
};

export const getImageSrc = (img: any) => {
    return !isEmpty(img)
        ? `data:${img.contentType}; base64,${Buffer.from(img.data).toString(
              "base64"
          )}`
        : null;
};
