type Image = "w500" | "original";

export const getId = () => Math.random().toString(20).substring(0, 12);

export const getImageUrl = (id: number, size: Image = "w500") =>
  `https://image.tmdb.org/t/p/${size}/${id}`;
