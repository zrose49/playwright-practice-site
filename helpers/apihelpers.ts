type brandsArray = {
    id: number,
    brand: string
}[]

export function brandExists(brandName: string,brands: brandsArray): boolean {
    for(let brand of brands) {
        if(brand.brand === brandName) {
            return true;
        }
    }
    return false;
}

export function countBrands(brandName:string, brands:brandsArray): number {
    let count = 0;
    for(const brand of brands) {
        if(brand.brand === brandName) {
            count++;
        }
    }
    return count;
}