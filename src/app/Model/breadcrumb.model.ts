export class BreadCrumb {
    constructor(name, url, isactive) {
        this.name = name;
        this.url = url;
        this.isActive = isactive;
    }
    name: string;
    url: string;
    isActive: boolean;
}