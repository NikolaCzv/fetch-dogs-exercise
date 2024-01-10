import Button from "../Button";
import { CardContainer, CardImg, CardTag, CardTopWrapper } from "./DogCard.style";

const DogCard = ({ dog }:any) => {
    return (
    <CardContainer>
        <CardTopWrapper>
            <h3>
                {dog.name}
            </h3>
            <Button 
                title="Add To Favorites"
                onClick={() => console.log("FAVORITE")}
                color="primary"
            />
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