import { BehaviorSubject, Observable, Subject } from "rxjs";

export abstract class AbstractDataService<T> {
    private propertiesSubject: Subject<T> | BehaviorSubject<T>;

    protected constructor(propertiesSubject: Subject<T> | BehaviorSubject<T>) {
        this.propertiesSubject = propertiesSubject;
    }

    public get getObservable(): Observable<T> {
        return this.propertiesSubject.asObservable();
    }

    public set setProperties(properties: T) {
        this.propertiesSubject.next(properties);
    }
}