export function getElementByIdOrThrow<T extends HTMLElement>(id: string): T {
    const element: HTMLElement | null = document.getElementById(id);
    
    if(element === null) {
        throw new Error("No element of id '" + id + "' found");
    }

    return element as T;
}