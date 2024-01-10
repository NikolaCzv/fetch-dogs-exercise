export interface DogCardProps {
    addToFavorites?: VoidFunction;
    dog: any;
    favoriteDogs?: any[];
    isMatch?: boolean;
    removeFavorite?: VoidFunction;
}