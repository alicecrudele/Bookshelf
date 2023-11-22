
export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public price: number,
    public genre: 'Fiction' | 'Mystery' | 'Thriller' | 'Horror' | 'Historical' | 'Romance' | 'Western' | 'Science Fiction' | 'Fantasy' | 'Poetry',
    public publish_Year: number,
    public publisher: string,
    public description: string,
    public image_attachment: string,
  ) { }
}
