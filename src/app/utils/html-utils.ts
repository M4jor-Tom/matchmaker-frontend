export function getElementByIdOrThrow<T extends HTMLElement>(id: string): T {
    const element: HTMLElement | null = document.getElementById(id);
    
    if(element === null) {
        throw new Error("No element of id '" + id + "' found");
    }

    return element as T;
}

export function ucwords(str: string): string {
    return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}