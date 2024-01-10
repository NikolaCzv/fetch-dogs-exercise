import Button from "../Button";
import { CardContainer, CardImg, CardTag, CardTopWrapper } from "./DogCard.style";
import { DogCardProps } from "./DogCard.types";

const DogCard = ({ dog, addToFavorites, favoriteDogs, removeFavorite, isMatch }: DogCardProps) => {

    const isFavorite = favoriteDogs?.some(favDog => favDog === dog.id);

    return (
    <CardContainer $isMatch={isMatch}>
        <CardTopWrapper>
            <h3>
                {dog.name}
            </h3>
            {!isMatch && 
            <Button 
                title={isFavorite ? "Remove Favorite" : "Add To Favorites"}
                //@ts-ignore
                onClick={isFavorite ? () => removeFavorite(dog.id) : () => addToFavorites(dog.id)}
                color="primary"
            />}
        </CardTopWrapper>
        <CardImg alt="dog" src={dog.img}/>
        <CardTag>
            Breed: {dog.breed}
        </CardTag>
        <CardTag>
            Age: {dog.age}
        </CardTag>
        <CardTag>
            Zip: {dog.zip_code}
        </CardTag>
    </CardContainer>
    );
};

export default DogCard;