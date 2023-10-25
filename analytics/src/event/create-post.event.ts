export class CreatePostEvent {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly body: string,
    public readonly authorId: string,
  ) {}
}
