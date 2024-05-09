import filledStar from "../../assets/icons/fullStar.svg";
import emptyStar from "../../assets/icons/emptyStar.svg";


export const renderStars = (cardStars: number) => {
    const filledStars: number = cardStars > 0 ? cardStars : 0;
    const emptyStars: number = 5 - filledStars;
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<img src={filledStar} alt="filled-star"style={{width: "18px"}} key={i}  />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<img src={emptyStar} alt="empty-star" key={filledStars + i}style={{width: "18px"}}/>);
    }
    return stars;
  };


  