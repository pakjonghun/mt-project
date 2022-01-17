type Image = "w500" | "original";

export const getId = () => Math.random().toString(20).substring(0, 12);

export const getImageUrl = (id: string, size: Image = "w500") =>
  `https://image.tmdb.org/t/p/${size}/${id}`;

export const textCutter = (text: string, length: number) =>
  text.length > length ? `${text.substring(0, length)}...` : text;
