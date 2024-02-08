export function MapListToJson(list: Map<string, any>[]): any {
    const convertedList = list.map((mapInstance) => {
        const obj: { [key: string]: any } = {};
        for (const [key, value] of mapInstance.entries()) {
            obj[key] = value;
        }
        return obj;
    });

    return JSON.stringify(convertedList);
}

export function objectToMap(obj: Object): Map<string, any> {
    return new Map(Object.entries(obj));
}

export function MapToJsonString(map: Map<string, any>): string {
    const obj: { [key: string]: any } = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return JSON.stringify(obj);
}