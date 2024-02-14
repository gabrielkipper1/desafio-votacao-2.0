import { HttpParams } from "@angular/common/http";

export function InterfaceToQuery(params: any): HttpParams {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
        const value = params[key];
        if (value !== undefined && value !== null) {
            httpParams = httpParams.append(key, value.toString());
        }
    }
    console.log(httpParams.toString());
    return httpParams;
}