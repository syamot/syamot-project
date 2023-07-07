// import React, { useState } from "react";
// import { Card, CardImage, CardTitle, CardTags } from "react-cards";

//詳細情報ページ
// const ListCard = (props) => {
//   const {
//     setSelectFlag,
//     selectImg,
//     users,
//     oneUser,
//     setOneUser,
//     URL,
//     userData,
//     beforeFlag,
//     setBeforeFlag,
//     setEditItem,
//   } = props;

//   const [cards, setCards] = useState([
//     {
//       title: "Card 1",
//       description: "This is a card with a title and a description.",
//       tags: ["tag1", "tag2"],
//       imageUrl:
//         "https://placeholdit.imgix.net/~text?txtsize=33&txt=350x150&w=350&h=150",
//     },
//     {
//       title: "Card 2",
//       description: "This is another card with a title and a description.",
//       tags: ["tag3", "tag4"],
//       imageUrl:
//         "https://placeholdit.imgix.net/~text?txtsize=33&txt=350x150&w=350&h=150",
//     },
//   ]);

//   return (
//     <div>
//       {cards.map((card) => (
//         <Card key={card.id}>
//           <CardImage src={card.imageUrl} alt={card.title} />
//           <CardTitle>{card.title}</CardTitle>
//           <CardTags>{card.tags.join(", ")}</CardTags>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default ListCard;
